import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { HostelService } from '../hostel.service';

@Component({
    selector: 'app-verify-email',
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
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
    email = '';
    otp = '';
    message = '';
    isSuccess = false;
    isLoading = false;

    constructor(
        private hostelService: HostelService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // Get email from query params if available
        this.route.queryParams.subscribe(params => {
            if (params['email']) {
                this.email = params['email'];
            }
        });
    }

    verifyOtp() {
        if (!this.email || !this.otp) {
            this.message = 'Please enter both email and OTP';
            this.isSuccess = false;
            return;
        }

        this.isLoading = true;
        this.hostelService.verifyOtp(this.email, this.otp).subscribe({
            next: (response) => {
                this.message = 'Email verified successfully! You can now login.';
                this.isSuccess = true;
                this.isLoading = false;

                // Redirect to login or home after 2 seconds
                setTimeout(() => {
                    this.router.navigate(['/create-hostel']);
                }, 2000);
            },
            error: (error) => {
                this.message = error.error?.error || error.error?.message || 'Verification failed. Please try again.';
                this.isSuccess = false;
                this.isLoading = false;
            }
        });
    }

    resendOtp() {
        if (!this.email) {
            this.message = 'Please enter your email address';
            this.isSuccess = false;
            return;
        }

        this.isLoading = true;
        this.hostelService.sendOtp(this.email).subscribe({
            next: (response) => {
                this.message = 'OTP sent to your email!';
                this.isSuccess = true;
                this.isLoading = false;
            },
            error: (error) => {
                this.message = error.error?.error || 'Failed to send OTP';
                this.isSuccess = false;
                this.isLoading = false;
            }
        });
    }
}
