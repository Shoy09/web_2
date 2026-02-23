import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeData } from '../models/home.model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private api = '/api/home';

  private homeData$ = new BehaviorSubject<HomeData | null>(null);

  constructor(private http: HttpClient) {}

  getHome(): Observable<HomeData> {
    return this.http.get<HomeData>(this.api).pipe(
      tap(data => this.homeData$.next(data)),
      catchError(() => {
        const fallback: HomeData = {
          hero: { titleLines: [''], buttonText: '', buttonLink: '' },
          cards: [],
          about: { title: '', paragraphs: [], linkText: '', linkUrl: '' }
        };
        this.homeData$.next(fallback);
        return of(fallback);
      })
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
