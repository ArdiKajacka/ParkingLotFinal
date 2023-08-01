import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricingPlanComponent } from './pricingplan.component';

describe('PricingplanComponent', () => {
  let component: PricingPlanComponent;
  let fixture: ComponentFixture<PricingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricingPlanComponent]
    });
    const newLocal = fixture = TestBed.createComponent(PricingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
