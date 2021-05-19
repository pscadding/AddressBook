import { Component, OnInit } from '@angular/core';
import { AddressItem, PlaceholderAddressItem } from '../address-item';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  showForm = false;
  addressToCreate: PlaceholderAddressItem = {
    firstName: "",
    lastName: "",
    phoneNumber: ""
  }

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
  }

  private finishForm() {
    this.addressToCreate = {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
    this.onShowAddForm();
  }

  onShowAddForm() {
    this.showForm = !this.showForm;
  }
  
  onCancel() {
    this.finishForm();
  }

  onCreateAddress() {
    this.addressService.addAddress(this.addressToCreate);
    this.onCancel();
  }

}
