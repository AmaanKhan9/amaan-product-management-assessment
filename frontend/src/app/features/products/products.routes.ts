import { Routes } from '@angular/router';
import { ListComponent } from './list/list';
import { CreateComponent } from './create/create';
import { EditComponent } from './edit/edit.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';

export const productRoutes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'edit/:id',
        component: EditComponent
    },
    {
        path: 'bulk',
        component: BulkUploadComponent
    }
];