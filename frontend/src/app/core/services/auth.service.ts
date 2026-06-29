import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    register(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/register`, data);
    }

    login(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/login`, data)
            .pipe(
                tap((res: any) => {
                    if (res?.token) {
                        localStorage.setItem('token', res.token);
                    }
                })
            );
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }
    
    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }
}