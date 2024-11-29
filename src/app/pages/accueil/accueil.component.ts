import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AccueilComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
