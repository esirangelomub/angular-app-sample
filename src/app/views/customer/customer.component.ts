import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {CustomerModel} from "../../models/customer.model";
import {Observable} from "rxjs";

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
