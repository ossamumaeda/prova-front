import { FormControl, FormGroup } from '@angular/forms';
import { TipoEndereco } from '../models/enum-tipo-endereco';

export type EnderecoForm = FormGroup<{

  id: FormControl<string | null>;

  tipo: FormControl<TipoEndereco | null>;

  codigoPostal: FormControl<string>;

  logradouro: FormControl<string>;

  numero: FormControl<string>;

  complemento: FormControl<string>;

  bairro: FormControl<string>;

  municipio: FormControl<string>;

  estado: FormControl<string>;

}>;