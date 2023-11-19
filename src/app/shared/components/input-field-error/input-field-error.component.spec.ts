import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldErrorComponent } from './input-field-error.component';

describe('InputFieldErrorComponent', () => {
  let component: InputFieldErrorComponent;
  let fixture: ComponentFixture<InputFieldErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldErrorComponent]
    });
    fixture = TestBed.createComponent(InputFieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
