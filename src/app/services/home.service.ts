import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeData } from '../models/home.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private api = 'https://backend-web-omega.vercel.app/api/home';

  private homeData$ = new BehaviorSubject<HomeData | null>(null);

  constructor(private http: HttpClient) {}

  getHome(): Observable<HomeData> {
    return this.http.get<HomeData>(this.api).pipe(
      tap(data => this.homeData$.next(data))
    );
  }

  homeDataObservable(): Observable<HomeData | null> {
    return this.homeData$.asObservable();
  }

  updateHome(data: HomeData): Observable<HomeData> {
    return this.http.put<HomeData>(this.api, data).pipe(
      tap(updated => this.homeData$.next(updated))
    );
  }
}