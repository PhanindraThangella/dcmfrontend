import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto'; // /auto registers everything automatically

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [],
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.css'
})
export class SalesChartComponent implements AfterViewInit, OnDestroy {
  // Grab a direct reference to the canvas element in the template
  @ViewChild('salesCanvas') private salesCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chartInstance?: Chart;

  // Configurations are strictly typed via native Chart.js types
  private chartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales (Rs)',
        data:[10000, 30000, 50000, 40000, 60000, 80000],
        borderColor: '#ffd64f',     // Modern vibrant blue line
        backgroundColor: '#fa9a6d20', // Soft translucent fill
        fill: true,                  // Enables the background fill
        tension: 0.3,                // Smooths out sharp angles nicely
        pointRadius: 5,                  // Slightly larger for better visual weight
        pointHoverRadius: 7,             // Expands cleanly when you hover
        pointBackgroundColor: '#ffd64f', // FORCES the inside of the dot to be solid blue
        pointBorderColor: '#ffd64f',     // Matches the background for a seamless look
        pointHoverBackgroundColor: '#1d4ed8', // Darker blue solid fill on hover
        pointHoverBorderColor: '#1d4ed8'      // Seamless hover border
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,    // Allows you to control heights via CSS easily
      plugins: {
        legend: { display: true, position: 'top' }
      },
      scales: {
        y: { beginAtZero: true }     // Ensures context starts cleanly at 0
      }
    }
  };

  ngAfterViewInit(): void {
    // Safely render the chart once the view elements are fully available
    this.chartInstance = new Chart(
      this.salesCanvas.nativeElement, 
      this.chartConfig
    );
  }

  ngOnDestroy(): void {
    // Crucial to prevent DOM memory leaks when navigating away from the component
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
