import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserWorkoutChartComponent } from './user-workout-chart.component';
import { User } from '../workout.service';

describe('UserWorkoutChartComponent', () => {
  let component: UserWorkoutChartComponent;
  let fixture: ComponentFixture<UserWorkoutChartComponent>;

  // Mock data
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserWorkoutChartComponent],
      imports: [NgxEchartsModule.forRoot({ echarts: () => import('echarts') })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkoutChartComponent);
    component = fixture.componentInstance;
    component.users = mockUsers;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chartOptions on ngOnChanges', () => {
    component.ngOnChanges();
    expect(component.chartOptions).toBeDefined();

    const xAxis = component.chartOptions.xAxis as any;
    if (xAxis && 'data' in xAxis) {
      expect(xAxis.data).toEqual(['Running', 'Cycling']);
    }

    if (component.chartOptions.series && Array.isArray(component.chartOptions.series)) {
      expect(component.chartOptions.series[0].data).toEqual([30, 45]);
    }
  });

  it('should update chart options when a user is changed', () => {
    component.onUserChange(2);
    expect(component.selectedUser).toEqual(mockUsers[1]);

    const xAxis = component.chartOptions.xAxis as any;
    if (xAxis && 'data' in xAxis) {
      expect(xAxis.data).toEqual(['Swimming']);
    }

    if (component.chartOptions.series && Array.isArray(component.chartOptions.series)) {
      expect(component.chartOptions.series[0].data).toEqual([60]);
    }
  });

  it('should call updateChart when a user is changed', () => {
    spyOn(component, 'updateChart');
    component.onUserChange(1);
    expect(component.updateChart).toHaveBeenCalled();
  });
});
