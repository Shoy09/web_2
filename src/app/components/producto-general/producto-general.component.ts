import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-producto-general',
  standalone: true,
  imports: [CommonModule, TranslateModule],     
  templateUrl: './producto-general.component.html',
  styleUrls: ['./producto-general.component.css']
})
export class ProductoGeneralComponent implements OnInit {

  // ===============================
  // IDIOMAS
  // ===============================
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }
  ];

  currentLanguage: string = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLanguage = savedLang;
    this.translate.use(savedLang);
  }

  selectLanguage(langCode: string) {
    this.currentLanguage = langCode;
    localStorage.setItem('language', langCode);
    this.translate.use(langCode);
  }

  get currentLanguageLabel(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.label : '';
  }

  // ===============================
  // LISTA DE PRODUCTOS
  // ===============================
  products = [
    {
      title: 'Reverse Circulation Bits',
      image: 'assets/products/bit1.png',
      link: '#'
    },
    {
      title: 'Pilot Hole Bits',
      image: 'assets/products/bit2.png',
      link: '#'
    },
    {
      title: 'Target™ – HDD Series',
      image: 'assets/products/bit3.png', 
      link: '#'
    },
    {
      title: 'Avenger™ – High-Performance Drilling',
      image: 'assets/products/bit4.png',
      link: '#'
    },
    {
      title: 'D-Force™ – Drilling in Abrasive Formations',
      image: 'assets/products/bit5.png',
      link: '#'
    },
    {
      title: 'Ridgeback™ – Hard Rock Drilling',
      image: 'assets/products/bit6.png',
      link: '#'
    }
  ];
}
