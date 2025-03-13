import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { Employee } from '../models/employee.model';
import { JsonpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCache = new BehaviorSubject<Employee[] | null>(null);

  employee = [
    { "id": 1, "name": "John Doe", "dept": "HR", "salary": 55000, "age": 29 },
    { "id": 2, "name": "Jane Smith", "dept": "IT", "salary": 72000, "age": 34 },
    { "id": 3, "name": "Alice Brown", "dept": "Finance", "salary": 63000, "age": 40 },
    { "id": 4, "name": "Bob White", "dept": "Marketing", "salary": 59000, "age": 27 },
    { "id": 5, "name": "Charlie Lee", "dept": "IT", "salary": 80000, "age": 38 }]

  constructor() {
  }

  getEmployeesObservable(): Observable<Employee[] | null> {
    if (!this.employeesCache.value) {
      this.saveToLocalStorage()
      return of(this.employee).pipe(
        delay(1000), // Simulate network delay
        tap((data) => this.employeesCache.next(data))
      );
    }
    return this.employeesCache.asObservable();
  }

  getEmployeesPromise(): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.employee), 1000);
    });
  }

  addEmployee(employee: Employee): Observable<Employee> {
    this.saveToLocalStorage()
    return of(employee).pipe(
      delay(500), // Simulate API response delay
      tap(() => {
        this.employee.push(employee);
        this.employeesCache.next(null);
      })
    );
  }

  saveToLocalStorage() {
    localStorage.setItem('employee', JSON.stringify(this.employee))
  }

}
