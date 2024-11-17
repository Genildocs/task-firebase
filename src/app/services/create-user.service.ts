import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  private auth = getAuth();
  private db = getFirestore();
  constructor(private router: Router) {}

  // Criar usuário
  async createUser(
    email: string,
    password: string
  ): Promise<UserCredential | string> {
    try {
      const UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return UserCredential;
    } catch (error: any) {
      return this.getErrorMessage(error.code);
    }
  }

  // Função para retornar mensagens de erro personalizadas
  getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso. Por favor, use outro.';
      case 'auth/invalid-email':
        return 'O e-mail fornecido é inválido.';
      case 'auth/weak-password':
        return 'A senha é muito fraca. Use pelo menos 6 caracteres.';
      case 'auth/user-not-found':
        return 'Usuário não encontrado. Verifique o e-mail informado.';
      case 'auth/wrong-password':
        return 'Senha incorreta. Tente novamente.';
      case 'auth/network-request-failed':
        return 'Erro de rede. Verifique sua conexão.';
      default:
        return 'Ocorreu um erro. Tente novamente mais tarde.';
    }
  }
}
