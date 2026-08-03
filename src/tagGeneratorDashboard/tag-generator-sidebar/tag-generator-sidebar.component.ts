import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-tag-generator-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './tag-generator-sidebar.component.html',
  styleUrl: './tag-generator-sidebar.component.css'
})
export class TagGeneratorSidebarComponent {
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
