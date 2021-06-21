import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student-dahsboard.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue !: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      StudentID : [''],
      StudentName : [''],
      Course : ['']
    })
    this.getAllStudent();
  }

  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postStudentDetails(){
    this.studentModelObj.StudentID = this.formValue.value.StudentID;
    this.studentModelObj.StudentName = this.formValue.value.StudentName;
    this.studentModelObj.Course = this.formValue.value.Course;

    this.api.postStudent(this.studentModelObj).subscribe(res=>{
      console.log(res);
      alert("Student Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    },
    err=>{
      alert("Something went wrong")
    })
  }

  getAllStudent(){
    this.api.getStudent(this.studentData)
    .subscribe(res=>{
      this.studentData = res;
    })
  }

  deleteStudent(row : any){
    this.api.deleteStudent(row.StudentID)
    .subscribe(res=>{
      alert("Student Deleted");
      this.getAllStudent();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.StudentID = row.StudentID;
    this.formValue.controls['StudentID'].setValue(row.StudentID);
    this.formValue.controls['StudentName'].setValue(row.StudentName);
    this.formValue.controls['Course'].setValue(row.Course);
  }

  updateStudentDetails(){
    this.studentModelObj.StudentID = this.formValue.value.StudentID;
    this.studentModelObj.StudentName = this.formValue.value.StudentName;
    this.studentModelObj.Course = this.formValue.value.Course;

    this.api.updateStudent(this.studentModelObj).subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    })
  }

}
