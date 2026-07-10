import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardHomeComponent } from '../dashboard/dashboard-home/dashboard-home.component';
import { EmployeeHomeComponent } from '../employee-home/employee-home.component';
import { HomeComponent } from '../home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ManagerDashboardHomeComponent } from '../ManagerDashboardComponents/manager-dashboard-home/manager-dashboard-home.component';
import { TagGeneratorComponent } from '../tag-generator/tag-generator.component';
import { DayBookDetailsComponent } from '../ManagerDashboardComponents/day-book-details/day-book-details.component';
export const routes: Routes = [
    {path:'',pathMatch:'full',component:HomeComponent},
    {path:'login',component:LoginComponent},
    // {path:'admin',component:DashboardHomeComponent,canActivate:[authGuard],data:{ role: ['ADMIN'] }},
    {path:'employee',component:EmployeeHomeComponent,canActivate:[authGuard],data:{ role: ['EMPLOYEE']}},
    {path:'dashboard',component:DashboardHomeComponent},
    {path:'MD',component:ManagerDashboardHomeComponent},
    {path:'tg',component:TagGeneratorComponent},
    {path:'db',component:DayBookDetailsComponent}
];
