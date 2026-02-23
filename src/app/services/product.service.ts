import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HeroProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'https://backend-web-omega.vercel.app/api/products';

  private defaultProduct: HeroProduct = {
    breadcrumbs: [
      { label: '', link: '' },
      { label: '', link: '' }

    ],
    title: '',
    subtitle: '',
    descriptions: [
      '',
      ''
    ], 
    mainImage: '',
    thumbnails: [''],
    contactLink: '',
    features: [
  {
    title: '',
    description: ''
  }
  ],
    downloads: [
  {
    title: '',
    description: '',
    link: ''
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
          this.productSubject.next(payload);
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
          this.productSubject.next(data);
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
