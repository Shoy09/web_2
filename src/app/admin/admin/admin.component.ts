import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <nav class="admin-menu">
         <a routerLink="" routerLinkActive="active">----</a>
        <a routerLink="" routerLinkActive="active">----</a>
        <a routerLink="home" routerLinkActive="active">Home</a>
        <a routerLink="footer" routerLinkActive="active">Footer</a>
        <a routerLink="navbar" routerLinkActive="active">Nav-bar</a>
        <a routerLink="about" routerLinkActive="active">Acerca de</a>
        <a routerLink="general-product" routerLinkActive="active">general-product</a>
        <a routerLink="products" routerLinkActive="active">Productos</a>
        <a routerLink="contact" routerLinkActive="active">Contacto</a>
        <a routerLink="mas-info" routerLinkActive="active">Mas Información</a>
        <a routerLink="history" routerLinkActive="active">Nuestra Historia</a>
        <a routerLink="noticias" routerLinkActive="active">Noticias</a>

        
      </nav> 

      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-container { display: flex; min-height: 100vh; font-family: Arial; }
    .admin-menu { width: 200px; background: #f1f1f1; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
    .admin-menu a { text-decoration: none; color: #333; }
    .admin-menu a.active { font-weight: bold; color: #007bff; }
    .admin-content { flex: 1; padding: 2rem; background: #fff; }
  `]
})
export class AdminComponent {}