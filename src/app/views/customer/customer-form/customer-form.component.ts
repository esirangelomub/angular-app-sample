import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerModel} from "../../../models/customer.model";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, AfterContentInit {

    public iID: number|null = null;
    public form: FormGroup = new FormGroup({});

    constructor(public router: Router,
                public route: ActivatedRoute,
                public formBuilder: FormBuilder,
                public customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    ngAfterContentInit() {
        this.load();
    }

    /** FORM METHODS ===================================================================================== */

    createForm() {
        this.form = this.formBuilder.group({
            name: new FormControl({value: null, disabled: false}, [Validators.required]),
            email: new FormControl({value: null, disabled: false}, [Validators.required, Validators.email]),
            phone: new FormControl({value: null, disabled: false}, [Validators.required]),
            address: new FormGroup(
            {
                number: new FormControl({value: null, disabled: false}, [Validators.required]),
                street_name: new FormControl({value: null, disabled: false}, [Validators.required]),
                city: new FormControl({value: null, disabled: false}, [Validators.required]),
                state: new FormControl({value: null, disabled: false}, [Validators.required]),
                country: new FormControl({value: null, disabled: false}, [Validators.required])
            })
        });

        this.form.get('address.country')?.valueChanges.subscribe(value => {
            this.form.get('address.state')?.setValue(null);
        })
    }

    load() {

    }

    /** SUBMIT METHODS =================================================================================== */

    save(): void {
        const customer: CustomerModel = this.form.value as CustomerModel;
        this.customerService
            .save(customer)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    alert('Error!');
                    return throwError(error);
                })
            )
            .subscribe((response: CustomerModel) => {
                alert('Success!');
                void this.router.navigate(['/customers']);
            });
    }
}
