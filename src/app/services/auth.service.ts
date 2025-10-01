import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  private readonly USERS_KEY = 'registered_users';
  private readonly CURRENT_USER_KEY = 'current_user';

  constructor(private router: Router) {
    this.loadCurrentUser();
  }

  get currentUser() {
    return this.currentUserSignal.asReadonly();
  }

  get isAuthenticated() {
    return this.currentUserSignal() !== null;
  }

  register(userData: User): { success: boolean; message: string } {
    const users = this.getStoredUsers();

    if (this.emailExists(users, userData.email)) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const newUser = this.createNewUser(userData);
    this.saveUser(users, newUser);
    this.loginUser(newUser);

    return { success: true, message: 'Usuario registrado exitosamente' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.getStoredUsers();
    const user = this.findUserByCredentials(users, email, password);

    if (user) {
      this.loginUser(user);
      return { success: true, message: 'Login exitoso' };
    } else {
      return { success: false, message: 'Email o contraseña incorrecta' };
    }
  }

  logout(): void {
    this.currentUserSignal.set(null);
    this.removeCurrentUserFromStorage();
    this.router.navigate(['/login']);
  }

  private getStoredUsers(): User[] {
    const stored = localStorage.getItem(this.USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private emailExists(users: User[], email: string): boolean {
    return users.some(user => user.email === email);
  }

  private createNewUser(userData: User): User {
    return {
      ...userData,
    };
  }

  private saveUser(users: User[], newUser: User): void {
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  private findUserByCredentials(users: User[], email: string, password: string): User | undefined {
    return users.find(u => u.email === email && u.password === password);
  }

  private loginUser(user: User): void {
    this.currentUserSignal.set(user);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  private removeCurrentUserFromStorage(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  private loadCurrentUser(): void {
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    if (stored) {
      this.currentUserSignal.set(JSON.parse(stored));
    }
  }

}
