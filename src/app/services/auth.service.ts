import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth) {
    this.loadUserFromLocalStorage();
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }
  // Carregar o usuário salvo no localStorage (se existir)
  loadUserFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Validação adicional: verificar se os campos essenciais existem
        if (parsedUser.uid && parsedUser.email && parsedUser.displayName) {
          this.currentUser = parsedUser;
        } else {
          this.currentUser = null;
        }
      } catch (error) {
        console.error('Erro ao analisar os dados do usuário:', error);
        this.currentUser = null;
      }
    }
  }

  // Verificar se o usuário está autenticado e possui informações salvas
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  // Limpar informações do usuário (Logout)
  logout() {
    localStorage.removeItem('user');
    this.auth.signOut();
  }
}
