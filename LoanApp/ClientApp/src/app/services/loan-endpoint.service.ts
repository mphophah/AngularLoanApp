
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class LoanEndpoint extends EndpointBase {

  get loansUrl() { return this.configurations.baseUrl + '/api/Loan/loans'; }


  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }


  getLoansEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
     const endpointUrl = page && pageSize ? `${this.loansUrl}/${page}/${pageSize}` : this.loansUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getLoansEndpoint(page, pageSize));
      }));
  }

  getNewLoanEndpoint<T>(customerObject: any): Observable<T> {

    return this.http.post<T>(this.loansUrl, JSON.stringify(customerObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewLoanEndpoint(customerObject));
      }));
  }

  getUpdateLoanEndpoint<T>(customerObject: any, customerId: number): Observable<T> {
    const endpointUrl = `${this.loansUrl}/${customerId}`;

    return this.http.put<T>(endpointUrl, JSON.stringify(customerObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateLoanEndpoint(customerObject, customerId));
      }));
  }


  getDeleteLoanEndpoint<T>(customerId: number): Observable<T> {
    const endpointUrl = `${this.loansUrl}/${customerId}`;

    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteLoanEndpoint(customerId));
      }));
  }

}
