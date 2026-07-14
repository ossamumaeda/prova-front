import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

export interface ViaCepResponse {

  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;

}

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly http = inject(HttpClient);

  private cache = new Map<string, ViaCepResponse>();

  buscar(cep: string): Observable<ViaCepResponse> {

    const cepLimpo = cep.replace(/\D/g, '');

    const cached = this.cache.get(cepLimpo);

    if (cached) {
      return of(cached);
    }

    return this.http
      .get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      )
      .pipe(
        tap(res => this.cache.set(cepLimpo, res)),
        shareReplay(1)
      );

  }

}