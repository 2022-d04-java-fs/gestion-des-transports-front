import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOfferListPage } from './my-offer-list.page';

describe('MyOfferListPage', () => {
  let component: MyOfferListPage;
  let fixture: ComponentFixture<MyOfferListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOfferListPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOfferListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
