import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service'; // Ajusta la ruta según tu carpeta
import { Noticia } from '../../../models/noticias.model';

@Component({
  selector: 'app-noticias-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './noticias-editor.component.html',
  styleUrls: ['./noticias-editor.component.css']
})
export class NoticiasEditorComponent implements OnInit {
  noticia: Noticia = {
  id: 0,
  categoria: '',
  titulo: '',
  fechaPublicacion: '',
  parrafos: [],
  contactoNombre: '',
  contactoEmail: '',
  firmaNombre: '',
  firmaCargo: ''
};

  tabActiva: string = 'header'; // Pestaña inicial

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    // Nos suscribimos a los datos para que el editor siempre tenga lo último
    this.noticiasService.getNoticia().subscribe(data => {
      this.noticia = { ...data };
    });
  }

  setTab(tabName: string) {
    this.tabActiva = tabName;
  }

  // Método para guardar los cambios en el servicio
  guardarCambios() {
    this.noticiasService.updateNoticia(this.noticia);
    alert('¡Noticia actualizada correctamente!');
  }

  // Permite añadir nuevos párrafos dinámicamente
  agregarParrafo() {
    this.noticia.parrafos.push('');
  }

  // Eliminar un párrafo específico
  eliminarParrafo(index: number) {
    this.noticia.parrafos.splice(index, 1);
  }

  trackByFn(index: any) {
    return index;
  }
}