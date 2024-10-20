import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import { FacilityService } from '../../Facilities/facility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mostReservedFacilityData: any;
  chart: any;

  constructor(private facilityService: FacilityService) {
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit(): void {
    this.getMostReservedFacilityData();
  }

  // Fetch most reserved facility data and create the bar chart
  getMostReservedFacilityData(): void {
    this.facilityService.getMostReservedFacility().subscribe(
      (data) => {
        // Check if the data is an array or an object
        if (Array.isArray(data)) {
          this.mostReservedFacilityData = data;
        } else if (typeof data === 'object') {
          // If it's a single object, convert it to an array
          this.mostReservedFacilityData = [data];
        } else {
          console.error('Unexpected data format:', data);
          return;
        }
        this.createBarChart(this.mostReservedFacilityData);
      },
      (error) => {
        console.error('Error fetching most reserved facility data', error);
      }
    );
  }

  // Create bar chart with specified colors
  createBarChart(data: any): void {
    const facilityNames = data.map((facility: any) => facility.facilityName);
    const reservationCounts = data.map((facility: any) => facility.reservationCount);

    this.chart = new Chart('facilityChart', {
      type: 'bar',
      data: {
        labels: facilityNames,
        datasets: [{
          label: '# of Reservations',
          data: reservationCounts,
          backgroundColor: ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#800080'], // Red, Orange, Yellow, Green, Purple
          borderColor: ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#800080'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Generate the report as a PDF after chart has been rendered
  generatePdfReport(): void {
    if (this.chart) {
      const doc = new jsPDF();
      doc.text('Most Reserved Facilities Report', 10, 10);

      // Wait for the chart to be rendered
      setTimeout(() => {
        const chartImage = this.chart.toBase64Image();
        doc.addImage(chartImage, 'PNG', 10, 20, 180, 160); // Adds the chart as an image
        doc.save('MostReservedFacilitiesReport.pdf');
      }, 500);  // Add a slight delay to ensure the chart is rendered
    } else {
      console.error('Chart not rendered yet');
    }
  }
}

