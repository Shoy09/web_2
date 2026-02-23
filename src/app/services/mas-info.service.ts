import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MasInfoData } from '../models/masinfo.model';

@Injectable({ providedIn: 'root' })
export class MasInfoService {
  private api = 'http://localhost:3000/api/mas-info';
  private _data: MasInfoData = this.getDefaultData();
  public data$ = new BehaviorSubject<MasInfoData>(this._data);

  constructor(private http: HttpClient) {
    this.load();
  }

  getData(): MasInfoData {
    return JSON.parse(JSON.stringify(this._data));
  }

  updateData(data: MasInfoData) {
    const payload = JSON.parse(JSON.stringify(data));
    this.http.put<any>(this.api, payload).subscribe({
      next: (resp) => {
        this._data = resp ?? payload;
        this.data$.next(this._data);
      },
      error: () => {
        this._data = payload;
        this.data$.next(this._data);
      }
    });
  }

  reset() {
    this._data = this.getDefaultData();
    this.data$.next(this._data);
  }

  private load() {
    this.http.get<any>(this.api).subscribe({
      next: (resp) => {
        this._data = resp ?? this._data;
        this.data$.next(this._data);
      },
      error: () => {
        this.data$.next(this._data);
      }
    });
  }

  private getDefaultData(): MasInfoData {
    return {
      hero: {
        titulo: '',
        subtitulo: '',
        imagenFondo: 'https://www.terelion.com/wp-content/uploads/2021/07/home-page-banner.jpg',
      boton: {
        label: '',
        url: ''
  }
      },
      
      contentSections : [
  {
    titulo: '',
    parrafos: [
      '',
      ''
    ]
  }
        
      ],
      sections: [
        {
          titulo: '',
          parrafos: [
            '',
            ''
          ],
          imagen: ''
        },
        {
          titulo: '',
          parrafos: [
            ''
          ],
          imagen: '',
          reverse: true
        }
      ],
      bottomBanner: {
        titulo: '',
        texto: '',
        imagen: ''
      }
    };
  }
}
