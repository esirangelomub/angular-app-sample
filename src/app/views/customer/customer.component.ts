import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {CustomerModel} from "../../models/customer.model";
import {catchError, Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

    customers$: Observable<CustomerModel[]> = new Observable<CustomerModel[]>();

    constructor(public customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.load();
    }

    load() {
        this.customers$ = this.customerService.getAll();
    }

    delete(customer: CustomerModel) {
        if (customer.id === undefined || customer.id === null) {
            return;
        }
        if (window.confirm("This action will permanently delete this customer. Do you wish to proceed?")) {
            this.customerService
                .delete(customer.id)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        alert('Error!');
                        return throwError(error);
                    })
                )
                .subscribe((response: CustomerModel) => {
                    alert('Success!');
                    this.load();
                });
        }
    }
}
