import { AddressResponse } from "./address-response";

export interface PersonResponse {

    id: string;

    cpf: string;

    nome: string;

    email: string;

    dataNascimento: string;

    telefone: string;

    enderecos: AddressResponse[];

}