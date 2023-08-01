import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogtableComponent } from './logtable.component';

describe('LogtableComponent', () => {
  let component: LogtableComponent;
  let fixture: ComponentFixture<LogtableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogtableComponent]
    });
    fixture = TestBed.createComponent(LogtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
