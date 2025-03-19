import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
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
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-emp',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSnackBarModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-emp.component.html',
  styles: `
  .form{
    display:flex;
    flex-direction:column;
    width:50vw;
  }
  .add-employee-container{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:3vh 10vw;
    gap:2vh;
    background-color:white;
    padding:2vh 2vw;
    border-radius:10px;
  }
  .btn-add{
    color:white;
    width:50%;
    align-self:center;
    margin:1vh 0;
  }
  .btn-add{
    background-color:green;
  }
  `
})
export class AddEmpComponent {

  employeeForm!: FormGroup;
  message: string = '';
  isSuccess: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      dept: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(55)]]
    });
  }


  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee({ id: this.employeeService.generateId(), ...this.employeeForm.value }).subscribe({
        next: () => {
          this.message = 'Employee added successfully!';
          this.isSuccess = true;
          this.router.navigate([''])
          this.employeeForm.reset();
        },
        error: () => {
          this.message = 'Error adding employee!';
          this.isSuccess = false;
        }
      });
    }
  }
}
