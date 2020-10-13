import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

 constructor(private studentservice:StudentService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  students: Observable<Student[]>;
  student : Student=new Student();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;


  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.studentservice.getPaymentList().subscribe(data =>{
    this.students =data;
    this.dtTrigger.next();
    })
  }

  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.studentservice.getPaymentList().subscribe(data =>{
            this.students =data
            })
        },
        error => console.log(error));
  }


  updateStudent(id: number){
    this.studentservice.getStudent(id)
      .subscribe(
        data => {
          this.studentlist=data
        },
        error => console.log(error));
  }

  studentupdateform=new FormGroup({
    student_id:new FormControl(),
    student_name:new FormControl(),
    student_email:new FormControl(),
    student_branch:new FormControl()
  });

  updateStu(updstu){
    this.student=new Student();

    this.student.payerId=this.PayerID.value;
    this.student.payername=this.PayerName.value;
    this.student.email=this.Email.value;
    this.student.phone=this.Phone.value;
    this.student.productInfo=this.ProductInfo.value;
    this.student.amount=this.Amount.value;
    this.student.txnId=this.TxnId.value;
    this.student.mihpayId=this.MihpayId.value;
    this.student.payeraddress=this.Payeraddress.value;
    this.student.accountnumber=this.Accountnumber.value;

  //  this.student.student_id=this.StudentId.value;
  //  this.student.student_name=this.StudentName.value;
  //  this.student.student_email=this.StudentEmail.value;
  //  this.student.student_branch=this.StudentBranch.value;


   this.studentservice.updateStudent(this.student.payerId,this.student).subscribe(
    data => {
      this.isupdated=true;
      this.studentservice.getPaymentList().subscribe(data =>{
        this.students =data
        })
    },
    error => console.log(error));
  }

  get PayerID(){
    return this.studentupdateform.get('payer_id');
  }

  get PayerName(){
    return this.studentupdateform.get('payer_name');
  }

  get Email(){
    return this.studentupdateform.get('payer_email');
  }

  get Phone(){
    return this.studentupdateform.get('payer_email');
  }

  get TxnId(){
    return this.studentupdateform.get('payer_txnId');
  }

  get ProductInfo(){
    return this.studentupdateform.get('product_info');
  }

  get Amount(){
    return this.studentupdateform.get('pay_amount');
  }
  get MihpayId(){
    return this.studentupdateform.get('payer_MihpayId');
  }

  get Payeraddress(){
    return this.studentupdateform.get('payer_address');
  }

  get Accountnumber(){
    return this.studentupdateform.get('account_number');
  }

  // get StudentName(){
  //   return this.studentupdateform.get('student_name');
  // }

  // get StudentEmail(){
  //   return this.studentupdateform.get('student_email');
  // }

  // get StudentBranch(){
  //   return this.studentupdateform.get('student_branch');
  // }

  // get StudentId(){
  //   return this.studentupdateform.get('student_id');
  // }

  changeisUpdate(){
    this.isupdated=false;
  }
}
