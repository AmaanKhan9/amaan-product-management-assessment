import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bulk-upload.component.html',
  styleUrl: './bulk-upload.component.css'
})
export class BulkUploadComponent {

  selectedFile: File | null = null;

  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  onFileChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

  }

  upload(): void {

    if (!this.selectedFile) {
      alert('Please choose a CSV file.');
      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('file', this.selectedFile);

    this.http.post(
      'http://localhost:3000/api/products/bulk',
      formData
    ).subscribe({

      next: (res: any) => {

        this.loading = false;

        alert(
          `Bulk upload completed.\n\nCreated: ${res.data.created}\nFailed: ${res.data.failed}`
        );

        this.router.navigate(['/products']);

      },

      error: (err: any) => {

        this.loading = false;

        alert(err.error?.message || 'Bulk upload failed.');

      }

    });

  }

}