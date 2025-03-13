import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import {
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-emp',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSnackBarModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-emp.component.html',
  styles: `
  .form{
    display:flex;
    flex-direction:column;
    width:50vw;
  }
  .add-employee-container{
    margin:5vh 10vw;
  }
  `
})
export class AddEmpComponent {

  employeeForm!: FormGroup;
  message: string = '';
  isSuccess: boolean = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        (next) => {
          this.message = 'Employee added successfully!';
          this.employeeService.addEmployee(this.employeeForm.value)
          this.isSuccess = true;
          this.router.navigate([''])
          this.employeeForm.reset();
        },
        (error) => {
          this.message = 'Error adding employee!';
          this.isSuccess = false;
        }
      );
    }
  }

}
