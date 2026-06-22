import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/productResponse.model';
import { ProductRequest } from '../../models/productRequest.model';
import { list } from 'postcss';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productPage.html',
  styleUrls: ['./productPage.css'],
})
export class ProductPage implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  //STATE (Signals - UI State)
  products = signal<ProductResponse[]>([]);
  loading = signal(false);
  error = signal('');
  showForm = signal(false);
  editingId = signal<number | null>(null);

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
  }

  // 🧠 FORM
  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    });
  }
  //validator

  //HELPERS
  private setLoading(value: boolean): void {
    this.loading.set(value);
  }

  private setError(message: string): void {
    this.error.set(message);
  }

  //GET PRODUCTS
  loadProducts(): void {
    this.setLoading(true);

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.setLoading(false);
      },
      error: () => {
        this.setError('Error al cargar productos');
        this.setLoading(false);
      },
    });
  }

  //OPEN FORM
  openCreate(): void {
    this.showForm.set(true);
    this.editingId.set(null);
    this.form.reset();
    this.error.set('');
  }

  //CLOSE FORM
  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form.reset();
  }
  //CREATE PRODUCT
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product: ProductRequest = {
      name: this.form.value.name,
      price: Number(this.form.value.price),
      stock: Number(this.form.value.stock),
    };

    const id = this.editingId();
    if (id) {
      this.productService.updateProduct(id, product).subscribe({
        next: () => {
          this.products.update((list) => list.map((p) => (p.id === id ? { ...p, ...product } : p)));
        },
      });
      this.closeForm();
    } else {
      this.productService.createProduct(product).subscribe({
        next: (created) => {
          this.products.update((list) => [created, ...list]);
          this.showForm.set(false);
          this.form.reset();
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.message || 'Error al crear producto');
          this.setError('Error al crear producto');
        },
      });
    }
  }

  //DELETE LOGICO
  deleteProduct(id: number): void {
    this.products.update((list) => list.map((p) => (p.id === id ? { ...p, isActive: false } : p)));

    this.productService.deleteProduct(id).subscribe({
      error: (err) => {
        console.error(err);
      },
    });
  }

  openEdit(product: ProductResponse): void {
    this.showForm.set(true);
    this.editingId.set(product.id);

    this.form.patchValue({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });

    this.error.set('');
  }
}
