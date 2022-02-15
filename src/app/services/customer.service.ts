import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CustomerModel} from "../models/customer.model";
import {ResponseModel} from "../models/response.model";

const baseUrl = 'http://localhost:9090/api/v1/customer';
@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<CustomerModel[]> {
        return this.http.get<ResponseModel<CustomerModel>>(baseUrl).pipe(
            map(response => {
                return response.data;
            })
        );
    }

    get(id: number): Observable<CustomerModel> {
        return this.http.get<CustomerModel>(`${baseUrl}/${id}`);
    }

    create(data: CustomerModel): Observable<CustomerModel> {
        return this.http.post<CustomerModel>(baseUrl, data);
    }

    update(id: number, data: CustomerModel): Observable<CustomerModel> {
        return this.http.put<CustomerModel>(`${baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<CustomerModel> {
        return this.http.delete<CustomerModel>(`${baseUrl}/${id}`);
    }
}
