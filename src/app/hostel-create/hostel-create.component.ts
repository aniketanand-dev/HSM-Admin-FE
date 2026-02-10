
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HostelService } from '../hostel.service';

@Component({
    selector: 'app-hostel-create',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule
    ],
    templateUrl: './hostel-create.component.html',
    styleUrls: ['./hostel-create.component.scss']
})
export class HostelCreateComponent {
    hostel = {
        hostelName: '',
        location: '',
        capacity: 0,
        admin: {
            name: '',
            email: '',
            password: ''
        }
    };

    message = '';
    isSuccess = false;

    constructor(
        private hostelService: HostelService,
        private router: Router
    ) { }

    onSubmit() {
        this.hostelService.createHostel(this.hostel).subscribe({
            next: (response) => {
                this.message = 'Hostel created successfully! Redirecting to verification...';
                this.isSuccess = true;
                console.log(response);

                // Redirect to verification page with email
                setTimeout(() => {
                    this.router.navigate(['/verify-email'], {
                        queryParams: { email: this.hostel.admin.email }
                    });
                }, 2000);
            },
            error: (error) => {
                this.message = error.error?.message || 'Error creating hostel.';
                this.isSuccess = false;
                console.error(error);
            }
        });
    }

    resetForm() {
        this.hostel = {
            hostelName: '',
            location: '',
            capacity: 0,
            admin: {
                name: '',
                email: '',
                password: ''
            }
        };
    }
}
