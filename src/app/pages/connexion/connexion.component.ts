import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-connexion',
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  // Initialisation du formulaire
  formulaire = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  // Variable pour afficher les messages d'erreur
  errorMessage: string | null = null;

  // Méthode de connexion
  onConnexion() {
    if (this.formulaire.valid) {
      this.http.post<{ jwt: string }>(
        "http://localhost:3000/connexion",
        this.formulaire.value
      ).subscribe({
        next: (reponse) => {
          localStorage.setItem("jwt", reponse.jwt); // Stockage du token JWT
          this.errorMessage = null; // Réinitialiser le message d'erreur
          this.router.navigate(['/accueil']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
          } else {
            this.errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
          }
        }
      });
    }
  }
}
