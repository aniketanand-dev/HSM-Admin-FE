
import { Routes } from '@angular/router';
import { HostelCreateComponent } from './hostel-create/hostel-create.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

export const routes: Routes = [
    { path: 'create-hostel', component: HostelCreateComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: '', redirectTo: '/create-hostel', pathMatch: 'full' }
];
