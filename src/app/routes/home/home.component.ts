import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TranslationService } from '../../services/translation.service';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [UpperCasePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedLanguage: string = '';
  languages: any[] = [];
  currentTranslations: { [key: string]: string } = {};
  dropdownOpen: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) {
    this.languages = this.translationService.getLanguages();
  }

  ngOnInit() {
    // Obtener el idioma actual
    this.selectedLanguage = this.translationService.getCurrentLanguage();
    this.currentTranslations = this.translationService.getTranslations();

    // Suscribirse a cambios de idioma
    this.translationService
      .getCurrentLanguage$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((language: string) => {
        this.selectedLanguage = language;
        this.currentTranslations = this.translationService.getTranslations();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

changeLanguage(languageCode: string) {
  this.translationService.setLanguage(languageCode);
  this.closeDropdown();
}

@HostListener('window:scroll')
onWindowScroll() {
  if (this.dropdownOpen && window.scrollY > 350) {
    this.closeDropdown();
  }
}



}
