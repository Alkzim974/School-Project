import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../../core/services/product';
import { MediaService } from '../../../core/services/media';
import { Auth } from '../../../core/services/auth';
import { Product as ProductModel } from '../../../core/models/product.model';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  products: any[] = []; // Produits avec leurs images
  loading = false;
  errorMessage = '';
  searchKeyword = '';

  constructor(
    private productService: Product,
    private mediaService: MediaService,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        // Pour chaque produit, charger ses images
        const productsWithImages$ = products.map(product => 
          this.mediaService.getMediaByProduct(product.id).pipe(
            map(media => ({
              ...product,
              imageUrl: media.length > 0 ? this.mediaService.getImageUrl(media[0].url) : null
            })),
            catchError(() => of({ ...product, imageUrl: null }))
          )
        );

        // Attendre que toutes les images soient chargées
        if (productsWithImages$.length > 0) {
          forkJoin(productsWithImages$).subscribe({
            next: (productsWithImages) => {
              this.products = productsWithImages;
              this.loading = false;
              console.log('Produits avec images:', productsWithImages);
            },
            error: (error) => {
              console.error('Erreur chargement images:', error);
              this.products = products;
              this.loading = false;
            }
          });
        } else {
          this.products = [];
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Erreur de chargement des produits:', error);
        this.errorMessage = 'Impossible de charger les produits. Vérifiez que le backend est démarré.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchKeyword.trim()) {
      this.loadProducts();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.productService.searchProducts(this.searchKeyword).subscribe({
      next: (products) => {
        // Charger les images pour les résultats de recherche
        const productsWithImages$ = products.map(product => 
          this.mediaService.getMediaByProduct(product.id).pipe(
            map(media => ({
              ...product,
              imageUrl: media.length > 0 ? this.mediaService.getImageUrl(media[0].url) : null
            })),
            catchError(() => of({ ...product, imageUrl: null }))
          )
        );

        if (productsWithImages$.length > 0) {
          forkJoin(productsWithImages$).subscribe({
            next: (productsWithImages) => {
              this.products = productsWithImages;
              this.loading = false;
            },
            error: (error) => {
              console.error('Erreur chargement images:', error);
              this.products = products;
              this.loading = false;
            }
          });
        } else {
          this.products = [];
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Erreur de recherche:', error);
        this.errorMessage = 'Erreur lors de la recherche';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

