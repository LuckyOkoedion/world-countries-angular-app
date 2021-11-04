import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DataService } from 'src/app/services/data.service';

import { ListComponent } from './list.component';

let dataServiceStub: { getdata: () => Observable<never[]>; getmode: () => Observable<boolean>; setMode: () => void; };

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let brandTitle: HTMLDivElement;
  let darkModeButton: HTMLDivElement;
  let searchInput: HTMLInputElement;
  let filterSelect: HTMLSelectElement;

  dataServiceStub = {

    getdata: () => {
      return of([]);
    },

    getmode: () => {
      return of(true)
    },

    setMode: () => {
    }

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [FormsModule, AppRoutingModule],
      providers: [{ provide: DataService, useValue: dataServiceStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    brandTitle = fixture.nativeElement.querySelector('.brand');
    darkModeButton = fixture.nativeElement.querySelector('.darkmode-switch-text');
    searchInput = fixture.nativeElement.querySelector('.search-input');
    filterSelect = fixture.nativeElement.querySelector(".filter");
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should contain the right brand title", () => {
    expect(brandTitle.textContent).toContain("Where in the world?");
  });

  it("Should contain darkmode button", () => {
    expect(darkModeButton.textContent).toContain("Dark Mode");
  });

  it("should have input element with class 'search-input' present", () => {
    expect(searchInput).toBeTruthy();
  });

  it("should have select element with class 'filter' present", () => {
    expect(filterSelect).toBeTruthy();
  });

  it("should change 'searchText' through ngModel directive when search input value changes", () => {
    searchInput.value = "a TEST   ValuE";
    searchInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.searchText).toBe("a TEST   ValuE");
  });

  it("should change 'selectedRegion' through ngModel directive when select filter value changes", () => {
    let expected = filterSelect.options[3].value;
    filterSelect.value = expected;
    filterSelect.dispatchEvent(new Event("change"));
    fixture.detectChanges();
    expect(component.selectedRegion).toBe(expected);
  });

});
