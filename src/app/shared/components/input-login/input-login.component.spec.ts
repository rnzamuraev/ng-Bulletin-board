import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLoginComponent } from './input-login.component';

describe('InputLoginComponent', () => {
  let component: InputLoginComponent;
  let fixture: ComponentFixture<InputLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputLoginComponent]
    });
    fixture = TestBed.createComponent(InputLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
