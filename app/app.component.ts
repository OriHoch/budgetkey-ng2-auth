import { Component } from '@angular/core';
import {ListManagementService} from "../src/services";


@Component({
  selector: 'my-app',
  template: `
    <div id="budgetkeyng2authcontainer">
        <budgetkey-ng2-auth #budgetkeyng2auth></budgetkey-ng2-auth>
    </div>
    <hr/>
    <input type="text" [ngModel]="searchTerm"/>
    <a (click)="_onClick($event)">add to saved searches</a>
      <div *ngIf="saveSearchState == 'error'" style="color:red"><strong>Failed to save the search, are you logged-in?</strong></div>
 `,
  styles: [`
      a {text-decoration: underline; color:blue; cursor: pointer}
  `]
})
export class AppComponent {
  private searchTerm: string = 'foobar';
  private saveSearchState: string = '';

  constructor(private listManagement: ListManagementService) {}

  _onClick($event: Event) {
      let item = {"title": this.searchTerm, "url": "https://next.obudget.org/s/?q="+encodeURIComponent(this.searchTerm)};
      this.saveSearchState = 'saving';
      this.listManagement.add("saved searches", item).then((res) => {
          console.log(res);
          if (res) {
              this.saveSearchState = 'saved';
          } else {
              this.saveSearchState = 'error';
          }
      })
  }
}
