import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICountry } from 'src/app/interfaces/ICountry';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  darkMoon = "../../../assets/dark-mode.png";
  lightMoon = "../../../assets/light-mode.png";
  darkSearch = "../../../assets/white-search-icon.png";
  lightSearch = "../../../assets/dark-search-icon.png";

  darkModeIcon = this.darkMoon;
  searchIcon = this.darkSearch;

  darkMode!: boolean;


  countries: ICountry[] = [];

  countriesToDisplay: ICountry[] = [];

  forFilter: ICountry[] = [];

  regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  selectedRegion = "";
  searchText = "";

  constructor(private readonly dataService: DataService, private readonly router: Router) {
    this.dataService.getmode().subscribe(theVal => {
      this.darkMode = theVal;
    });

  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    if (localStorage.getItem("countriesapi") == null) {

      this.dataService.getdata().subscribe(theVal => {
        this.countries = [...theVal];
        this.forFilter.length = 0;
        this.countriesToDisplay.length = 0;
        this.countriesToDisplay = [...this.countries];
        this.forFilter = [...this.countries];
        localStorage.setItem("countriesapi", JSON.stringify(this.countriesToDisplay));
      });

    } else {
      this.forFilter.length = 0;
      this.countriesToDisplay.length = 0;
      let theData = localStorage.getItem("countriesapi");
      if (theData != null) {
        this.countriesToDisplay = [...JSON.parse(theData)];
        this.forFilter = [...JSON.parse(theData)];
      }

    }
  }

  filter() {
    if (this.selectedRegion !== "") {
      let theFilter = this.forFilter.filter(val => val.region === this.selectedRegion);
      this.countriesToDisplay.length = 0;
      this.countriesToDisplay = [...theFilter];

    }

  }

  search(event: KeyboardEvent) {

    if (this.searchText === "") {
      this.fetchData();
      return;
    }

    if (event.key === "Enter") {

      if (this.searchText === "") {
        this.fetchData();
        return;
      }

      let reg = new RegExp(this.searchText, "i");

      // Search results from names
      let inNames: ICountry[] = this.forFilter.filter(val => {
        let match = val.name.match(reg);
        if (match !== null) {
          return true;
        } else {
          let reg2 = new RegExp(val.name, "i");
          let match2 = this.searchText.match(reg2);
          if (match2 !== null) {
            return true
          } else {
            return false;
          }
        }
      }

      );

      // Search results from currencies
      let inCurrencies: ICountry[] = this.forFilter.filter(val => {
        let currencies = val.currencies?.map(cur => cur.name);
        if (currencies?.includes(this.searchText)) {
          return true;
        } else {
          return false;
        }
      });

      // Search results from native names

      let inNativeNames: ICountry[] = this.forFilter.filter(val => {
        let match = val.nativeName.match(reg);
        if (match !== null) {
          return true;
        } else {
          let reg2 = new RegExp(val.nativeName, "i");
          let match2 = this.searchText.match(reg2);
          if (match2 !== null) {
            return true;
          } else {
            return false;
          }
        }
      });

      // Merge results and remove duplicates
      let allResults: ICountry[] = inNames.concat(inCurrencies, inNativeNames);
      let noDuplicates: ICountry[] = Object.values(allResults.reduce((acc, cur) => Object.assign(acc, { [cur.name]: cur }), {}));

      this.countriesToDisplay.length = 0;
      this.countriesToDisplay = [...noDuplicates];


    }
  }

  toDetail(name: string) {
    this.router.navigate([`/detail/${name}`]);
  }

  setMode() {
    this.dataService.setmode(this.darkMode);
    if (this.darkMode) {
      this.darkModeIcon = this.darkMoon;
      this.searchIcon = this.darkSearch;

    } else {
      this.darkModeIcon = this.lightMoon;
      this.searchIcon = this.lightSearch;
    }

  }

}
