import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavbarData } from '../models/navbar.model';

@Injectable({ providedIn: 'root' })
export class NavbarService {

  private api = 'https://backend-web-azure.vercel.app/api/navbar';

  private navbarData: NavbarData = {
    productosLabel: 'Productos',
    aboutLabel: 'Acerca de',
    contactoLabel: 'Contacto',
    contactoRuta: '/contactos',
    siguenos: 'Síguenos en',
    buscarPlaceholder: 'Buscar en terelion.com...',
    aboutMenu: [
      { nombre: 'Nosotros', ruta: '/acerca-de' },
      { nombre: 'Nuestra Historia', ruta: '/his' }
    ],
    productosMenu: [
      {
        titulo: 'Brocas Tricónicas', ruta: '/productos/general',
        items: [
          { nombre: 'RIDGEBACK™ – Perforación en roca dura', ruta: '/productos' },
          { nombre: 'AVENGER™ – Perforación de alto rendimiento', ruta: '/productos' }
        ]
      }
    ],
    redes: [
      { nombre: 'facebook', icon: 'bi bi-facebook', url: 'https://www.facebook.com/share/1BzmQ64ZW3/' },
      { nombre: 'linkedin', icon: 'bi bi-linkedin', url: 'https://www.linkedin.com/company/jf-tricon-per%C3%BA/' }
    ],
    logoActual: '/logo-blanco.png'
  };

  private navbarSubject = new BehaviorSubject<NavbarData>(this.getNavbar());
  public navbarData$ = this.navbarSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  getNavbar(): NavbarData {
    return this.navbarData;
  }

  updateNavbar(data: NavbarData) {
    this.http.put<any>(this.api, data).subscribe({
      next: (resp) => {
        const mapped: NavbarData = {
          productosLabel: resp.productosLabel ?? data.productosLabel,
          aboutLabel: resp.aboutLabel ?? data.aboutLabel,
          contactoLabel: resp.contactoLabel ?? data.contactoLabel,
          contactoRuta: resp.contactoRuta ?? data.contactoRuta,
          siguenos: resp.siguenos ?? data.siguenos,
          buscarPlaceholder: resp.buscarPlaceholder ?? data.buscarPlaceholder,
          aboutMenu: resp.aboutMenu ?? data.aboutMenu,
          productosMenu: resp.productosMenu ?? data.productosMenu,
          redes: resp.redes ?? data.redes,
          logoActual: resp.logoActual ?? data.logoActual
        };
        this.navbarData = mapped;
        this.navbarSubject.next(mapped);
      },
      error: () => {
        this.navbarData = data;
        this.navbarSubject.next(data);
      }
    });
  }

  load() {
    this.http.get<any>(this.api).subscribe({
      next: (resp) => {
        const mapped: NavbarData = {
          productosLabel: resp.productosLabel,
          aboutLabel: resp.aboutLabel,
          contactoLabel: resp.contactoLabel,
          contactoRuta: resp.contactoRuta,
          siguenos: resp.siguenos,
          buscarPlaceholder: resp.buscarPlaceholder,
          aboutMenu: resp.aboutMenu,
          productosMenu: resp.productosMenu,
          redes: resp.redes,
          logoActual: resp.logoActual
        };
        this.navbarData = mapped;
        this.navbarSubject.next(mapped);
      },
      error: () => {
        this.navbarSubject.next(this.navbarData);
      }
    });
  }
}
