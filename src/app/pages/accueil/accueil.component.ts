import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-accueil',
  imports: [
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    DatePipe],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  http = inject(HttpClient)
  tickets: Ticket[] = []

  ngOnInit() {
    this.refreshTickets()
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
    this.http.patch(
      `http://localhost:3000/ticket/status/${ticket.id}`,
      { status: ticket.status === 'open' ? 'closed' : 'open' })
      .subscribe(() => this.refreshTickets());
  }
}
