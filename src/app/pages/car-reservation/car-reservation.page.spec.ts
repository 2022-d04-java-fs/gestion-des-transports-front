import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReservationPage } from './car-reservation.page';

describe('CarReservationPage', () => {
  let component: CarReservationPage;
  let fixture: ComponentFixture<CarReservationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarReservationPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
