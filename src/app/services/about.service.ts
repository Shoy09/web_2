import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AboutSection } from '../models/about.model';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private api = '/api/about';

  private _aboutData: AboutSection = this.getDefaultData();
  private aboutDataSubject = new BehaviorSubject<AboutSection>(this._aboutData);
  public aboutData$ = this.aboutDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  getAbout(): AboutSection {
    return JSON.parse(JSON.stringify(this._aboutData));
  }

  getAboutObservable(): Observable<AboutSection> {
    return this.aboutData$;
  }

  updateAbout(data: AboutSection): void {
    const aboutData = {
      heroTitle: (data.heroTitle ?? '').trim(),
      subtitle: (data.subtitle ?? '').trim(),
      paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs.map(p => (p ?? '').trim()).filter(p => p !== '') : [],
      paragraphs2: Array.isArray(data.paragraphs2) ? data.paragraphs2.map(p => (p ?? '').trim()) : []
    };
    this.http.put<any>(this.api, { aboutData }).subscribe({
      next: (resp) => {
        const mapped: AboutSection = resp.aboutData ?? aboutData;
        this._aboutData = mapped;
        this.aboutDataSubject.next(mapped);
      },
      error: () => {
        this._aboutData = aboutData;
        this.aboutDataSubject.next(aboutData);
      }
    });
  }

  private load(): void {
    this.http.get<any>(this.api).subscribe({
      next: (resp) => {
        const mapped: AboutSection = resp.aboutData ?? resp;
        this._aboutData = mapped;
        this.aboutDataSubject.next(mapped);
      },
      error: () => {
        this.aboutDataSubject.next(this._aboutData);
      }
    });
  } 

  private getDefaultData(): AboutSection {
    return {
      heroTitle: 'SOBRE NOSOTROS',
      subtitle: 'Nuestra misión, valores y equipo',
      paragraphs: ['Somos orgullosos especialistas en el desarrollo y fabricación de brocas de cono de rodillos para las industrias de minería y construcción. Texas es nuestra patria, pero la industria minera a cielo abierto mundial es nuestro patio de recreo.',
        'En Terelion siempre nos hemos dedicado a ser los mejores en nuestro negocio. Exploramos constantemente nuevos diseños innovadores, nuevos materiales, nuevos métodos de fabricación y nuevas herramientas de ingeniería. Sólo para suministrar a nuestros clientes las brocas de cono de rodillos más resistentes, eficientes y rentables disponibles.'
      ],
      paragraphs2: ['Dondequiera que mires, el mundo está lleno de tareas desafiantes que la humanidad debe resolver. En Terelion nos especializamos en aquellos desafíos que plantea la perforación con voladuras en la minería a cielo abierto.',
        'Siempre nos hemos dedicado a ser los mejores en nuestro negocio. Exploramos constantemente nuevos diseños innovadores, nuevos materiales, nuevos métodos de fabricación y nuevas herramientas de ingeniería. Todo con el objetivo de fabricar las brocas de cono de rodillos más resistentes, eficientes y rentables disponibles.',
        'Algunas de nuestras innovaciones son menores. Otros conducen a avances que afectan a toda la industria. Estén atentos y estarán entre los primeros en saber cuándo Terelion lanzará la próxima innovación en perforación de rocas.'
      ]
    };
  }
}
