import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ManagerServicesService } from '../../services/manager-services.service';
export interface DayBookRecord {

  typeOfPayment: string;

  itemType?: string;

  tagNumber?: number;

  totalGrams?: number;

  totalAmount?: number;

  cashPaid?: number;

  upiPaid?: number;

  oldGoldGrams?: number;

  oldGoldAmount?: number;

  oldSilverGrams?: number;

  oldSilverAmount?: number;

  creditAmount?: number;

  customerName?: string;

  mobileNumber?: number;

}
@Component({
  selector: 'app-day-book-details',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './day-book-details.component.html',
  styleUrl: './day-book-details.component.css'
})
export class DayBookDetailsComponent implements OnInit{
  private managerService=inject(ManagerServicesService);
  expandedIndex: number | null = null;

  toggleCard(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.managerService.getDayBookDetails().subscribe({
      next:(response)=>{
        this.records=response.data;
        console.log(response);
      },
      error:(error)=>{
        console.log("error",error);
      }
    })
  }

  // @Input()
  records: DayBookRecord[] = [];
  //----------------------------
  // Badge Color
  //----------------------------

  getBadgeClass(type: string): string {

    switch (type) {

      case 'Sales':
        return 'badge-sales';

      case 'Credit':
        return 'badge-credit';

      case 'OG Purchase':
        return 'badge-gold';
      case 'OS Purchase':
        return 'badge-silver';
      case 'PG Sale':
        return 'badge-gold';
      case 'GOLD':
        return 'badge-gold';
      case 'SILVER':
        return 'badge-silver';
      case 'PS Sale':
        return 'badge-silver';
      default:
        return 'badge-sales';

    }

  }

  //----------------------------
  // Badge Text
  //----------------------------

  getBadgeText(record: DayBookRecord): string {

    if (record.itemType) {
      return record.itemType.toUpperCase();
    }

    return record.typeOfPayment.toUpperCase();

  }

  //----------------------------
  // Print
  //----------------------------

  print() {

    window.print();

  }

  //----------------------------
  // Excel Export
  //----------------------------

  exportExcel(): void {

    import('xlsx').then(xlsx => {

      const excelData = this.records.map(record => ({

        "Transaction Type": record.typeOfPayment,

        "Item": record.itemType ?? "",

        "Tag Number": record.tagNumber ?? "",

        "Customer": record.customerName ?? "",

        "Mobile": record.mobileNumber ?? "",

        "Total Grams": record.totalGrams ?? "",

        "Total Amount": record.totalAmount ?? "",

        "Cash Paid": record.cashPaid ?? "",

        "UPI Paid": record.upiPaid ?? "",

        "Credit Amount": record.creditAmount ?? "",

        "Old Gold Grams": record.oldGoldGrams ?? "",

        "Old Gold Amount": record.oldGoldAmount ?? "",

        "Old Silver Grams": record.oldSilverGrams ?? "",

        "Old Silver Amount": record.oldSilverAmount ?? ""

      }));

      const worksheet = xlsx.utils.json_to_sheet(excelData);

      worksheet["!cols"] = [

        {wch:18},
        {wch:15},
        {wch:15},
        {wch:20},
        {wch:18},
        {wch:15},
        {wch:18},
        {wch:18},
        {wch:18},
        {wch:18},
        {wch:18},
        {wch:18},
        {wch:18},
        {wch:18}

      ];

      const workbook = xlsx.utils.book_new();

      xlsx.utils.book_append_sheet(workbook, worksheet, "Day Book");

      xlsx.writeFile(workbook, "DayBook.xlsx");

    });

  }

}