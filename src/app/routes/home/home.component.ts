import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // ===============================
  // DROPDOWN IDIOMA
  // ===============================
  dropdownOpen: boolean = false;

  // ===============================
  // IDIOMAS
  // ===============================
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }
  ];

  currentLanguage: string = 'en';

  // ===============================
  // DESTRUCCIÓN OBSERVABLES
  // ===============================
  private destroy$ = new Subject<void>();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLanguage = savedLang;
    this.translate.use(savedLang);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===============================
  // DROPDOWN
  // ===============================
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      document.body.classList.add('language-open');
    } else {
      document.body.classList.remove('language-open');
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
    document.body.classList.remove('language-open');
  }

  // ===============================
  // CAMBIAR IDIOMA
  // ===============================
  selectLanguage(langCode: string) {
    this.currentLanguage = langCode;
    localStorage.setItem('language', langCode);
    this.translate.use(langCode);
    this.closeDropdown();
  }

  get currentLanguageLabel(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.label : '';
  }

  // ===============================
  // SCROLL
  // ===============================
  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.dropdownOpen && window.scrollY > 350) {
      this.closeDropdown();
    }
  }
}
