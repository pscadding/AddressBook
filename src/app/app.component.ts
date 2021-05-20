import { Component } from '@angular/core';
import { AddressService } from './address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AddressBook';

  constructor(private addressService: AddressService) {}

  // TODO: this should probably not be handled in this component
  exportAddresses() {
    this.addressService.exportAddresses();
  }
}
