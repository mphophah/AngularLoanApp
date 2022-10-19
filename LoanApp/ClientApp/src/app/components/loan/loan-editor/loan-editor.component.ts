import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { NgForm, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { LoanService } from '../../../services/loan.service';
import { loan } from '../../../models/loan.model';


@Component({
  selector: 'app-loan-editor',
  templateUrl: './loan-editor.component.html',
  styleUrls: ['./loan-editor.component.scss']
})
export class LoanEditorComponent implements OnChanges {
  @ViewChild('form', { static: true })
  private form: NgForm;

  public isNewLoan = false;
  private onLoanSaved = new Subject<loan>();

  @Input() customer: loan = new loan();

  customerForm: FormGroup;
  customerSaved$ = this.onLoanSaved.asObservable();


  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private loanService: LoanService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnChanges() {
    if (this.customer) {
      this.isNewLoan = false;
    } else {
      this.isNewLoan = true;
      this.customer = new loan();
    }

    this.resetForm();
  }

  public save() {
    if (!this.form.submitted) {
      this.form.onSubmit(null);
      return;
    }

    if (!this.customerForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.alertService.startLoadingMessage('Saving changes...');

    const editedCustomer = this.getEditedCustomer();

    if (this.isNewLoan) {
      this.loanService.newLoan(editedCustomer).subscribe(
        customer => this.saveSuccessHelper(customer),
        error => this.saveFailedHelper(error));

    } else {
      this.loanService.updateLoan(editedCustomer).subscribe(
        response => this.saveSuccessHelper(editedCustomer),
        error => this.saveFailedHelper(error));

    }
  }

  private getEditedCustomer(): loan {
    const formModel = this.customerForm.value;

    return {
      id: this.customer.id,
      firstName: formModel.firstName,
      lastName: formModel.lastName,
      idNumber: String(formModel.idNumber),
      loanTerm: String(formModel.loanTerm),
      interestRate: formModel.interestRate,
      loanType: formModel.loanType,
      amount: String(formModel.amount),
      totalAmount: formModel.totalAmount
    };
  }




  private saveSuccessHelper(customer?: loan) {
    this.alertService.stopLoadingMessage();

    if (this.isNewLoan) {
      this.alertService.showMessage('Success', `Loan "${customer.loanType}" was created successfully`, MessageSeverity.success);
    } else {
      this.alertService.showMessage('Success', `Changes to loan "${customer.loanType}" was saved successfully`, MessageSeverity.success);
    }

    this.onLoanSaved.next(customer);
  }


  private saveFailedHelper(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occured whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

  private cancel() {
    this.resetForm();

    this.alertService.resetStickyMessage();
  }

  private buildForm() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      loanTerm: ['', Validators.required],
      interestRate: [''],
      loanType: ['', Validators.required],
      amount: ['', Validators.required],
      totalAmount: ['']
    });
  }

  private resetForm(replace = false) {
    this.customerForm.reset({
      firstName: this.customer.firstName || '',
      lastName: this.customer.lastName || '',
      idNumber: this.customer.idNumber || '',
      loanTerm: this.customer.loanTerm || '',
      interestRate: this.customer.interestRate || '',
      loanType: this.customer.loanType || '',
      amount: this.customer.amount || '',
      totalAmount: this.customer.totalAmount || ''
    });
  }

}
