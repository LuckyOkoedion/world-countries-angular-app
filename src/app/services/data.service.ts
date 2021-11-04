import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICountry } from '../interfaces/ICountry';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private countries: Subject<ICountry[]> = new Subject();
  private darkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private readonly http: HttpClient) {

    this.http.get<ICountry[]>("https://restcountries.com/v2/all").subscribe(theVal => {
      this.countries.next(theVal);
    });

  }



  getdata() {
    return this.countries.asObservable();
  }

  getmode() {
    return this.darkMode.asObservable();
  }

  setmode(cur: boolean) {
    this.darkMode.next(!cur);
  }
}
