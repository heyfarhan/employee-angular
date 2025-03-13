import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-emp-list',
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './emp-list.component.html',
  styles: `
  .empList{
    width:50vw;
    margin:5vh 10vw 2vh;
  }
  `
})
export class EmpListComponent {


  employees: Employee[] | null = [];
  filteredEmployees: Employee[] | null = [];
  searchTerm: string = '';
  searchHistory: string[] = [];
  displayedColumns: string[] = ['id', 'name', 'dept', 'salary', 'age'];
  dataSource: any = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private employeeService: EmployeeService) {
  }


  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployeesObservable().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
      this.dataSource.data = data;
    });
  }



}

