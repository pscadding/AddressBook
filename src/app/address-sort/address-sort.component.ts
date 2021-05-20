import { Component, OnInit } from '@angular/core';
import { AddressService, SortOption } from '../address.service';

@Component({
  selector: 'app-address-sort',
  templateUrl: './address-sort.component.html',
  styleUrls: ['./address-sort.component.css']
})
export class AddressSortComponent {
  constructor(private addessService: AddressService) {}

  onSortFirstName() {
    this.addessService.sortChoice = SortOption.firstNameAlpha;
  }
  onSortLastName() {
    this.addessService.sortChoice = SortOption.lastNameAlpha;
  }
}
