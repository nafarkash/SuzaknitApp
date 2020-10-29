import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image'
import { Observable } from 'rxjs';
import { EImageCategory } from '../models/image-category';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getByCategory(category: EImageCategory): Observable<Image[]> {
    return this.http.get<Image[]>(this.baseUrl + `api/image/${EImageCategory[category].toLowerCase()}`);
  }
}
