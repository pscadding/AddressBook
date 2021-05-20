import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressItem, PlaceholderAddressItem } from './address-item';
import { MOCKADDRESSES } from './mock-addresses';

import { IpcRenderer } from 'electron';

// Store all the addresses by id for quicker look up and manipulation
interface AddressStore {
  [ids: number]: AddressItem;
}

export enum SortOption {
  firstNameAlpha,
  lastNameAlpha
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addresses: AddressStore = {};
  public searchString: string = '';
  public sortChoice: SortOption = SortOption.firstNameAlpha;
  private _ipc: IpcRenderer | undefined;

  constructor() {
    this.fetchAddresses().subscribe(
      (addresses) => (this.addresses = addresses)
    );

    // Get the ipc connection to allow sending information through to electron.
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("Electron's IPC was not loaded");
    }
  }

  /**
   * Exports the addresses stored in this service, by passing them to electron to handle.
   */
  exportAddresses(): void {
    // TODO: Check that the data can be serialized and provide a method of choosing an output path.
    // TODO: should return success of failure. 
    if (this._ipc) {
      this._ipc.send('exportAddresses', this.addresses);
    }
  }

  /**
   * Returns an a sorted and filtered array of AddressItems.
   * Sorting and Filtering options are set via the searchString, and sortChoice service properties.
   * @returns Array of AddressItems
   */
  getAddresses(): AddressItem[] {
    const adrs = Object.values(this.addresses);
    const filteredAdrs = this.filterAddresses(adrs);
    return this.sortAddresses(filteredAdrs);
  }

  /**
   * @returns All addresses in the address store.
   */
  fetchAddresses(): Observable<AddressStore> {
    // initiate the addresses with mock data for now
    const _addressStore: AddressStore = {};
    for (const address of MOCKADDRESSES) {
      _addressStore[address.id] = address;
    }
    return of(_addressStore);
  }

  /**
   * Adds an address to the address store.
   * @param address The address (AddressItem) to add to the list of addresses
   * @returns boolean stating whether the address was added or not.
   */
  addAddress(address: PlaceholderAddressItem) {
    const id: number = this.generateID();
    // TODO: Would want some validation here.
    // TODO: Should really be storing this in the backend
    const newAddress = {
      ...address,
      id: id
    };
    this.addresses[id] = newAddress;
    // TODO: At the moment it can't fail to add an address but
    //  maybe we should return an error instead once it can.
    return true;
  }

  /**
   * Removed the passed AddressItem from the service's store of addresses.
   * @param address AddressItem to remove.
   */
  removeAddress(address: AddressItem) {
    delete this.addresses[address.id];
  }

  /**
   * Filters the provided list of addresses based on the searchString.
   * The search string is applied in a case insensitive match again
   *  both first and last names on the address.
   * @param addressesToFilter an array of AddressItems
   * @returns a filtered array of AddressItems
   */
   private filterAddresses(addressesToFilter: AddressItem[]): AddressItem[] {
    // Perform a case insensitive match against the start of a string.
    const re = new RegExp(`^${this.searchString}`, 'gmi');
    const filtered = addressesToFilter.filter((address) => {
      if (address.firstName.match(re)) return true;
      if (address.lastName.match(re)) return true;
      return false;
    });
    return filtered;
  }

  /**
   * Given an array of addresses, it will sort them in accordance with the set sort choice.
   * @param addressesToSort Array of AddressItems
   * @returns A sorted array of addresses.
   */
  private sortAddresses(addressesToSort: AddressItem[]): AddressItem[] {
    const AddressSort = (a: AddressItem, b: AddressItem): number => {
      // TODO: This would need to be more complex, but for now everything is alphabetical
      //   and there are only two options for sorting by first name and last name.
      const paramName =
        this.sortChoice == SortOption.firstNameAlpha ? 'firstName' : 'lastName';
      // Sort Alphabetically and case insensitively.
      const aParam = a[paramName].toLowerCase();
      const bParam = b[paramName].toLowerCase();
      if (aParam < bParam) return -1;
      if (aParam > bParam) return 1;
      return 0;
    };
    return addressesToSort.sort(AddressSort);
  }

  /**
   * Generates a new ID for a potential address. This is very much a placeholder method.
   * @returns 
   */
  private generateID(): number {
    // This is just rough code to find an id number that hasn't been used.
    // I wouldn't expect it to work like this.
    const ids = Object.keys(this.addresses).map(Number);
    // provide 0 as well incase we don't have any ids currently.
    return Math.max(...ids, 0) + 1;
  }
}
