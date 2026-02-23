import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FooterData } from '../models/footer.model';

@Injectable({ providedIn: 'root' })
export class FooterService {

  private api = 'http://localhost:3000/api/footer';

  private footerData: FooterData = {
    menuIzquierda: [ 
      { label: '', ruta: '' },
      { label: '', ruta: '' },
      { label: '', ruta: '' },
      { label: '', ruta: '' }
    ],
    noticias: [
      { fecha: '', titulo: '', url: '' },
      { fecha: '', titulo: '', url: '' },
      { fecha: '', titulo: '', url: '' }
    ],
    logoCentro: '',
    contacto: { telefono: '', email: '' },
    redes: [
      { icon: 'bi bi-facebook', url: 'https://www.facebook.com/share/1BzmQ64ZW3/', nombre: 'Facebook' },
      { icon: 'bi bi-linkedin', url: 'https://www.linkedin.com/company/jf-tricon-perú', nombre: 'LinkedIn' },
      { icon: 'bi bi-instagram', url: 'https://www.instagram.com/terelion.mining/', nombre: 'Instagram' }
    ],
    followText: 'SÍGUENOS EN —',

    copyright: `© ${new Date().getFullYear()} - JF Tricon Perú, LLC`,

  };
 
  public footerData$ = new BehaviorSubject<FooterData>(this.getFooter());

  constructor(private http: HttpClient) {
    this.load();
  }

  getFooter(): FooterData {
    return this.footerData;
  }

  updateFooter(data: FooterData) {
    this.http.put<any>(this.api, { content: data }).subscribe({
      next: (resp) => {
        const mapped: FooterData = resp.content ?? data;
        this.footerData = mapped;
        this.footerData$.next(mapped);
      },
      error: () => {
        this.footerData = data;
        this.footerData$.next(data);
      }
    });
  }

  load() {
    this.http.get<any>(this.api).subscribe({
      next: (resp) => {
        const mapped: FooterData = resp.content ?? resp;
        this.footerData = mapped;
        this.footerData$.next(mapped);
      },
      error: () => {
        this.footerData$.next(this.footerData);
      }
    });
  }
}
