import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { WebSocketService } from '../service/web-socket.service';
import { catchError, of } from 'rxjs';
import {Pixel} from "../entity/pixel";

@Component({
  selector: 'app-pixel-war',
  templateUrl: './pixel-war.component.html',
  styleUrls: ['./pixel-war.component.css']
})
export class PixelWarComponent implements OnInit {
  @ViewChild('pixelWar', { static: true }) canvas!: ElementRef;

  openPopUp: boolean = false;
  popUpColor: string = '#000000';
  eventX: number = 0;
  eventY: number = 0;
  allPixels: Pixel[] = [];
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.receive()
      .pipe(
        catchError((error) => {
          console.error('WebSocket error:', error);
          return of(null);
        })
      )
      .subscribe((message) => {
        if (message) {
          this.allPixels = message;
          console.log(this.allPixels);
          for (let pixel of this.allPixels) {
            console.log(pixel)
            this.placePixel(pixel);
          }
        }
      });

    this.webSocketService.send({
      type: 'getAllPixels'
    });
  }

  closeColorPicker() {
    this.openPopUp = false;
  }

  updateColor(event: Event) {
    const input = event.target as HTMLInputElement;
    this.popUpColor = input.value;
  }
  click(event: MouseEvent) {
    this.eventX = event.offsetX;
    this.eventY = event.offsetY;
    this.openPopUp = true;
  }


  valideColor() {
    this.closeColorPicker();
    const x = Math.floor(this.eventX / 10) * 10;
    const y = Math.floor(this.eventY / 10) * 10;

    this.placePixel({
      x: this.eventX,
      y: this.eventY,
      color: this.popUpColor
    });
    this.sendPixel({
      x: this.eventX,
      y: this.eventY,
      color: this.popUpColor
    });
  }

  // Méthode pour placer le pixel sur le canvas
  placePixel(pixel: Pixel) {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      const x = pixel.x;
      const y = pixel.y;
      context.fillStyle = pixel.color;
      context.fillRect(x, y, 10, 10);
    }
  }

 sendPixel(pixel: Pixel){
   this.webSocketService.send({
     type: 'updatePixel',
     data: {
       x: pixel.x,
       y: pixel.y,
       color: pixel.color
     }
   });
 }

}
