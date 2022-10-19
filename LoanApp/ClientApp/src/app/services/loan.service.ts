import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { LoanEndpoint } from './loan-endpoint.service';
import { loan } from '../models/loan.model';
import { Custom } from '@ngu/carousel/lib/ngu-carousel/ngu-carousel';

export type LoansChangedOperation = 'add' | 'delete' | 'modify';
export interface LoansChangedEventArg { customers: loan[] | string[]; operation: LoansChangedOperation; }

@Injectable()
export class LoanService {
  public static readonly loanAddedOperation: LoansChangedOperation = 'add';
  public static readonly laonDeletedOperation: LoansChangedOperation = 'delete';
  public static readonly laonModifiedOperation: LoansChangedOperation = 'modify';

  private loansChanged = new Subject<LoansChangedEventArg>();

  constructor(
    private customerEndpoint: LoanEndpoint) {

  }

  getLoans(page?: number, pageSize?: number) {

    return this.customerEndpoint.getLoansEndpoint<loan[]>(page, pageSize);
  }



  deleteLoan(id: number): Observable<loan> {

    return this.customerEndpoint.getDeleteLoanEndpoint<loan>(id as number).pipe<loan>(
      tap(data => this.onLoansChanged([data], LoanService.laonDeletedOperation)));
    
  }


  updateLoan(Loan: loan) {
    if (Loan.id) {
      return this.customerEndpoint.getUpdateLoanEndpoint(Loan, Loan.id).pipe(
        tap(data => this.onLoansChanged([Loan], LoanService.laonModifiedOperation)));
    } 
  }

  newLoan(Loan: loan) {
    return this.customerEndpoint.getNewLoanEndpoint<loan>(Loan).pipe<loan>(
      tap(data => this.onLoansChanged([Loan], LoanService.loanAddedOperation)));
  }

  private onLoansChanged(customers: loan[] | string[], op: LoansChangedOperation) {
    this.loansChanged.next({ customers, operation: op });
  }


}
