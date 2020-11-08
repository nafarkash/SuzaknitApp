import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstructionsMetadata } from '../models/instructions-metadata';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getInstructions(): Observable<InstructionsMetadata[]> {
    return this.http.get<InstructionsMetadata[]>(this.baseUrl + 'api/metadata/instruction');
  }
}
