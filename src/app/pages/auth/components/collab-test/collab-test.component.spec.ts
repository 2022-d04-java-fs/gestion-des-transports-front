import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabTestComponent } from './collab-test.component';

describe('CollabTestComponent', () => {
  let component: CollabTestComponent;
  let fixture: ComponentFixture<CollabTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollabTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
