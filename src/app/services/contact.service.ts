import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Region, ContactPageContent } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
 
  private api = '/api/contact-page';

  // =============================
  // DATA INICIAL (fallback)
  // =============================
  private defaultRegions: Region[] = [
    {
      value: 'south-america',
      label: 'Sudamérica',
      contact: {
        name: 'Miguel Jahncke',
        phones: ['+51 989 164 305 (Perú)', '+1 954 258 0271 (EE.UU.)'],
        email: 'mjahncke@terelion.com',
        office: {
          country: 'Perú',
          address: 'Terelion LLC. Sucursal del Perú, Las Poncianas #105, La Molina Vieja, Lima, Perú',
          phone: '+51-1-365-2529'
        }
      }
    }
  ];

  private defaultContent: ContactPageContent = {
    header: {
      subtitle: 'CONTÁCTANOS',
      title: 'SELECCIONA TU REGIÓN',
      selectHelp: 'Comienza a escribir para buscar tu región',
      regionLabel: 'País o Región',
      regionPlaceholder: 'Escribe para buscar...'
    },
    body: {
      leftTexts: [
        'Dondequiera que esté ubicada tu operación...',
        'Usa el menú desplegable para encontrar la oficina...'
      ],
      boldText: '¡Encuentra a tus contactos en tu región!',
      formFields: [
        { label: 'Nombre', placeholder: 'Ingresa tu nombre', required: true },
        { label: 'Apellido', placeholder: 'Ingresa tu apellido', required: true },
        { label: 'Correo', placeholder: 'correo@ejemplo.com', type: 'email', required: true },
        { label: 'Teléfono', placeholder: '+51...' },
        { label: 'Empresa', placeholder: 'Empresa' },
        { label: 'Mensaje', placeholder: 'Escribe...', rows: 6 }
      ],
      legalText: 'Texto legal...',
      sendButtonLabel: 'ENVIAR'
    }
  };

  private loadContent(): ContactPageContent { return this.defaultContent; }
  private loadRegions(): Region[] { return this.defaultRegions; }

  private _content = this.loadContent();
  private _regions = this.loadRegions();

  // streams reactivos
  public content$ = new BehaviorSubject<ContactPageContent>(this._content);
  public regions$ = new BehaviorSubject<Region[]>(this._regions);

  constructor(private http: HttpClient) {
    this.load();
  }

  // =============================
  // UPDATE CONTENT
  // =============================
  updateContent(content: ContactPageContent) {
    const payload = { regions: this._regions, content: JSON.parse(JSON.stringify(content)) };
    this.http.put<any>(this.api, payload).subscribe({
      next: (resp) => {
        this._content = resp.content ?? payload.content;
        this.content$.next(this._content);
      },
      error: () => {
        this._content = payload.content;
        this.content$.next(this._content);
      }
    });
  }

  updateRegions(regions: Region[]) {
    const payload = { regions: JSON.parse(JSON.stringify(regions)), content: this._content };
    this.http.put<any>(this.api, payload).subscribe({
      next: (resp) => {
        this._regions = resp.regions ?? payload.regions;
        this.regions$.next(this._regions);
      },
      error: () => {
        this._regions = payload.regions;
        this.regions$.next(this._regions);
      }
    });
  }

  // RESET TOTAL
  resetAll() {
    this._content = this.defaultContent;
    this._regions = this.defaultRegions;
    this.content$.next(this._content);
    this.regions$.next(this._regions);
  }

  private load() {
    this.http.get<any>(this.api).subscribe({
      next: (resp) => {
        this._regions = resp.regions ?? this._regions;
        this._content = resp.content ?? this._content;
        this.regions$.next(this._regions);
        this.content$.next(this._content);
      },
      error: () => {
        this.regions$.next(this._regions);
        this.content$.next(this._content);
      }
    });
  }
}
