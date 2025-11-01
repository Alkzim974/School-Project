import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_URL = 'http://localhost:8081/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cartService: Cart
  ) { }

  /**
   * Inscription d'un nouvel utilisateur
   */
  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  /**
   * Connexion d'un utilisateur
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          const user: User = {
            id: response.userId,
            email: response.email,
            name: response.name,
            role: response.role
          };
          this.saveUser(user);
          this.currentUserSubject.next(user);
          // Recharger le panier de l'utilisateur connecté
          this.cartService.loadCart();
        })
      );
  }

  /**
   * Déconnexion
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    // Vider le panier en mémoire (mais pas supprimer du localStorage)
    this.cartService.clearCartOnLogout();
  }

  /**
   * Récupérer le token JWT
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Récupérer l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Vérifier si l'utilisateur est un SELLER
   */
  isSeller(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'SELLER';
  }

  /**
   * Sauvegarder le token
   */
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Sauvegarder l'utilisateur
   */
  private saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
