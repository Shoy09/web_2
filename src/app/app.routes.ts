import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AcercaDeComponent } from './routes/acerca-de/acerca-de.component';
import { HistoryComponent } from './routes/history/history.component';
import { VistaProductosComponent } from './components/vista-productos/vista-productos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'his', component: HistoryComponent },
  { path: 'productos', component: VistaProductosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
