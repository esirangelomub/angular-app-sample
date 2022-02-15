import {AddressModel} from "./address.model";

export interface CustomerModel {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: AddressModel
};
