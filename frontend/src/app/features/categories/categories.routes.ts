import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

export const categoryRoutes: Routes = [
    { path: '', component: ListComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditComponent }
];