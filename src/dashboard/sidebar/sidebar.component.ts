import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthServiceService } from '../../services/auth-service.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output()
  renderMenu=new EventEmitter<String>();
  authService=inject(AuthServiceService);
  changeDashboard(x:String){
    this.renderMenu.emit(x);
  }
  getLogout(){
    this.authService.logout();
  }
}

