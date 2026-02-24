import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HeroProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = '/api/products';

  private defaultProduct: HeroProduct = {
    breadcrumbs: [
      { label: 'PRODUCTOS', link: '/productos' },
      { label: 'BROCAS DE RODILLO CÓNICO', link: '/productos/brocas-de-rodillo' }

    ],
    title: 'RIDGEBACK™',
    subtitle: 'Perforación de roca dura',
    descriptions: [
      'Brocas giratorias para perforación de pozos en roca dura. Camisa especialmente diseñada para ayudar en la evacuación rápida de esquejes. Los cojinetes abiertos de alta carga, la estructura de corte robusta y el tratamiento con carburo HET proporcionan altas tasas de penetración y una larga vida útil. Los conos ventilados (de 9» de diámetro y superiores) proporcionan limpieza adicional de los rodamientos y reducción del calor.',
      'Los productos RIDGEBACK™ contienen cojinetes de mayor vida útil, protección adicional contra calibres y elementos de estructura de corte mejorados para su uso en aplicaciones de alta caída.'
    ],
    mainImage: 'hero (1).webp',
    thumbnails: ['hero (1).webp'],
    contactLink: '#',
    features: [
  {
    title: 'RETENCIÓN DE BOQUILLAS DE UÑAS',
    description: 'Incluso en las condiciones más abrasivas se elimina la pérdida de boquillas.'
  }
  ],
    downloads: [
  {
    title: 'Catálogo de productos',
    description: 'Descarga el catálogo en PDF.',
    link: '#'
  }
  ]
  };

  private currentId: number | null = null;
  private productSubject = new BehaviorSubject<HeroProduct>(this.defaultProduct);
  public product$ = this.productSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  // obtener producto
  getProduct(): HeroProduct {
    return this.productSubject.value;
  }

  private normalizeDownloads(list: any[]): any[] {
    if (!Array.isArray(list)) return [];
    return list.map((d: any) => {
      const link = d?.link ?? d?.url ?? '';
      return { title: d?.title ?? '', description: d?.description ?? '', link };
    });
  }

  // guardar producto
  updateProduct(data: HeroProduct) {
    const payload = JSON.parse(JSON.stringify(data));
    if (this.currentId != null) {
      this.http.put<any>(`${this.api}/${this.currentId}`, payload).subscribe({
        next: (resp) => {
          const mapped: HeroProduct = {
            breadcrumbs: resp.breadcrumbs ?? payload.breadcrumbs,
            title: resp.title ?? payload.title,
            subtitle: resp.subtitle ?? payload.subtitle,
            descriptions: resp.descriptions ?? payload.descriptions,
            mainImage: resp.mainImage ?? payload.mainImage,
            thumbnails: resp.thumbnails ?? payload.thumbnails,
            contactLink: resp.contactLink ?? payload.contactLink,
            features: resp.features ?? payload.features,
            downloads: this.normalizeDownloads(resp.downloads ?? payload.downloads)
          };
          this.productSubject.next(mapped);
        },
        error: () => {
          this.http.post<any>(this.api, payload).subscribe({
            next: (resp) => {
              this.currentId = resp.id ?? this.currentId;
              const mapped: HeroProduct = {
                breadcrumbs: resp.breadcrumbs ?? payload.breadcrumbs,
                title: resp.title ?? payload.title,
                subtitle: resp.subtitle ?? payload.subtitle,
                descriptions: resp.descriptions ?? payload.descriptions,
                mainImage: resp.mainImage ?? payload.mainImage,
                thumbnails: resp.thumbnails ?? payload.thumbnails,
                contactLink: resp.contactLink ?? payload.contactLink,
                features: resp.features ?? payload.features,
                downloads: this.normalizeDownloads(resp.downloads ?? payload.downloads)
              };
              this.productSubject.next(mapped);
            },
            error: () => {
              this.productSubject.next(payload);
            }
          });
        }
      });
    } else {
      this.http.post<any>(this.api, payload).subscribe({
        next: (resp) => {
          this.currentId = resp.id ?? null;
          const mapped: HeroProduct = {
            breadcrumbs: resp.breadcrumbs ?? payload.breadcrumbs,
            title: resp.title ?? payload.title,
            subtitle: resp.subtitle ?? payload.subtitle,
            descriptions: resp.descriptions ?? payload.descriptions,
            mainImage: resp.mainImage ?? payload.mainImage,
            thumbnails: resp.thumbnails ?? payload.thumbnails,
            contactLink: resp.contactLink ?? payload.contactLink,
            features: resp.features ?? payload.features,
            downloads: this.normalizeDownloads(resp.downloads ?? payload.downloads)
          };
          this.productSubject.next(mapped);
        },
        error: () => {
          this.productSubject.next(payload);
        }
      });
    }
  }

  // guardar producto (multipart con PDFs)
  updateProductWithFiles(data: HeroProduct, files: (File | null)[]) {
    const form = new FormData();
    form.append('title', data.title ?? '');
    form.append('subtitle', data.subtitle ?? '');
    form.append('descriptions', JSON.stringify(data.descriptions ?? []));
    form.append('mainImage', data.mainImage ?? '');
    form.append('thumbnails', JSON.stringify(data.thumbnails ?? []));
    form.append('contactLink', data.contactLink ?? '');
    form.append('breadcrumbs', JSON.stringify(data.breadcrumbs ?? []));
    form.append('features', JSON.stringify(data.features ?? []));
    form.append('downloads', JSON.stringify(data.downloads ?? []));

    files.forEach((f, i) => {
      if (f) {
        form.append(`download_${i}`, f, f.name);
      }
    });

    if (this.currentId != null) {
      this.http.put<any>(`${this.api}/${this.currentId}`, form).subscribe({
        next: (resp) => {
          const mapped: HeroProduct = {
            breadcrumbs: resp.breadcrumbs ?? data.breadcrumbs,
            title: resp.title ?? data.title,
            subtitle: resp.subtitle ?? data.subtitle,
            descriptions: resp.descriptions ?? data.descriptions,
            mainImage: resp.mainImage ?? data.mainImage,
            thumbnails: resp.thumbnails ?? data.thumbnails,
            contactLink: resp.contactLink ?? data.contactLink,
            features: resp.features ?? data.features,
            downloads: this.normalizeDownloads(resp.downloads ?? data.downloads)
          };
          this.productSubject.next(mapped);
        },
        error: () => {
          this.http.post<any>(this.api, form).subscribe({
            next: (resp) => {
              this.currentId = resp.id ?? this.currentId;
              const mapped: HeroProduct = {
                breadcrumbs: resp.breadcrumbs ?? data.breadcrumbs,
                title: resp.title ?? data.title,
                subtitle: resp.subtitle ?? data.subtitle,
                descriptions: resp.descriptions ?? data.descriptions,
                mainImage: resp.mainImage ?? data.mainImage,
                thumbnails: resp.thumbnails ?? data.thumbnails,
                contactLink: resp.contactLink ?? data.contactLink,
                features: resp.features ?? data.features,
                downloads: this.normalizeDownloads(resp.downloads ?? data.downloads)
              };
              this.productSubject.next(mapped);
            },
            error: () => {
              this.productSubject.next(data);
            }
          });
        }
      });
    } else {
      this.http.post<any>(this.api, form).subscribe({
        next: (resp) => {
          this.currentId = resp.id ?? null;
          const mapped: HeroProduct = {
            breadcrumbs: resp.breadcrumbs ?? data.breadcrumbs,
            title: resp.title ?? data.title,
            subtitle: resp.subtitle ?? data.subtitle,
            descriptions: resp.descriptions ?? data.descriptions,
            mainImage: resp.mainImage ?? data.mainImage,
            thumbnails: resp.thumbnails ?? data.thumbnails,
            contactLink: resp.contactLink ?? data.contactLink,
            features: resp.features ?? data.features,
            downloads: this.normalizeDownloads(resp.downloads ?? data.downloads)
          };
          this.productSubject.next(mapped);
        },
        error: () => {
          this.productSubject.next(data);
        }
      });
    }
  }

  // reset (pro)
  resetProduct() {
    this.productSubject.next(this.defaultProduct);
  }

  private load() {
    this.http.get<any[]>(this.api).subscribe({
      next: (list) => {
        if (Array.isArray(list) && list.length > 0) {
          const p = list[0];
          this.currentId = p.id ?? null;
          const mapped: HeroProduct = {
            breadcrumbs: p.breadcrumbs,
            title: p.title,
            subtitle: p.subtitle,
            descriptions: p.descriptions,
            mainImage: p.mainImage,
            thumbnails: p.thumbnails,
            contactLink: p.contactLink,
            features: p.features,
            downloads: this.normalizeDownloads(p.downloads)
          };
          this.productSubject.next(mapped);
        } else {
          this.productSubject.next(this.defaultProduct);
        }
      },
      error: () => {
        this.productSubject.next(this.defaultProduct);
      }
    });
  }

  uploadPdf(file: File) {
    const form = new FormData();
    form.append('pdf', file);
    return this.http.post<{ url: string }>(`${this.api}/upload-pdf`, form);
  }
}
