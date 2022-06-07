import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end-tendencys';
  load = false;
  orders: any = [];
  constructor(private appService: AppService) {
    this.loadOrders();
  }

  loadOrders() {
    this.load = true;
    this.appService
      .getOrders()
      .subscribe({
        error: () => {
          this.load = false;
        },
        next: (response: any) => {
          this.orders = response.orders;
          this.load = false;
        },
      });
  }
}
