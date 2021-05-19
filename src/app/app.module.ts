import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressSearchComponent } from './address-search/address-search.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressCreateComponent } from './address-create/address-create.component';
import { AddressListItemComponent } from './address-list-item/address-list-item.component';
import { AddressSortComponent } from './address-sort/address-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressSearchComponent,
    AddressListComponent,
    AddressCreateComponent,
    AddressListItemComponent,
    AddressSortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
