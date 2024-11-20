import { Injectable } from '@angular/core';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  private auth = getAuth();
  private db = getFirestore();
  constructor(private router: Router, private toastr: ToastrService) {}

  //Registro de user com role
  async registerUser(
    email: string,
    password: string,
    role: string = 'user'
  ): Promise<UserCredential | string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      // Salvar o papel (role) do usuário no Firestore
      await setDoc(doc(this.db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        role: role || 'user', //padrão user
      });

      this.toastr.success('Conta criada com sucesso!', 'Sucesso');
      this.router.navigate(['/login']);
      return userCredential;
    } catch (error: any) {
      this.toastr.error(this.getErrorMessage(error.code), 'Erro');
      return this.getErrorMessage(error.code);
    }
  }

  // Função para verificar se o email existe no Firestore

  private async checkEmailExists(email: string): Promise<boolean> {
    const usersRef = collection(this.db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Fazer login com verificação no Firestore
  async login(
    email: string,
    password: string
  ): Promise<UserCredential | string> {
    try {
      // Verificar se o e-mail existe no Firestore
      const emailExists = await this.checkEmailExists(email);
      if (!emailExists) {
        this.toastr.error('Email não registrado no sistema.', 'Erro');
        return 'Email não encontrado no Firestore.';
      }
      // Fazer login com Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      this.toastr.success('Login realizado com sucesso!', 'Sucesso');
      this.router.navigate(['home']);
      return userCredential;
    } catch (error: any) {
      this.toastr.error(this.getErrorMessage(error.code), 'Erro');
      return this.getErrorMessage(error.code);
    }
  }

  // Função para retornar mensagens de erro personalizadas
  getErrorMessage(error: any): string {
    switch (error) {
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

  async loginUser() {}
}
