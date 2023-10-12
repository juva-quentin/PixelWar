import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelWarComponent } from './pixel-war.component';

describe('PixelWarComponent', () => {
  let component: PixelWarComponent;
  let fixture: ComponentFixture<PixelWarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PixelWarComponent]
    });
    fixture = TestBed.createComponent(PixelWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
