import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSortComponent } from './address-sort.component';

describe('AddressSortComponent', () => {
  let component: AddressSortComponent;
  let fixture: ComponentFixture<AddressSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressSortComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
