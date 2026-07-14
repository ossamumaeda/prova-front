import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Endereco } from '../models/pessoa';


@Injectable({
    providedIn: 'root'
})
export class EnderecoService {

    private readonly http = inject(HttpClient);

    private readonly api = `${environment.apiUrl}/pessoas`;

    private readonly apiUrl = '/api/v1/pessoas';


    findByPessoa(
        pessoaId: string
    ): Observable<Endereco[]> {

        return this.http.get<Endereco[]>(
            `${this.apiUrl}/${pessoaId}/enderecos`
        );

    }

    create(
        pessoaId: string,
        endereco: Endereco
    ): Observable<Endereco> {

        return this.http.post<Endereco>(
            `${this.apiUrl}/${pessoaId}/enderecos`,
            endereco
        );

    }

    update(
        pessoaId: string,
        enderecoId: string,
        endereco: Endereco
    ): Observable<Endereco> {


        return this.http.patch<Endereco>(

            `${this.apiUrl}/${pessoaId}/enderecos/${enderecoId}`,

            endereco

        );

    }

    delete(
        pessoaId: string,
        enderecoId: string
    ): Observable<void> {


        return this.http.delete<void>(

            `${this.apiUrl}/${pessoaId}/enderecos/${enderecoId}`,

        );


    }

}