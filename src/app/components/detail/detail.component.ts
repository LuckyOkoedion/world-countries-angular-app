import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry } from 'src/app/interfaces/ICountry';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  countries: ICountry[] = [];
  selectedName: string = "";
  theCountry!: ICountry;
  borderCountries: string[] = [];
  currencies: string = "";
  languages: string = "";

  darkMoon = "../../../assets/dark-mode.png";
  lightMoon = "../../../assets/light-mode.png";
  darkBack = "../../../assets/white-back.png";
  lightBack = "../../../assets/black-back.png";

  darkModeIcon = this.darkMoon;
  backIcon = this.darkBack;


  darkMode!: boolean;

  constructor(
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {

    this.dataService.getmode().subscribe(theVal => {
      this.darkMode = theVal;
    });

    this.route.paramMap.subscribe(val => {
      let theVal = val.get("name");
      if (theVal !== null) {
        this.selectedName = theVal;
        console.log(this.selectedName);
      }

    });

    if (localStorage.getItem("countriesapi") == null) {
      this.dataService.getdata().subscribe(theVal => {
        this.countries = [...theVal];
      });
    } else {
      let theData = localStorage.getItem("countriesapi");
      if (theData != null) {
        this.countries = [...JSON.parse(theData)];
      }

    }

  }

  ngOnInit(): void {
    let focus = this.countries.find(val => val.name === this.selectedName);
    if (typeof focus !== 'undefined') {
      this.theCountry = focus;
    }

    let borders = this.theCountry?.borders;
    this.borderCountries.length = 0;
    borders?.forEach(valu => {
      let theCountry = this.countries.find(val => val.alpha3Code === valu);
      if (typeof theCountry !== 'undefined') {
        this.borderCountries.push(theCountry.name);
      }
    });

    let currencies = this.theCountry?.currencies.map(val => val.name);
    this.currencies = currencies?.join(", ");
    let languages = this.theCountry?.languages.map(val => val.name);
    this.languages = languages?.join(", ");


  }

  setMode() {
    this.dataService.setmode(this.darkMode);
    if (this.darkMode) {
      this.darkModeIcon = this.darkMoon;
      this.backIcon = this.darkBack;

    } else {
      this.darkModeIcon = this.lightMoon;
      this.backIcon = this.lightBack;
    }

  }

  viewCountry(border: string) {

    let focus = this.countries.find(val => val.name === border);
    if (typeof focus !== 'undefined') {
      this.theCountry = focus;
    }

    let borders = this.theCountry?.borders;
    this.borderCountries.length = 0;
    borders?.forEach(valu => {
      let theCountry = this.countries.find(val => val.alpha3Code === valu);
      if (typeof theCountry !== 'undefined') {
        this.borderCountries.push(theCountry.name);
      }
    });

    let currencies = this.theCountry.currencies.map(val => val.name);
    this.currencies = currencies.join(", ");
    let languages = this.theCountry.languages.map(val => val.name);
    this.languages = languages.join(", ");

  }

  back() {
    this.router.navigate(['/list']);
  }

}
