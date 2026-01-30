import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vista-productos',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './vista-productos.component.html',
  styleUrls: ['./vista-productos.component.css']
})
export class VistaProductosComponent implements OnInit {

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
  // Año actual
  // ===============================
  currentYear: number = new Date().getFullYear();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLanguage = savedLang;
    this.translate.use(savedLang);
  }

  // ===============================
  // Cambiar idioma
  // ===============================
  selectLanguage(langCode: string) {
    this.currentLanguage = langCode;
    localStorage.setItem('language', langCode);
    this.translate.use(langCode);
  }

  get currentLanguageLabel(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.label : '';
  }
}
