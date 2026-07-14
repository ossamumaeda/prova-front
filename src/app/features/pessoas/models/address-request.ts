import { TipoEndereco } from "./enum-tipo-endereco";

export interface AddressRequest {

    tipo: TipoEndereco;

    codigoPostal: string;

    logradouro: string;

    numero: string;

    complemento: string;

    bairro: string;

    municipio: string;

    estado: string;

}