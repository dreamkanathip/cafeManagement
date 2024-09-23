import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  sumPrice: number = 0;
  cashAmount: number = 0;
  changeAmount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSumPrice();
  }

  getSumPrice() {
    this.http.get<{ sumPrice: number }>('http://localhost:5000/api/payment/sumPrice')
      .subscribe(response => {
        this.sumPrice = response.sumPrice;
      }, error => {
        console.error('Error fetching sum price:', error);
      });
  }

  calculateChange() {
    this.changeAmount = this.cashAmount - this.sumPrice;
  }
}
