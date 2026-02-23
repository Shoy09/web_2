import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeService } from '../../../services/home.service';
import { HomeData, Card, HeroSection, AboutSection } from '../../../models/home.model';

@Component({
  selector: 'app-home-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule],
  templateUrl: './home-editor.component.html',
  styleUrls: ['./home-editor.component.css']
})
export class HomeEditorComponent implements OnInit {
  homeData: HomeData = {
    hero: { titleLines: [''], buttonText: '', buttonLink: '' },
    cards: [],
    about: { title: '', paragraphs: [''], linkText: '', linkUrl: '' }
  };

  showSuccessMessage = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: data => this.homeData = data,
      error: err => console.error('Error cargando home:', err)
    });
  }

  saveChanges() {
    this.homeService.updateHome(this.homeData).subscribe({
      next: () => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      },
      error: err => console.error('Error guardando home:', err)
    });
  }

  resetForm() {
    this.homeService.getHome().subscribe(data => this.homeData = data);
  }

  addHeroLine() { this.homeData.hero.titleLines.push(''); }
  removeHeroLine(index: number) { this.homeData.hero.titleLines.splice(index, 1); }

  addCard() {
    this.homeData.cards.push({ image: '', title: '', buttonText: '', type: 'history' });
  }
  removeCard(index: number) { this.homeData.cards.splice(index, 1); }

  addAboutParagraph() { this.homeData.about.paragraphs.push(''); }
  removeAboutParagraph(index: number) { this.homeData.about.paragraphs.splice(index, 1); }
}