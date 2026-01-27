import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslationService } from '../../services/translation.service';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ProductosComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;
  searchOpen = false;
  showProductos = false;
  selectedLanguage: string = '';
  currentTranslations: { [key: string]: string } = {};
  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.selectedLanguage = this.translationService.getCurrentLanguage();
    this.currentTranslations = this.translationService.getTranslations();

    this.translationService
      .getCurrentLanguage$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentTranslations = this.translationService.getTranslations();
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  toggleProductos() {
    this.showProductos = !this.showProductos;
    this.menuOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
