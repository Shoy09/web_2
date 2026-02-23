import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeneralProductData } from '../models/general-product';

@Injectable({ providedIn: 'root' })
export class GeneralProductService {
  private api = 'https://backend-web-omega.vercel.app/api/general-product-page';

  private _data: GeneralProductData = this.getDefaultData();
  public data$ = new BehaviorSubject<GeneralProductData>(this._data);

  constructor(private http: HttpClient) {
    this.load();
  }

  getData(): GeneralProductData {
    return JSON.parse(JSON.stringify(this._data));
  }

  updateData(data: GeneralProductData) {
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
        this._data = resp;
        this.data$.next(this._data);
      },
      error: () => {
        this.data$.next(this._data);
      }
    });
  }

  private getDefaultData(): GeneralProductData {
    return {
      headerData: {
        titulo: '',
        descripcion: '',
        breadcrumbs: []
      },
      infoSection: {
        texto: '',
        boton: { 
          label: '', 
          link: '' 
        }
      },
      products: []
    };
  }
}
