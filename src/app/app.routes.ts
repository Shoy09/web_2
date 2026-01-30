import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AcercaDeComponent } from './routes/acerca-de/acerca-de.component';
import { HistoryComponent } from './routes/history/history.component';
import { VistaProductosComponent } from './components/vista-productos/vista-productos.component';
import { MasInfoComponent } from './components/mas-info/mas-info.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'his', component: HistoryComponent },
  { path: 'productos', component: VistaProductosComponent },
  { path: 'productos/general',loadComponent: () => import('./components/producto-general/producto-general.component').then(m => m.ProductoGeneralComponent)},
  { path: 'mas-info', component: MasInfoComponent }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
