import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-accueil',
  imports: [
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  http = inject(HttpClient)
  router = inject(Router);
  tickets: Ticket[] = [];
  role: string = '';
  userId: number = 0;

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      // Rediriger l'utilisateur vers la page de connexion s'il n'y a pas de token
      this.router.navigate(['/connexion']);
      return;
    }
  
    // Décoder le token pour obtenir l'ID de l'utilisateur et son rôle
    const decodedToken: any = jwtDecode(token);
    this.userId = decodedToken.sub; // L'ID de l'utilisateur
    this.role = decodedToken.roleId; // Le rôle de l'utilisateur
  
    // Récupérer les tickets en fonction du rôle
    this.loadTickets();
  }

  loadTickets() {
    if (this.role === 'Employés') {
      // Si l'utilisateur est un employé, récupérer seulement les tickets qui lui sont assignés
      this.http.get<any[]>(`http://localhost:3000/tickets/assigned/${this.userId}`).subscribe(tickets => {
        this.tickets = tickets;
      });
    } else if (this.role === 'admin' || this.role === 'Chef_de_projet') {
      // Si l'utilisateur est admin ou chef de projet, récupérer tous les tickets
      this.http.get<any[]>('http://localhost:3000/tickets').subscribe(tickets => {
        this.tickets = tickets;
      });
    }
  }
  

  refreshTickets() {
    this.http
      .get<Ticket[]>("http://localhost:3000/tickets")
      .subscribe(serverTickets => this.tickets = serverTickets)
  }

  onDeleteTicket(ticketId: number) {
    this.http.delete(`http://localhost:3000/ticket/${ticketId}`)
      .subscribe(() => this.refreshTickets());
  }

  onStatusChange(ticket: Ticket) {
    // Vérifier si le ticket est ouvert (closed_at est null)
    const newStatus = ticket.closed_at === null ? 'closed' : 'open';
  
    this.http.patch(
      `http://localhost:3000/ticket/status/${ticket.id}`,
      { status: newStatus })
      .subscribe(() => this.refreshTickets());
  }
  
}
