import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WorkoutService, User } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit, OnChanges {
  @Input() filter: { name: string; type: string } = { name: '', type: '' };
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(user => {
      return (
        (!this.filter.name || user.name.toLowerCase().includes(this.filter.name.toLowerCase())) &&
        (!this.filter.type || user.workouts.some(workout => workout.type.toLowerCase().includes(this.filter.type.toLowerCase())))
      );
    });
    this.paginate();
  }

  paginate() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  onPageChanged(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1; // Reset to first page when items per page change
    this.paginate();
  }

  getTotalMinutes(user: User): number {
    return user.workouts.reduce((total, workout) => total + workout.minutes, 0);
  }
}
