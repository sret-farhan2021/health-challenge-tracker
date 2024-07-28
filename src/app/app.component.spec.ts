import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { UserWorkoutChartComponent } from './user-workout-chart/user-workout-chart.component';
import { WorkoutService } from './workout.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let workoutServiceStub: Partial<WorkoutService>;

  beforeEach(async () => {
    // Stub WorkoutService
    workoutServiceStub = {
      getUsers: () => of([])
    };

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WorkoutFormComponent,
        WorkoutListComponent,
        SearchFilterComponent,
        UserWorkoutChartComponent
      ],
      imports: [FormsModule],
      providers: [{ provide: WorkoutService, useValue: workoutServiceStub }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'health-challenge-tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('health-challenge-tracker');
  });

});
