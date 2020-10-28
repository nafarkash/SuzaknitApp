import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getByCategory(category: string): Observable<Image> {
    return this.http.get<Image>(this.baseUrl + 'api/image/cactus');
  }
}
