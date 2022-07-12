import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolAccordionComponent } from './carpool-accordion.component';

describe('CarpoolAccordionComponent', () => {
  let component: CarpoolAccordionComponent;
  let fixture: ComponentFixture<CarpoolAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpoolAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpoolAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
