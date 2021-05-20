import { Component, OnInit, Input } from '@angular/core';
import { AddressItem } from '../address-item';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-list-item',
  templateUrl: './address-list-item.component.html',
  styleUrls: ['./address-list-item.component.css']
})
export class AddressListItemComponent implements OnInit {
  @Input() addressItem?: AddressItem;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {}

  onRemoveAddress(address: AddressItem): void {
    console.log(`remove the address`);
    this.addressService.removeAddress(address);
  }
}
