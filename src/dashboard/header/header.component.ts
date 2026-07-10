import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output()
  reqEmReg=new EventEmitter<void>();
  @Output()
  date=new EventEmitter<any>();
  showForm(){
    this.reqEmReg.emit();
  }
  username="Phanindra";
  todayDate: string = new Date().toISOString().slice(0, 10);
  fetchDate(event:Event){
    const input=event.target as HTMLInputElement;
    const value=input.value;
    console.log(value);
    const selectedDate = new Date(value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if(selectedDate > today)
    {
      alert("Cannot Proceed with future dates.");
    }
    else{
      this.date.emit(selectedDate);
    }
  }
}
