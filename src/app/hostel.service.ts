
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HostelService {
    private apiUrl = 'http://localhost:5000/api/v1/hostel';
    private baseUrl = 'http://localhost:5000/api/v1';

    constructor(private http: HttpClient) { }

    createHostel(hostelData: any): Observable<any> {
        return this.http.post(this.apiUrl, hostelData);
    }

    verifyOtp(email: string, otp: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/otp/verify`, { email, otp });
    }

    sendOtp(email: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/otp/send`, { email });
    }
}
