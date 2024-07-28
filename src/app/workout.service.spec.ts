import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial users if storage is empty', () => {
    localStorage.clear();
    service = new WorkoutService();
    expect(service.getUsers()).toBeTruthy();
  });

  it('should add a user', () => {
    const user = { id: 1, name: 'Test User', workouts: [] };
    service.addUser(user);
    service.getUsers().subscribe(users => {
      expect(users.length).toBeGreaterThan(0);
    });
  });
});
