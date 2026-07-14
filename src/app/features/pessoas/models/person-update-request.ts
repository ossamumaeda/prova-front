import { AddressRequest } from './address-request';
import { AddressUpdateRequest } from './address-update-request';

export interface PersonUpdateRequest {

    pessoa: {

        nome: string;

        email: string;

        dataNascimento: string;

        telefone: string;

    };

    enderecos: AddressUpdateRequest[];

}