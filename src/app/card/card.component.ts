import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  styleUrls: ['./card.component.css'],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() title: string = ''; 
}