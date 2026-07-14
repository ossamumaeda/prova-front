export interface Pessoa {

  id: string;

  cpf: string;

  nome: string;

  email: string;

  dataNascimento: string;

  telefone: string;

  enderecos: Endereco[];

}


export interface Endereco {

  id: string;

  tipo: string;

  codigoPostal: string;

  logradouro: string;

  numero: string;

  complemento: string;

  bairro: string;

  municipio: string;

  estado: string;

}