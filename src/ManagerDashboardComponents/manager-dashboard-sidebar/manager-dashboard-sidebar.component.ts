import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthServiceService } from '../../services/auth-service.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-manager-dashboard-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manager-dashboard-sidebar.component.html',
  styleUrl: './manager-dashboard-sidebar.component.css'
})
export class ManagerDashboardSidebarComponent {
  @Output()
  renderMenu=new EventEmitter<string>();
  authService=inject(AuthServiceService);
  currentDashboard:string='';
  changeDashboard(x:string){
    this.renderMenu.emit(x);
    this.currentDashboard=x;
  }
  getLogout(){
    this.authService.logout();
  }
}
