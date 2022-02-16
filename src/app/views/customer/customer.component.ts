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
    // retrieveTutorials(): void {
    //     this.customerService.getAll()
    //         .subscribe(
    //             (response: CustomerModel[]) => {
    //                 this.tutorials = response;
    //                 console.log(response);
    //             },
    //             error => {
    //                 console.log(error);
    //             });
    // }
    // refreshList(): void {
    //     this.retrieveTutorials();
    //     this.currentTutorial = null;
    //     this.currentIndex = -1;
    // }
    // setActiveTutorial(tutorial, index): void {
    //     this.currentTutorial = tutorial;
    //     this.currentIndex = index;
    // }
    // removeAllTutorials(): void {
    //     this.customerService.deleteAll()
    //         .subscribe(
    //             response => {
    //                 console.log(response);
    //                 this.retrieveTutorials();
    //             },
    //             error => {
    //                 console.log(error);
    //             });
    // }
    // searchTitle(): void {
    //     this.customerService.findByTitle(this.title)
    //         .subscribe(
    //             data => {
    //                 this.tutorials = data;
    //                 console.log(data);
    //             },
    //             error => {
    //                 console.log(error);
    //             });
    // }

}
