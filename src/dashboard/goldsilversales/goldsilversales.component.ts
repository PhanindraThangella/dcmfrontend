import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy,Input,OnChanges,SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { AdminServiceService } from '../../services/admin-service.service';
import { inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-goldsilversales',
  standalone: true,
  imports: [CurrencyPipe,],
  templateUrl: './goldsilversales.component.html',
  styleUrl: './goldsilversales.component.css'
})

export class GoldsilversalesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  @Input()
  date='';
  private chartInstance?: Chart;
  // Data matching your design image
  private adminService=inject(AdminServiceService);
  public goldValue=0;
  public silverValue=0;
  public goldPercentage=0;
  public silverPercentage = 0;

  private chartConfig: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['Gold Sales', 'Silver Sales'],
      datasets: [{
        data: [this.goldPercentage, this.silverPercentage],
        backgroundColor: ['#dfb03e', '#a9a9a9'], // Custom gold and silver hex fills
        borderWidth: 0,                           // Removes borders between segments
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%', // Adjusts thickness to match your design hollow center
      plugins: {
        legend: {
          display: false // Disables default legend to use our custom HTML structure instead
        },
        tooltip: {
          enabled: true
        }
      }
    }
  };
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'] && changes['date'].currentValue) {
      // Re-run the API call with the fresh date string instantly
      this.fetchData();
    }
  }
  fetchData()
  {
    const parsedDate = new Date(this.date);
    const isValid = this.date && !isNaN(parsedDate.getTime());
    const finalDate = isValid ? parsedDate : new Date();
    const cleanDateStr = new Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(finalDate);
    this.adminService.getGoldSilverStats(cleanDateStr).subscribe({
      next:(response)=>{
        console.log(response);
        this.goldPercentage=response.data.goldPercentage;
        this.silverPercentage=response.data.silverPercentage;
        this.goldValue=response.data.totalGoldSales;
        this.silverValue=response.data.totalSilverSales;

        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.chartConfig.data.datasets[0].data = [this.goldPercentage, this.silverPercentage];

        this.chartInstance = new Chart(this.doughnutCanvas.nativeElement, this.chartConfig);
      },
      error:(error)=>{
        console.log("error",error);
      }
    })
  }
  ngAfterViewInit(): void {
    // console.log(this.date);
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
