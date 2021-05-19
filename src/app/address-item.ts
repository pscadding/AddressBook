export interface AddressItem {
    id: number;
    firstName: string;
    lastName: string;
    // TODO: add regex formatting to conform numbers to a
    //   certain string to allow for example +44 ...
    phoneNumber?: string;
}

// The creation of the id is handled by the service so when forming
// the values for a new address you shouldn't set the id.
export type PlaceholderAddressItem = Omit<AddressItem, "id">;
