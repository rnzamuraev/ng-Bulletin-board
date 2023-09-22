import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesBodyComponent } from './categories-body.component';

describe('CategoriesBodyComponent', () => {
  let component: CategoriesBodyComponent;
  let fixture: ComponentFixture<CategoriesBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesBodyComponent]
    });
    fixture = TestBed.createComponent(CategoriesBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
