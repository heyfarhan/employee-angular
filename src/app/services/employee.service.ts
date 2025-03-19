import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, lastValueFrom, Observable, of, tap } from 'rxjs';
import { Employee } from '../models/employee.model';
import { JsonpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesCache$ = new BehaviorSubject<Employee[]>(this.getEmployeesFromLocalStorage());
  private employees$: Observable<Employee[]> = this.employeesCache$.asObservable();


  constructor() {
  }

  private getEmployeesFromLocalStorage(): Employee[] {
    if (!localStorage.getItem('employees')) {
      this.saveToLocalStorage([
        { "id": 1, "name": "Alice", "position": "ceo", "dept": "it", "salary": 200000, "age": 55 },
        { "id": 2, "name": "Bob", "position": "manager", "dept": "hr", "salary": 120000, "age": 42 },
        { "id": 3, "name": "Charlie", "position": "employee", "dept": "sales", "salary": 60000, "age": 30 },
        { "id": 4, "name": "David", "position": "manager", "dept": "it", "salary": 130000, "age": 48 },
        { "id": 5, "name": "Williams", "position": "employee", "dept": "hr", "salary": 55000, "age": 28 },
        { "id": 6, "name": "George", "position": "employee", "dept": "sales", "salary": 65000, "age": 35 }
      ])
    }
    return JSON.parse(<string>localStorage.getItem('employees'));
  }

  getEmployeesObservable(): Observable<Employee[]> {
    return (this.employees$).pipe(
      delay(1000)
    );
  }

  getEmployeesPromise(): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(lastValueFrom(this.employees$)), 1000);
    });
  }

  addEmployee(employee: Employee): Observable<Employee[]> {

    this.employeesCache$.next(this.employeesCache$.value.concat(employee));
    this.saveToLocalStorage(this.employeesCache$.value)
    return (this.employees$).pipe(delay(1000))
  }

  saveToLocalStorage(employees: Employee[]) {
    localStorage.setItem('employees', JSON.stringify(employees))
  }

  generateId(): number {
    if (this.employeesCache$.value.length === 0) return 1;
    const maxId = Math.max(...this.employeesCache$.value.map((emp) => emp.id));
    return maxId + 1;
  }

}

