import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-nvbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // ===============================
  // MENÚS
  // ===============================
  menuOpen = false;
  showProductos = false;
  showAbout = false;
  searchOpen = false;
  isProductPage = false;

  // ===============================
  // RESPONSIVE
  // ===============================
  isMobileView = false;
  private readonly MOBILE_WIDTH = 768;

  // ===============================
  // IDIOMAS
  // ===============================
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }
  ];

  currentLang = 'en';
  langDropdownOpen = false;

constructor(private router: Router, private translate: TranslateService) {
  this.translate.setDefaultLang('en');

}

  // ===============================
  // INIT
  // ===============================
  ngOnInit() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLang = savedLang;
    this.translate.use(this.currentLang);
    
    // Verificar página de producto al iniciar
    this.checkProductPage();
    
    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkProductPage();
      });
  }



  // ===============================
  // RUTAS
  // ===============================
  private checkProductPage() {
    const url = this.router.url;
    this.isProductPage = url.includes('/producto') || url.includes('/productos');
  }

  // ===============================
  // RESPONSIVE
  // ===============================
  private updateViewMode() {
    this.isMobileView = window.innerWidth <= this.MOBILE_WIDTH;

    if (!this.isMobileView) {
      this.menuOpen = false;
      this.showProductos = false;
      this.showAbout = false;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewMode();
    this.langDropdownOpen = false;
  }

  // ===============================
  // MENÚ PRINCIPAL
  // ===============================
  toggleMenu() {
    if (!this.isMobileView) return;

    this.menuOpen = !this.menuOpen;

    if (!this.menuOpen) {
      this.showProductos = false;
      this.showAbout = false;
    }
  }

  toggleProductos(event?: Event) {
    if (event) event.preventDefault();

    this.showProductos = !this.showProductos;
    this.showAbout = false;

    if (this.isMobileView && !this.menuOpen) {
      this.menuOpen = true;
    }
  }

  toggleAbout(event?: Event) {
    if (event) event.preventDefault();

    this.showAbout = !this.showAbout;
    this.showProductos = false;

    if (this.isMobileView && !this.menuOpen) {
      this.menuOpen = true;
    }
  }

  closeMenus() {
    if (!this.isMobileView) return;

    this.menuOpen = false;
    this.showProductos = false;
    this.showAbout = false;
  }

  // ===============================
  // BÚSQUEDA
  // ===============================
  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  // ===============================
  // IDIOMAS
  // ===============================
  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  selectLanguage(langCode: string) {
    this.currentLang = langCode;
    localStorage.setItem('language', langCode);
    this.translate.use(langCode);
  }

  get currentLanguageLabel(): string {
  const lang = this.languages.find(l => l.code === this.currentLang);
  return lang ? lang.label : '';
}


}
