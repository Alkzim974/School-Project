import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../../core/services/product';
import { Auth } from '../../../core/services/auth';
import { Product as ProductModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  products: ProductModel[] = [];
  displayedColumns: string[] = ['name', 'category', 'price', 'stock', 'actions'];
  loading = false;
  errorMessage = '';

  constructor(
    private productService: Product,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyProducts();
  }

  loadMyProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getMyProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        console.log('Mes produits:', data);
      },
      error: (error) => {
        console.error('Erreur de chargement:', error);
        this.errorMessage = 'Impossible de charger vos produits';
        this.loading = false;
      }
    });
  }

  addProduct(): void {
    // TODO: Ouvrir un dialog pour ajouter un produit
    console.log('Ajouter un produit');
  }

  editProduct(product: ProductModel): void {
    // TODO: Ouvrir un dialog pour éditer
    console.log('Éditer:', product);
  }

  deleteProduct(product: ProductModel): void {
    if (confirm(`Supprimer "${product.name}" ? Toutes les images seront aussi supprimées.`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          console.log('Produit supprimé');
          this.loadMyProducts();
        },
        error: (error) => {
          console.error('Erreur de suppression:', error);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  viewProducts(): void {
    this.router.navigate(['/products']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
