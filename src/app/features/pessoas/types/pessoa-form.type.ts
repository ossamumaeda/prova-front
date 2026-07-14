import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EnderecoForm } from './endereco-form.type';

export type PessoaFormType = FormGroup<{

  cpf: FormControl<string>;

  nome: FormControl<string>;

  email: FormControl<string>;

  dataNascimento: FormControl<string>;

  telefone: FormControl<string>;

  enderecos: FormArray<EnderecoForm>;

}>;