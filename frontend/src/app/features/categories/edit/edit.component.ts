import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  id!: string;
  form: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.getById(this.id)
      .subscribe((res: any) => {
        this.form.patchValue(res.data);
      });
  }

  submit() {
    if (this.form.invalid) return;

    this.categoryService.update(this.id, this.form.value)
      .subscribe(() => {
        this.router.navigate(['/categories']);
      });
  }
}