import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  sumPrice: number = 0;
  cashAmount: number = 0;
  changeAmount: any = "invalid";

  constructor(private http: HttpClient, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.getSumPrice();
  }

  getSumPrice() {
    this.sumPrice = this.orderService.getSumPrice()
  }

  calculateChange() {
    const change = this.cashAmount - this.sumPrice;
    if(change < 0 || isNaN(change)) {
      this.changeAmount = "invalid"
    } else {
      this.changeAmount = change
    }
  }

  onClickCash() {
    if(this.changeAmount == "invalid"){
      Swal.fire('Error', 'Invalid Change!', 'error');
    } else {
      Swal.fire('Success', 'Purchase Success!', 'success');
      this.router.navigate(['/order']);
    }
  }

  onClickScan() {
    Swal.fire('Success', 'Purchase Success!', 'success');
      this.router.navigate(['/order']);
  }
  
}
