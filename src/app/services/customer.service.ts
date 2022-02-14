import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:9090/api/customers';
export interface AddressModel {
    number: number;
    street_name: string;
    city: string;
    state: string;
    country: string;
};
export interface CustomerModel {
    name: string;
    email: string;
    phone: string;
    address: AddressModel
};
@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get(baseUrl);
    }

    get(id: number): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: CustomerModel): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id: number, data: CustomerModel): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
