import { Component } from '@angular/core';
import { WorkoutService, User } from '../workout.service';

interface Workout {
  type: string;
  minutes: number;
}

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  availableWorkouts: string[] = ['Yoga', 'Running', 'Cycling', 'Swimming'];
  maxWorkouts: number = 4;
  workouts: Workout[] = [{ type: '', minutes: 0 }];
  name: string = '';
  alertMessage: string = '';

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.workouts.length < this.maxWorkouts) {
      this.workouts.push({ type: '', minutes: 0 });
      this.alertMessage = '';
    } else {
      this.alertMessage = 'You can only add up to 5 workouts.';
    }
  }

  removeWorkout(index: number) {
    this.workouts.splice(index, 1);
    this.alertMessage = '';
  }

  isWorkoutAdded(workoutType: string): boolean {
    return this.workouts.some(workout => workout.type === workoutType);
  }

  isFormValid(): boolean {
    const types = this.workouts.map(workout => workout.type);
    const minutes = this.workouts.map(workout => workout.minutes);
    return this.name.trim() !== '' && types.every(type => type) && minutes.every(min => min > 0);
  }

  onSubmit() {
    if (this.isFormValid()) {
      const newUser: User = {
        id: this.generateId(),
        name: this.name,
        workouts: this.workouts,
      };
      this.workoutService.addUser(newUser);
      this.resetForm();
      this.alertMessage = 'User added successfully!';
      alert('User added successfully!');
    } else {
      this.alertMessage = 'Please fill in all fields correctly.';
      alert('Please fill in all fields correctly.');
    }
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  resetForm() {
    this.name = '';
    this.workouts = [{ type: '', minutes: 0 }];
    this.alertMessage = '';
  }

  getAvailableWorkouts(selectedType: string = ''): string[] {
    return this.availableWorkouts.filter(workout => workout === selectedType || !this.isWorkoutAdded(workout));
  }
}
