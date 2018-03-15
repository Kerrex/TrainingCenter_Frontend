import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementAddEditComponent } from './addedit.component';

describe('AddeditComponent', () => {
  let component: MeasurementAddEditComponent;
  let fixture: ComponentFixture<MeasurementAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
