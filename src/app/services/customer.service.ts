import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CustomerModel} from "../models/customer.model";
import {ResponseCollectionModel} from "../models/response-collection.model";
import {ResponseSingleModel} from "../models/response-single.model";

const baseUrl = 'http://localhost:9090/api/v1/customer';
@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<CustomerModel[]> {
        return this.http.get<ResponseCollectionModel<CustomerModel>>(baseUrl).pipe(
            map(response => {
                return response.data;
            })
        );
    }

    get(id: number): Observable<CustomerModel> {
        return this.http.get<ResponseSingleModel<CustomerModel>>(`${baseUrl}/${id}`).pipe(
            map(response => {
                return response.data;
            })
        );
    }

    save(body: CustomerModel, params?: HttpParams): Observable<CustomerModel> {
        if (body.id) {
            return this.http.put<CustomerModel>(`${baseUrl}/${body['id']}`, body,{params: params});
        }
        return this.http.post<CustomerModel>(baseUrl, body,{params: params});
    }

    delete(id: number): Observable<CustomerModel> {
        return this.http.delete<CustomerModel>(`${baseUrl}/${id}`);
    }
}
