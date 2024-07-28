import { Component, Input, OnChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { User } from '../workout.service';

@Component({
  selector: 'app-user-workout-chart',
  templateUrl: './user-workout-chart.component.html',
  styleUrls: ['./user-workout-chart.component.css']
})
export class UserWorkoutChartComponent implements OnChanges {
  @Input() users: User[] = [];
  chartOptions: EChartsOption = {};
  selectedUser: User | null = null;

  ngOnChanges() {
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.updateChart();
    }
  }

  updateChart() {
    if (this.selectedUser) {
      const workoutData = this.selectedUser.workouts.reduce((acc: any, workout) => {
        acc.types.push(workout.type);
        acc.minutes.push(workout.minutes);
        return acc;
      }, { types: [], minutes: [] });

      this.chartOptions = {
        xAxis: {
          type: 'category',
          data: workoutData.types,
          name: 'Workout Type',
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10
          }
        },
        yAxis: {
          type: 'value',
          name: 'Minutes',
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10
          }
        },
        series: [{
          data: workoutData.minutes,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          }
        }]
      };
    }
  }

  onUserChange(userId: number) {
    this.selectedUser = this.users.find(user => user.id === userId) || null;
    this.updateChart();
  }
}
