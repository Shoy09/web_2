import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  dropdownOpen: boolean = false;
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit() {
    // Inicialización si es necesaria
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

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.dropdownOpen && window.scrollY > 350) {
      this.closeDropdown();
    }
  }
}
