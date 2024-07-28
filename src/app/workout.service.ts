import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey = 'workoutUsers';
  private initialUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 },
      ],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 },
      ],
    },
  ];
  private users: User[] = this.loadUsersFromStorage();
  private usersSubject = new BehaviorSubject<User[]>(this.users);

  constructor() {
    this.ensureInitialUsers();
  }

  private loadUsersFromStorage(): User[] {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToStorage(users: User[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  private ensureInitialUsers() {
    if (this.users.length === 0) {
      this.users = [...this.initialUsers];
      this.saveUsersToStorage(this.users);
      this.usersSubject.next(this.users);
    }
  }

  getUsers() {
    return this.usersSubject.asObservable();
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUsersToStorage(this.users);
    this.usersSubject.next(this.users);
  }
}
