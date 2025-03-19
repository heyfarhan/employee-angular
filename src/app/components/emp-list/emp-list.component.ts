import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-emp-list',
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatSortModule, MatProgressSpinnerModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule],
  templateUrl: './emp-list.component.html',
  styles: `
  *{
    margin:0;
  }
  .emp-list{
    margin:5vh 0 0;
    width:80vw;
    height:80vh;
    display:flex;
    gap:3vh;
    flex-direction:column;
  }
  .search{
    display:flex;
    gap:2vh;
    justify-content:center;
    align-items:baseline;
  }

  `
})
export class EmpListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'dept', 'position', 'salary', 'age'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);
  isLoading = false;

  employees: Employee[] | null = [];
  filteredEmployees: Employee[] | null = [];

  searchHistory: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Williams'];
  filteredOptions: string[] = [];
  private _liveAnnouncer = inject(LiveAnnouncer);
  searchText = "";
  isSearch = false;


  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.loadEmployees();
    if (localStorage.getItem('searchHistory')) {
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    } else {
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }

  loadEmployees() {
    this.isLoading = true;
    this.employeeService.getEmployeesObservable().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filter(event: any): void {
    this.searchText = event.target.value;
    const filterValue = this.searchText?.toLowerCase() || '';
    this.filteredOptions = this.searchHistory.filter(o => o.toLowerCase().includes(filterValue));
  }

  search(): void {
    if (!this.searchText) return;
    this.isSearch = true;
    if (!this.searchHistory.includes(this.searchText)) {

      this.searchHistory.unshift(this.searchText);
      this.searchHistory = this.searchHistory.slice(0, 5);
    }
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    this.filteredEmployees = <Employee[]>this.employees?.filter(emp =>
      emp.name.toLowerCase().includes(this.searchText?.toLowerCase())
    );
    this.dataSource.data = this.filteredEmployees;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.searchText = event.option.viewValue;
    this.search();
  }

  clearSearch() {
    this.searchText = '';
    this.isSearch = false;
    this.filteredEmployees = this.employees;
    this.dataSource.data = <Employee[]>this.filteredEmployees;
  }

}