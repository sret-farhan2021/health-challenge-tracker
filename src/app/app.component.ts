import { Component } from '@angular/core';
import { WorkoutService, User } from './workout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'health-challenge-tracker';
  currentFilter = { name: '', type: '' };
  users: User[] = [];

  constructor(private workoutService: WorkoutService) {
    this.workoutService.getUsers().subscribe(users => this.users = users);
  }

  onFilterChanged(filter: { name: string; type: string }) {
    this.currentFilter = filter;
  }
}
