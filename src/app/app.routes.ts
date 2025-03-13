import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddEmpComponent } from './components/add-emp/add-emp.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent
},
{
    path: 'add',
    component: AddEmpComponent
},
];
