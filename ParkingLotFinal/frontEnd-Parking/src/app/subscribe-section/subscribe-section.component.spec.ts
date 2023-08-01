import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeSectionComponent } from './subscribe-section.component';

describe('SubscribeSectionComponent', () => {
  let component: SubscribeSectionComponent;
  let fixture: ComponentFixture<SubscribeSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeSectionComponent]
    });
    fixture = TestBed.createComponent(SubscribeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
