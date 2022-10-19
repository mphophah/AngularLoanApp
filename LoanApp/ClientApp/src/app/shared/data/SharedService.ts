import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";


/*@Injectable()
export class SharedService {

  public principalMemberData = new BehaviorSubject<any>([]);

  constructor() { }

  setPrincipalMemberData(data: any) {
    this.principalMemberData.next(data);
  }

  getPrincipalMemberData() {
    return this.principalMemberData.asObservable();
  }
}
*/

@Injectable()
export class SharedService {

  private _items: string;

  addItem(item: string) {
    this._items = item;
  }

  getItems(): string {
    return this._items;
  }
}
