import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Payment } from '../Payment';
@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  constructor(private paymentservice:PaymentService) { }

  payment : Payment=new Payment();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  paymentsaveform=new FormGroup({
    payername:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    payeremail:new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    productInfo:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    amount: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    txnId: new FormControl('' , [Validators.required , Validators.minLength(4) ] ),
    mihpayId: new FormControl('' , [Validators.required , Validators.minLength(4) ] ),
    payeraddress: new FormControl('' , [Validators.required , Validators.minLength(4) ] ),
    accountnumber: new FormControl('' , [Validators.required , Validators.minLength(6) ] )

  });

  savePayment(payment){
    this.payment=new Payment();
    this.payment.payername=this.PayerName.value;
    this.payment.email=this.PayerEmail.value;
    this.payment.phone=this.Phone.value;
    this.payment.productInfo=this.ProductInfo.value;
    this.payment.amount=this.Amount.value;
    this.payment.txnId=this.TxnId.value;
    this.payment.mihpayId=this.MihpayId.value;
    this.payment.payeraddress=this.Payeraddress.value;
    this.payment.accountnumber=this.Accountnumber.value;

    this.submitted = true;
    this.save();
  }



  save() {
    this.paymentservice.createBill(this.payment)
      .subscribe(data => console.log(data), error => console.log(error));
    this.payment = new Payment();
  }

  get Accountnumber(){
    return this.paymentsaveform.get('accountnumber');
  }

  get Payeraddress(){
    return this.paymentsaveform.get('payeraddress');
  }

  get MihpayId(){
    return this.paymentsaveform.get('mihpayId');
  }

  get TxnId(){
    return this.paymentsaveform.get('txnId');
  }

  get Amount(){
    return this.paymentsaveform.get('amount');
  }

  get PayerName(){
    return this.paymentsaveform.get('payername');
  }

  get PayerEmail(){
    return this.paymentsaveform.get('payeremail');
  }

  get Phone (){
    return this.paymentsaveform.get('phone');
  }

  get ProductInfo(){
    return this.paymentsaveform.get('productInfo');
  }


  addPaymentForm(){
    this.submitted=false;
    this.paymentsaveform.reset();
  }
}
