import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItemPageComponent } from './my-item-page.component';

describe('MyItemPageComponent', () => {
  let component: MyItemPageComponent;
  let fixture: ComponentFixture<MyItemPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyItemPageComponent]
    });
    fixture = TestBed.createComponent(MyItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
