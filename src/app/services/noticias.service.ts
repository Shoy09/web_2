import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticias.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private noticiaInicial: Noticia = {
    id: 1,
    categoria: '',
    titulo: '',
    fechaPublicacion: '',
    parrafos: [
      '',
      ''
    ],
    contactoNombre: '',
    contactoEmail: '',
    firmaNombre: '',
    firmaCargo: ''
  };

  private noticiaSubject: BehaviorSubject<Noticia>;

  constructor() {
    const noticiaGuardada = localStorage.getItem('noticia');
    const data = noticiaGuardada
      ? JSON.parse(noticiaGuardada)
      : this.noticiaInicial;

    this.noticiaSubject = new BehaviorSubject<Noticia>(data);
  }

  getNoticia(): Observable<Noticia> {
    return this.noticiaSubject.asObservable();
  }

  updateNoticia(nuevaNoticia: Noticia) {
    localStorage.setItem('noticia', JSON.stringify(nuevaNoticia));
    this.noticiaSubject.next(nuevaNoticia);
  }
}