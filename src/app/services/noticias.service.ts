import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticias.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private noticiaInicial: Noticia = {
    id: 1,
    categoria: 'NEWS /',
    titulo: 'TERELION WILL DISCONTINUE ITS OPERATIONS...',
    fechaPublicacion: '2024-06-14',
    parrafos: [
      'Terelion will discontinue its operations...',
      'We appreciate the support...'
    ],
    contactoNombre: 'Miguel Jahncke',
    contactoEmail: 'mjahncke@terelion.com',
    firmaNombre: 'Tommy Persson',
    firmaCargo: 'President, Terelion'
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