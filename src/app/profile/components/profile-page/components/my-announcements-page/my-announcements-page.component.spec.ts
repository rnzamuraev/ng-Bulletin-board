import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnouncementsPageComponent } from './my-announcements-page.component';

describe('MyAnnouncementsPageComponent', () => {
  let component: MyAnnouncementsPageComponent;
  let fixture: ComponentFixture<MyAnnouncementsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAnnouncementsPageComponent]
    });
    fixture = TestBed.createComponent(MyAnnouncementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
