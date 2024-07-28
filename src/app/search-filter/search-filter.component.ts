import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent {
  name: string = '';
  type: string = '';

  @Output() filterChanged = new EventEmitter<{ name: string; type: string }>();

  onFilterChange() {
    this.filterChanged.emit({ name: this.name, type: this.type });
  }
}
