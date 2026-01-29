import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nvbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuOpen = false;
  showProductos = false;
  showAbout = false;
  searchOpen = false;

  isMobileView = false;
  private readonly MOBILE_WIDTH = 768;

  ngOnInit() {
    this.updateViewMode();
  }

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
  }

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
    if (this.isMobileView && !this.menuOpen) this.menuOpen = true;
  }

  toggleAbout(event?: Event) {
    if (event) event.preventDefault();
    if (!this.isMobileView) return;
    this.showAbout = !this.showAbout;
  }

  closeMenus() {
    if (!this.isMobileView) return;
    this.menuOpen = false;
    this.showProductos = false;
    this.showAbout = false;
  }

toggleSearch() {
  this.searchOpen = !this.searchOpen;
}

}
