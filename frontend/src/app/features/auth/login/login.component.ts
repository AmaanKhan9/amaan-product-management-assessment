import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/products']);
      return;
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {

        // 🔥 IMPORTANT: adjust based on backend response
        const token = res?.data?.token || res?.token;

        if (token) {
          this.auth.saveToken(token);
        }

        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed');
      }
    });
  }
}