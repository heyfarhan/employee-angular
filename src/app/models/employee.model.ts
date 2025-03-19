export interface Employee {
    id: number;
    name: string;
    position: 'ceo' | 'manager' | 'employee';
    dept: 'it' | 'hr' | 'sales';
    salary: number;
    age: number;
}