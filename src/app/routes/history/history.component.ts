import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface HistoryStory {
  year: string;
  text: string;
}

interface HistoryItem {
  image: string;
  alt: string;
  stories: HistoryStory[];
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']  // CORRECCIÓN
})
export class HistoryComponent implements OnInit {

  // ===============================
  // IDIOMAS
  // ===============================
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }
  ];

  currentLanguage: string = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLanguage = savedLang;
    this.translate.use(savedLang);
  }

  selectLanguage(langCode: string) {
    this.currentLanguage = langCode;
    localStorage.setItem('language', langCode);
    this.translate.use(langCode);
  }

  get currentLanguageLabel(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.label : '';
  }

  // ===============================
// TIMELINE
// ===============================
timeline: HistoryItem[] = [
  {
    image: 'prueba.jpg',
    alt: 'Yarel logo',
    stories: [
      { year: '1947', text: 'HISTORY.STORY_1947' },
      { year: '1950', text: 'HISTORY.STORY_1950' }
    ]
  },
  {
    image: '/assets/mexico-flag.png',
    alt: 'México',
    stories: [
      { year: '1971', text: 'HISTORY.STORY_1971' }
    ]
  },
  {
    image: '/assets/walker-logo.png',
    alt: 'Walker McDonald',
    stories: [
      { year: '1999', text: 'HISTORY.STORY_1999' }
    ]
  }
];
}