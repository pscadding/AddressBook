import { TestBed } from '@angular/core/testing';

import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Add a single address', () => {
    service.getAddresses().subscribe()
    // add an address with the minimum required fields.
    service.addAddress({firstName: "a", lastName: "b"})

    expect(compiled.querySelector('.content span').textContent).toContain('AddressBook app is running!');
  });
});
