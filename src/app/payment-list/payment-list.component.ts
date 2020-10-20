import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Payment } from '../Payment';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';
import { flatten } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

 constructor(private paymentservice:PaymentService) { }

  paymentArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger1: Subject<any>= new Subject();
  dtTrigger2: Subject<any>= new Subject();
  


  payments: Observable<Payment[]>;
  //cartPayments: Observable<Payment[]>;
  removedPayment: Observable<Payment[]>;
  private cartPayments: Array<any> = [];

  payment : Payment=new Payment();
  deleteMessage=false;
  paymentlist:any;
  isupdated = false;
  isAddToCart = false;
  public total: number = 0;
  hiddenButtons = false;
  flag = 1;
  isShowCart: boolean = false;


  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.paymentservice.getPaymentList().subscribe(data =>{
    this.payments =data;
    this.dtTrigger1.next();
  
    localStorage.setItem("cart", JSON.stringify(this.payments));
    })
    localStorage.clear();
    // this.paymentservice.getPaymentByActive().subscribe(data =>{
    //   this.cartPayments =data;
    //   this.dtTrigger2.next();
    //   localStorage.setItem("cart", JSON.stringify(this.cartPayments));
    //   this.sum(this.cartPayments);
    // })
   
  }

  deleteStudent(id: number) {
    this.paymentservice.deletePayment(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.paymentservice.getPaymentList().subscribe(data =>{
            this.payments =data
            })
        },
        error => console.log(error));
  }


  updatePayment(id: number){
    this.paymentservice.getPayment(id)
      .subscribe(
        data => {
          this.paymentlist=data
        },
        error => console.log(error));
  }

  updatePayment_form=new FormGroup({
    payerId:new FormControl(),
    payername:new FormControl(),
    payerEmail:new FormControl(),
    
  });

  updatePaymentForm(updstu){
    this.payment=new Payment();

    this.payment.payerId=this.PayerID.value;
    this.payment.payername=this.PayerName.value;
    this.payment.email=this.Email.value;
    this.payment.phone=this.Phone.value;
    this.payment.productInfo=this.ProductInfo.value;
    this.payment.amount=this.Amount.value;
    this.payment.txnId=this.TxnId.value;
    this.payment.mihpayId=this.MihpayId.value;
    this.payment.payeraddress=this.Payeraddress.value;
    this.payment.accountnumber=this.Accountnumber.value;

  //  this.student.student_id=this.StudentId.value;
  //  this.student.student_name=this.StudentName.value;
  //  this.student.student_email=this.StudentEmail.value;
  //  this.student.student_branch=this.StudentBranch.value;


   this.paymentservice.updatePayment(this.payment.payerId,this.payment).subscribe(
    data => {
      this.isupdated=true;
      this.paymentservice.getPaymentList().subscribe(data =>{
        this.payments =data
        })
    },
    error => console.log(error));
  }

  get PayerID(){
    return this.updatePayment_form.get('payer_id');
  }

  get PayerName(){
    return this.updatePayment_form.get('payer_name');
  }

  get Email(){
    return this.updatePayment_form.get('payer_email');
  }

  get Phone(){
    return this.updatePayment_form.get('payer_email');
  }

  get TxnId(){
    return this.updatePayment_form.get('payer_txnId');
  }

  get ProductInfo(){
    return this.updatePayment_form.get('product_info');
  }

  get Amount(){
    return this.updatePayment_form.get('pay_amount');
  }
  get MihpayId(){
    return this.updatePayment_form.get('payer_MihpayId');
  }

  get Payeraddress(){
    return this.updatePayment_form.get('payer_address');
  }show

  get Accountnumber(){
    return this.updatePayment_form.get('account_number');
  }

  cartStatus: boolean = false;
  

  addToCart(id){
    this.cartStatus = true;
    console.log(id);
   
    this.paymentservice.getPayment(id)
      .subscribe(
        data => {
          this.cartPayments.push(data);
          
        localStorage.setItem("cart", JSON.stringify(this.cartPayments));
        this.dtTrigger2.next();
        },
        error => console.log(error));
        this.sum(this.cartPayments);
  }

  sum(input){         
    if (toString.call(input) !== "[object Array]")
    this.total = 0
      for(var i=0;i<input.length;i++)
        {                  
        
            this.total += Number(input[i].amount);
        }
  }

  
  disPlayCart(){
    this.isShowCart = true;
    this.paymentservice.getPaymentByActive().subscribe(data =>{
      this.cartPayments = (data);
      this.dtTrigger2.next();
      localStorage.setItem("cart", JSON.stringify(this.cartPayments));
      this.sum(this.cartPayments);
    })
  }

  
  removePaymentFromCart(id, index){
    this.cartStatus = true;
    console.log(id);
    this.cartPayments.slice(index, 1)
    
    this.paymentservice.getRemovePaymentInCart(id)
      .subscribe(
        data => {
          this.cartPayments =data;
        },
        error => console.log(error));
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
