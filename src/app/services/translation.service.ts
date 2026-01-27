import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  private readonly DEFAULT_LANGUAGE = 'es';

  private currentLanguage$ = new BehaviorSubject<string>(this.getStoredLanguage());
  private translations: Translations = {
    es: {
  heroTitle: 'LO QUE SE NECESITA PARA ROMPER BARRERAS',
  heroTitleLine1: 'LO QUE SE NECESITA',
  heroTitleLine2: 'PARA ROMPER',
  heroTitleLine3: 'BARRERAS',
  buttonText: 'Saber Más',
  productos: 'Productos',
  about: 'Sobre Nosotros',
  contact: 'Contacto',
  search: 'Buscar en terelion.com...',
},
    en: {
  heroTitle: 'WHAT IT TAKES TO BREAK THROUGH',
  heroTitleLine1: 'WHAT IT TAKES',
  heroTitleLine2: 'TO BREAK',
  heroTitleLine3: 'THROUGH',
  buttonText: 'Learn More',
  productos: 'Products',
  about: 'About Us',
  contact: 'Contact',
  search: 'Search terelion.com...',
}
,
    fr: {
  heroTitle: "CE QU'IL FAUT POUR PERCER",
  heroTitleLine1: "CE QU'IL FAUT",
  heroTitleLine2: 'POUR PERCER',
  heroTitleLine3: '',
  buttonText: 'En Savoir Plus',
  productos: 'Produits',
  about: 'À Propos',
  contact: 'Contact',
  search: 'Rechercher sur terelion.com...',
},
    de: {
  heroTitle: 'WAS MAN BRAUCHT UM DURCHZUBRECHEN',
  heroTitleLine1: 'WAS MAN BRAUCHT',
  heroTitleLine2: 'UM DURCHZUBRECHEN',
  heroTitleLine3: '',
  buttonText: 'Mehr Erfahren',
  productos: 'Produkte',
  about: 'Über Uns',
  contact: 'Kontakt',
  search: 'Auf terelion.com suchen...',
},
  };

  private languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  constructor() {}

  /**
   * Obtiene el idioma actual como Observable
   */
  getCurrentLanguage$(): Observable<string> {
    return this.currentLanguage$.asObservable();
  }

  /**
   * Obtiene el idioma actual (valor directo)
   */
  getCurrentLanguage(): string {
    return this.currentLanguage$.value;
  }

  /**
   * Cambia el idioma actual
   */
  setLanguage(languageCode: string): void {
    if (this.languages.find(lang => lang.code === languageCode)) {
      this.currentLanguage$.next(languageCode);
      localStorage.setItem(this.STORAGE_KEY, languageCode);
      console.log(`Idioma cambiado a: ${languageCode}`);
      document.documentElement.lang = languageCode;
    }
  }

  /**
   * Obtiene la traducción de una clave específica
   */
  translate(key: string): string {
    const language = this.currentLanguage$.value;
    return this.translations[language]?.[key] || key;
  }

  /**
   * Obtiene todas las traducciones del idioma actual
   */
  getTranslations(): { [key: string]: string } {
    const language = this.currentLanguage$.value;
    return this.translations[language] || this.translations[this.DEFAULT_LANGUAGE];
  }

  /**
   * Obtiene la lista de idiomas disponibles
   */
  getLanguages() {
    return this.languages;
  }

  /**
   * Obtiene el idioma guardado en localStorage o el por defecto
   */
  private getStoredLanguage(): string {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored || this.DEFAULT_LANGUAGE;
  }

  /**
   * Agrega traducciones adicionales
   */
  addTranslations(newTranslations: Translations): void {
    this.translations = { ...this.translations, ...newTranslations };
  }
}
