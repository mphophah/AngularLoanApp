import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { fadeInOut } from '../../services/animations';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { LoanService } from '../../services/loan.service';
import { Utilities } from '../../services/utilities';
import { loan } from '../../models/loan.model';

import { EditLoanDialogComponent } from './edit-loan-dialog/edit-loan-dialog.component';
import { SharedService } from '../../shared/data/SharedService';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
  animations: [fadeInOut]
})
export class LoanComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['First Name','Id Number','Loan Term', 'Interest Rate', 'Amount', 'Total Amount'];
  dataSource: MatTableDataSource<loan>;
  sourceCustomer: loan;
  loadingIndicator: boolean;
  allCustomers: loan[] = [];

  constructor(
    private alertService: AlertService,
    private translationService: AppTranslationService,
    private customerService: LoanService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {

    this.displayedColumns.push('actions');

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  private refresh() {
    // Causes the filter to refresh there by updating with recently added data.
    this.applyFilter(this.dataSource.filter);
  }


  private loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.customerService.getLoans().subscribe(
      customers => this.onDataLoadSuccessful(customers),
      error => this.onDataLoadFailed(error)
    );

  }

  private onDataLoadSuccessful(customers: loan[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.dataSource.data = customers;
  }

  private onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve customers from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }


  private updateCustomers(customer: loan) {
    if (this.sourceCustomer) {
      Object.assign(this.sourceCustomer, customer);
      this.alertService.showMessage('Success', `Changes to loan \"${customer.loanType}\" was saved successfully`, MessageSeverity.success);
      this.sourceCustomer = null;
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } else {
      this.dataSource.data.push(customer);
      this.refresh();
      this.alertService.showMessage('Success', `Loan \"${customer.loanType}\" was created successfully`, MessageSeverity.success);
    }
  }

  public editCustomer(customer?: loan) {
    this.sourceCustomer = customer;

    const dialogRef = this.dialog.open(EditLoanDialogComponent,
      {
        panelClass: 'mat-dialog-lg',
        data: { customer}
      });
    dialogRef.afterClosed().subscribe(u => {
      if (u) {
        this.updateCustomers(u);
      }
    });
    
  }

  public confirmDelete(Customer: loan) {
    this.snackBar.open(`Delete ${Customer.id}?`, 'DELETE', { duration: 5000 })
      .onAction().subscribe(() => {
        this.alertService.startLoadingMessage('Deleting...');
        this.loadingIndicator = true;

        this.customerService.deleteLoan(Customer.id)
          .subscribe(results => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== Customer);
          },
            error => {
              this.alertService.stopLoadingMessage();
              this.loadingIndicator = false;

              this.alertService.showStickyMessage('Delete Error', `An error occured whilst deleting the loan.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`,
                MessageSeverity.error, error);
            });
      });
  }

}
