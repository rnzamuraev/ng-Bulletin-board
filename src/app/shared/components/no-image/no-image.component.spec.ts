import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoImageComponent } from './no-image.component';

describe('NoImageComponent', () => {
  let component: NoImageComponent;
  let fixture: ComponentFixture<NoImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoImageComponent]
    });
    fixture = TestBed.createComponent(NoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
