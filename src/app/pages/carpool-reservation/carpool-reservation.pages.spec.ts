import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolReservationPages } from './carpool-reservation.pages';

describe('CarpoolReservationPages', () => {
  let component: CarpoolReservationPages;
  let fixture: ComponentFixture<CarpoolReservationPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpoolReservationPages ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpoolReservationPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
