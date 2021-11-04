import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DataService } from 'src/app/services/data.service';

import { DetailComponent } from './detail.component';

let dataServiceStub: { getdata: () => Observable<never[]>; getmode: () => Observable<boolean>; setMode: () => void; };

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

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
      declarations: [DetailComponent],
      imports: [FormsModule, AppRoutingModule],
      providers: [{ provide: DataService, useValue: dataServiceStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
