import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UserWorkoutChartComponent } from './user-workout-chart/user-workout-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    SearchFilterComponent,
    PaginationComponent,
    UserWorkoutChartComponent,
  ],
  imports: [BrowserModule, FormsModule,NgxEchartsModule.forRoot({ echarts: () => import('echarts') })],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AppModule {}
