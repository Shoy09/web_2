import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HistoryData } from '../models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryService {

  private api = 'https://backend-web-azure.vercel.app/api/history';

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
          heroTitle: 'NUESTRA HISTORIA',
          timeline: [
            {
              image: 'prueba.jpg',
              alt: 'Varel logo',
              stories: [
                { year: '1947', text: 'Fundación en Delaware' },
                { year: '1950', text: 'Producción inicial' }
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
