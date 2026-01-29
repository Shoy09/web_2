import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentLanguage: string = '';
  

  ngOnInit(): void {
    
  }

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