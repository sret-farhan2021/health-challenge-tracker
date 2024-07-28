import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutFormComponent ],
      imports: [ FormsModule ],
      providers: [ WorkoutService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove a workout', () => {
    component.workouts.push({ type: 'Running', minutes: 30 });
    component.removeWorkout(0);
    expect(component.workouts.length).toBe(1); // Initial workout should still be there
  });

  it('should add a new workout', () => {
    component.addWorkout();
    expect(component.workouts.length).toBe(2); // Initial workout + 1 new workout
  });

  it('should call addUser on submit if form is valid', () => {
    spyOn(workoutService, 'addUser');
    component.name = 'Test User';
    component.workouts = [{ type: 'Running', minutes: 30 }];
    component.onSubmit();
    expect(workoutService.addUser).toHaveBeenCalled();
  });

  it('should alert when form is invalid', () => {
    spyOn(window, 'alert');
    component.name = 'Test User';
    component.workouts = [{ type: '', minutes: 0 }];
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields correctly.');
  });
});
