import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AboutSection } from '../models/about.model';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private api = 'http://localhost:3000/api/about';

  private _aboutData: AboutSection = this.getDefaultData();
  private aboutDataSubject = new BehaviorSubject<AboutSection>(this._aboutData);
  public aboutData$ = this.aboutDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  getAbout(): AboutSection {
    return JSON.parse(JSON.stringify(this._aboutData));
  }

  getAboutObservable(): Observable<AboutSection> {
    return this.aboutData$;
  }

  updateAbout(data: AboutSection): void {
    const aboutData = {
      heroTitle: (data.heroTitle ?? '').trim(),
      subtitle: (data.subtitle ?? '').trim(),
      paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs.map(p => (p ?? '').trim()).filter(p => p !== '') : [],
      paragraphs2: Array.isArray(data.paragraphs2) ? data.paragraphs2.map(p => (p ?? '').trim()) : []
    };
    this.http.put<any>(this.api, { aboutData }).subscribe({
      next: (resp) => {
        const mapped: AboutSection = resp.aboutData ?? aboutData;
        this._aboutData = mapped;
        this.aboutDataSubject.next(mapped);
      },
      error: () => {
        this._aboutData = aboutData;
        this.aboutDataSubject.next(aboutData);
      }
    });
  }

  private load(): void {
    this.http.get<any>(this.api).subscribe({
      next: (resp) => {
        const mapped: AboutSection = resp.aboutData ?? resp;
        this._aboutData = mapped;
        this.aboutDataSubject.next(mapped);
      },
      error: () => {
        this.aboutDataSubject.next(this._aboutData);
      }
    });
  } 

  private getDefaultData(): AboutSection {
    return {
      heroTitle: '',
      subtitle: '',
      paragraphs: ['',''],
      paragraphs2: ['','',''      ]
    };
  }
}
