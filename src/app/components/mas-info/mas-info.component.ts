import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mas-info',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './mas-info.component.html',
  styleUrl: './mas-info.component.css'
})
export class MasInfoComponent implements OnInit {

  currentLanguage = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLanguage = savedLang;
    this.translate.use(savedLang);
  }
}
