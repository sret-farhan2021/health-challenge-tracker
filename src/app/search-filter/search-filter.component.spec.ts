import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update name and emit filterChanged when name input changes', () => {
    spyOn(component.filterChanged, 'emit');

    const nameInput = fixture.debugElement.query(By.css('#nameFilter')).nativeElement;
    nameInput.value = 'John';
    nameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.name).toBe('John');
    expect(component.filterChanged.emit).toHaveBeenCalledWith({ name: 'John', type: '' });
  });

  it('should update type and emit filterChanged when type input changes', () => {
    spyOn(component.filterChanged, 'emit');

    const typeInput = fixture.debugElement.query(By.css('#typeFilter')).nativeElement;
    typeInput.value = 'Yoga';
    typeInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.type).toBe('Yoga');
    expect(component.filterChanged.emit).toHaveBeenCalledWith({ name: '', type: 'Yoga' });
  });

  it('should emit filterChanged event when onFilterChange is called', () => {
    spyOn(component.filterChanged, 'emit');
    
    component.name = 'Jane';
    component.type = 'Running';
    component.onFilterChange();
    
    expect(component.filterChanged.emit).toHaveBeenCalledWith({ name: 'Jane', type: 'Running' });
  });
});
