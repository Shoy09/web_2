import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HistoryData } from '../models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryService {

  private api = 'https://backend-web-omega.vercel.app/api/history';

  private dataSubject = new BehaviorSubject<HistoryData | null>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient){
    this.loadInitial();
  }

  // =========================
  // CARGAR
  // =========================
  private loadInitial(){
    this.http.get<HistoryData>(this.api).subscribe({
      next: (resp: any) => {
        const mapped: HistoryData = { heroTitle: resp.heroTitle, timeline: resp.timeline };
        this.dataSubject.next(mapped);
      },
      error: () => {
        const data: HistoryData = {
          heroTitle: '',
          timeline: [
            {
              image: '',
              alt: '',
              stories: [
                { year: '', text: '' },
                { year: '', text: '' }
              ]
            }
          ]
        };
        this.dataSubject.next(data);
      }
    });
  }

  // =========================
  // UPDATE
  // =========================
  update(data: HistoryData){
    const clone = JSON.parse(JSON.stringify(data));
    this.http.put<any>(this.api, clone).subscribe({
      next: (resp) => {
        const mapped: HistoryData = { heroTitle: resp.heroTitle ?? clone.heroTitle, timeline: resp.timeline ?? clone.timeline };
        this.dataSubject.next(mapped);
      },
      error: () => {
        this.dataSubject.next(clone);
      }
    });
  }

  getData(): HistoryData | null{
    return this.dataSubject.value;
  }
}
