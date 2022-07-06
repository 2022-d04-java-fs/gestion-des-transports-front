import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabPage } from './collab.page';

describe('CollabPage', () => {
  let component: CollabPage;
  let fixture: ComponentFixture<CollabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
