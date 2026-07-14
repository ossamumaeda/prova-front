import { AddressRequest } from "./address-request";

export interface PersonRequest {

    cpf: string;

    nome: string;

    email: string;

    dataNascimento: string;

    telefone: string;

    enderecos: AddressRequest[];

}