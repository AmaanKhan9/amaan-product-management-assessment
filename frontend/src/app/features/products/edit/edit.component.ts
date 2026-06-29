import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  productId = '';

  categories: any[] = [];

  currentImage = '';

  selectedFile: File | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private productService: ProductService
  ) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    this.productId =
      this.route.snapshot.paramMap.get('id') || '';

    this.loadCategories();

  }

  loadCategories(): void {

    this.http
      .get('http://localhost:3000/api/categories')
      .subscribe((res: any) => {

        this.categories = res.data;

        this.loadProduct();

      });

  }

  loadProduct(): void {

    this.productService
      .getById(this.productId)
      .subscribe((res: any) => {

        const p = res.data;

        this.currentImage =
          'http://localhost:3000' + p.image;

        this.form.patchValue({
          name: p.name,
          price: p.price,
          categoryId: p.categoryId
        });

      });

  }

  onFileChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

  }

  submit(): void {

    if (this.form.invalid) return;

    const formData = new FormData();

    formData.append(
      'name',
      this.form.value.name
    );

    formData.append(
      'price',
      this.form.value.price
    );

    formData.append(
      'categoryId',
      this.form.value.categoryId
    );

    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }

    this.productService
      .update(this.productId, formData)
      .subscribe({

        next: () => {

          alert('Product updated successfully');

          this.router.navigate(['/products']);

        },

        error: (err: any) => {

          alert(
            err.error?.message ||
            'Update failed'
          );

        }

      });

  }

}