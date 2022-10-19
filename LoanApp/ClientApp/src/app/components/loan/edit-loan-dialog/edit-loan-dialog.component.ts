import { Component, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoanService } from '../../../services/loan.service';
import { loan } from '../../../models/loan.model';

import { LoanEditorComponent } from '../loan-editor/loan-editor.component';

@Component({
  selector: 'app-edit-loan-dialog',
  templateUrl: 'edit-loan-dialog.component.html',
  styleUrls: ['edit-loan-dialog.component.scss']
})
export class EditLoanDialogComponent implements AfterViewInit {
  @ViewChild(LoanEditorComponent, { static: true })
  customerEditor: LoanEditorComponent;

  get loanFirstName(): any {
    return this.data.customer ? { name: this.data.customer.firstName } : null;
  }

  get loanLastName(): any {
    return this.data.customer ? { name: this.data.customer.lastName } : null;
  }

  get loanIdNumber(): any {
    return this.data.customer ? { name: this.data.customer.idNumber } : null;
  }

  get loanLoanTerm(): any {
    return this.data.customer ? { name: this.data.customer.loanTerm } : null;
  }

  get loanInterestRate(): any {
    return this.data.customer ? { name: this.data.customer.interestRate } : null;
  }

  get loanLoanType(): any {
    return this.data.customer ? { name: this.data.customer.loanType } : null;
  }
  get loanAmount(): any {
    return this.data.customer ? { name: this.data.customer.amount } : null;
  }
  get loanTotalAmount(): any {
    return this.data.customer ? { name: this.data.customer.totalAmount } : null;
  }


  constructor(
    public dialogRef: MatDialogRef<LoanEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: loan},
    private loanService: LoanService
  ) {
  }

  ngAfterViewInit() {
    this.customerEditor.customerSaved$.subscribe(customer => this.dialogRef.close(customer));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
