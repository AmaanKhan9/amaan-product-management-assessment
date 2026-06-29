import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = 'http://localhost:3000/api/products';

    constructor(private http: HttpClient) { }

    getAll(query: any) {

        let params = new HttpParams();

        Object.keys(query).forEach(key => {
            params = params.set(key, query[key]);
        });

        return this.http.get(this.baseUrl, { params });
    }

    create(data: FormData) {
        return this.http.post(this.baseUrl, data);
    }

    getById(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    update(id: string, formData: FormData) {
        return this.http.put(`${this.baseUrl}/${id}`, formData);
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    exportCsv() {
        return this.http.get(
            `${this.baseUrl}/export?format=csv`,
            {
                responseType: 'blob'
            }
        );
    }

}