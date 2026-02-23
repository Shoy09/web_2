import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MasInfoData } from '../models/masinfo.model';

@Injectable({ providedIn: 'root' })
export class MasInfoService {
  private api = '/api/mas-info';
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
        titulo: 'LO QUE SE NECESITA',
        subtitulo: 'Brocas fabricadas especialmente para sus operaciones.',
        imagenFondo: 'https://www.terelion.com/wp-content/uploads/2021/07/home-page-banner.jpg',
      boton: {
        label: 'Contáctenos',
        url: '/contacto'
  }
      },
      
      contentSections : [
  {
    titulo: 'Lo que se necesita para realizar el trabajo.',
    parrafos: [
      'Esta línea de trabajo no es para todos. En Terelion, conocemos las condiciones exigentes y los desafíos cotidianos que enfrentan sus operaciones. Y sabemos lo que se necesita para realizar el trabajo.',
      'Trabajamos con todos nuestros clientes para garantizar que las brocas que utilizan sean las más duraderas y resistentes, eficientes y rentables del mercado. Avanzar en las operaciones más difíciles.'
    ]
  }
        
      ],
      sections: [
        {
          titulo: 'Confíe en Terelion. Tenemos lo que se necesita.',
          parrafos: [
            'Lograr ese avance al final de un largo día de trabajo.',
            'Confíe en Terelion para operaciones más productivas.'
          ],
          imagen: 'https://www.terelion.com/wp-content/uploads/2021/07/image-1-1024x768.jpg'
        },
        {
          titulo: 'Brocas de calidad para lograr el avance',
          parrafos: [
            'Nuestras brocas están diseñadas para rendimiento y durabilidad.'
          ],
          imagen: 'https://www.terelion.com/wp-content/uploads/2021/07/image-2-1024x768.jpg',
          reverse: true
        }
      ],
      bottomBanner: {
        titulo: 'Bajo el mismo cielo, hacia la misma meta',
        texto: 'Terelion tiene más de 50 años de experiencia en la producción de brocas rotativas. Combinamos nuestra tradición, experiencia e innovación con asociaciones de clientes proactivas y rentables. Nuestros equipos de servicio expertos están en el lugar, a su lado. Ayudándole a tomar las mejores decisiones para sus operaciones de perforación en cada turno.',
        imagen: 'https://www.terelion.com/wp-content/uploads/2021/07/image-5.jpg'
      }
    };
  }
}
