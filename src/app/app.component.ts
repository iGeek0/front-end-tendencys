import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  products: any = [];
  selectedOrder: any = {};
  productForm: FormGroup = new FormGroup({});
  showProductsView = false;
  constructor(private appService: AppService, private modalService: NgbModal, private fb: FormBuilder, private toastr: ToastrService) {
    this.loadOrders();
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      sku: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
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

  showProducts(order: any) {

    this.selectedOrder = order;
    this.resetActive(order);
  }

  resetActive(orderActive: any) {
    this.showProductsView = true;

    this.orders.forEach((row: any) => {

      if (orderActive.number === row.number) {
        row.active = true;
      } else {
        row.active = false;
      }

    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {

    });
  }

  addProduct() {

    if (this.productForm.invalid) {
      this.toastr.error('Faltan campos requeridos.', 'Mensaje');
      return;
    }

    this.selectedOrder.items.push(this.productForm.value);
    this.toastr.success('Producto agregado con exito!', 'Mensaje');
    this.productForm.reset();
    this.modalService.dismissAll();
  }

  addPayment() {
    this.toastr.success('Se registro el pago correctamente!', 'Mensaje');
  }
}
