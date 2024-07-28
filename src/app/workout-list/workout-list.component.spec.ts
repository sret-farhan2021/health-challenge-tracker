import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService, User } from '../workout.service';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutServiceMock: any;

  beforeEach(async () => {
    workoutServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of([
        { id: 1, name: 'User 1', workouts: [{ type: 'Yoga', minutes: 30 }, { type: 'Running', minutes: 20 }] },
        { id: 2, name: 'User 2', workouts: [{ type: 'Cycling', minutes: 40 }] }
      ]))
    };

    await TestBed.configureTestingModule({
      declarations: [WorkoutListComponent],
      imports: [FormsModule],
      providers: [{ provide: WorkoutService, useValue: workoutServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly paginate users', () => {
    component.itemsPerPage = 1;
    component.applyFilter();
    expect(component.paginatedUsers.length).toBe(1);
    component.onPageChanged(2);
    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('User 2');
  });

  it('should apply filter correctly', () => {
    component.filter = { name: 'User 1', type: '' };
    component.applyFilter();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('User 1');
  });

  it('should correctly calculate total minutes for a user', () => {
    const user: User = { id: 1, name: 'User 1', workouts: [{ type: 'Yoga', minutes: 30 }, { type: 'Running', minutes: 20 }] };
    expect(component.getTotalMinutes(user)).toBe(50);
  });

  it('should reset to first page when items per page change', () => {
    component.currentPage = 2;
    component.onItemsPerPageChange({ target: { value: '1' } } as unknown as Event);
    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPage).toBe(1);
  });
});
