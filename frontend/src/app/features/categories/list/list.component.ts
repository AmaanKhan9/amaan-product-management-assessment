import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  delete(id: string) {
    this.categoryService.delete(id).subscribe(() => {
      this.load();
    });
  }
}