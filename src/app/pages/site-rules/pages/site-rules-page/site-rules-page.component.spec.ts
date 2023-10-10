import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRulesPageComponent } from './site-rules-page.component';

describe('SiteRulesPageComponent', () => {
  let component: SiteRulesPageComponent;
  let fixture: ComponentFixture<SiteRulesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteRulesPageComponent]
    });
    fixture = TestBed.createComponent(SiteRulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
