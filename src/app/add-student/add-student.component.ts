import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Student } from '../student';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentservice:StudentService) { }

  student : Student=new Student();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  studentsaveform=new FormGroup({
    payer_name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    payer_email:new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    productInfo:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    amount: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    txnId: new FormControl('' , [Validators.required , Validators.minLength(4) ] ),
    mihpayId: new FormControl('' , [Validators.required , Validators.minLength(4) ] ),
    payeraddress: new FormControl('' , [Validators.required , Validators.minLength(44) ] ),
    accountnumber: new FormControl('' , [Validators.required , Validators.minLength(6) ] )

  });

  saveStudent(saveStudent){
    this.student=new Student();
    this.student.payername=this.PayerName.value;
    this.student.email=this.PayerEmail.value;
    this.student.phone=this.Phone.value;
    this.student.productInfo=this.ProductInfo.value;
    this.student.amount=this.Amount.value;
    this.student.txnId=this.TxnId.value;
    this.student.mihpayId=this.MihpayId.value;
    this.student.payeraddress=this.Payeraddress.value;
    this.student.accountnumber=this.Accountnumber.value;

    this.submitted = true;
    this.save();
  }



  save() {
    this.studentservice.createBill(this.student)
      .subscribe(data => console.log(data), error => console.log(error));
    this.student = new Student();
  }

  get Accountnumber(){
    return this.studentsaveform.get('accountnumber');
  }

  get Payeraddress(){
    return this.studentsaveform.get('payeraddress');
  }

  get MihpayId(){
    return this.studentsaveform.get('mihpayId');
  }

  get TxnId(){
    return this.studentsaveform.get('txnId');
  }

  get Amount(){
    return this.studentsaveform.get('amount');
  }

  get PayerName(){
    return this.studentsaveform.get('payer_name');
  }

  get PayerEmail(){
    return this.studentsaveform.get('payer_email');
  }

  get Phone (){
    return this.studentsaveform.get('phone');
  }

  get ProductInfo(){
    return this.studentsaveform.get('productInfo');
  }

  get StudentBranch(){
    return this.studentsaveform.get('student_branch');
  }

  addStudentForm(){
    this.submitted=false;
    this.studentsaveform.reset();
  }
}
