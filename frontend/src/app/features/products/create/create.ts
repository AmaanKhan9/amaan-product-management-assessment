import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class CreateComponent implements OnInit {

  private baseUrl = 'http://localhost:3000/api/products';

  categories: any[] = [];

  selectedFile: File | null = null;

  form: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private categoryService: CategoryService,
    private router: Router
  ) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    this.categoryService.getAll().subscribe((res: any) => {

      console.log(res);

      this.categories = res.data;

    });

  }

  onFileChange(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

  }

  submit() {

    if (this.form.invalid) return;

    const formData = new FormData();

    formData.append('name', this.form.value.name);

    formData.append('price', this.form.value.price);

    formData.append('categoryId', this.form.value.categoryId);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post(this.baseUrl, formData).subscribe({

      next: (res) => {

        console.log(res);

        alert('Product created successfully');

        this.form.reset();

        this.selectedFile = null;

        this.router.navigate(['/products']);

      },

      error: (err) => {

        console.error(err);

        alert(err.error?.message || 'Failed to create product');

      }

    });

  }

}