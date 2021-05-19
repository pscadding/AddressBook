import { Component, OnInit } from '@angular/core';
import { AddressItem } from '../address-item';
import { AddressService,  } from '../address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  constructor(public addressService: AddressService) { }

  ngOnInit(): void {

  }

}
