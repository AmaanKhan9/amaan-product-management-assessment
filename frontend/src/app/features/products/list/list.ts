import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { saveAs } from 'file-saver';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListComponent {

  products: any[] = [];

  page = 1;
  limit = 5;

  totalPages = 1;
  totalItems = 0;

  search = '';
  sort = 'asc';

  constructor(private productService: ProductService, private router: Router
  ) {
    this.load();
  }

  load() {
    this.productService.getAll({
      page: this.page,
      limit: this.limit,
      search: this.search,
      sort: this.sort
    }).subscribe((res: any) => {

      console.log(res);

      this.products = res.data.products;

      this.page = res.data.pagination.page;
      this.totalPages = res.data.pagination.totalPages;
      this.totalItems = res.data.pagination.totalItems;

    });
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.load();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }

  toggleSort() {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.page = 1;
    this.load();
  }

  onSearch() {
    this.page = 1;
    this.load();
  }

  delete(id: string) {

    if (!confirm('Delete this product?')) {
      return;
    }

    this.productService
      .delete(id)
      .subscribe(() => this.load());

  }

  exporting = false;

  downloadCsv() {

    this.exporting = true;

    this.productService.exportCsv().subscribe({

      next: (blob: Blob) => {

        saveAs(blob, 'products.csv');

        this.exporting = false;

      },

      error: (err: any) => {

        this.exporting = false;

        console.error(err);

      }

    });

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}