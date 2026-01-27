import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent  {
  currentYear: number = new Date().getFullYear();
  
  // Si quieres datos dinámicos
  news = [
    {
      date: '2024-09-13',
      title: 'A new strategic force for the Americas',
      link: '/news/a-new-strategic-force-for-the-americas'
    },
    // ... más noticias
  ];
}