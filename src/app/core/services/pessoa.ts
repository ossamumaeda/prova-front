import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PersonResponse } from '../../features/pessoas/models/person-response';
import { PersonRequest } from '../../features/pessoas/models/person-request';
import { PersonUpdateRequest } from '../../features/pessoas/models/person-update-request';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly http = inject(HttpClient);

  private readonly api = `${environment.apiUrl}/pessoas`;

  private readonly apiUrl = '/api/v1/pessoas';

  findAll(): Observable<PersonResponse[]> {

    return this.http.get<PersonResponse[]>( this.apiUrl );

  }

  findById(id: string): Observable<PersonResponse> {

    return this.http.get<PersonResponse>(
      `${this.apiUrl }/${id}`
    );

  }

  create(request: PersonRequest): Observable<PersonResponse> {

    return this.http.post<PersonResponse>(
      this.apiUrl ,
      request
    );

  }

  update(id: string, request: PersonUpdateRequest): Observable<PersonResponse> {

    return this.http.put<PersonResponse>(
      `${this.apiUrl }/${id}`,
      request
    );

  }

  delete(id: string): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl }/${id}`
    );

  }

}