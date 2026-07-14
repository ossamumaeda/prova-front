import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  FormArray,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { EnderecoCard } from '../../components/endereco-card/endereco-card';

import { PessoaFormType } from '../../types/pessoa-form.type';
import { EnderecoForm } from '../../types/endereco-form.type';
import { ViaCepService } from '../../../../core/services/via-cep.service';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PessoaService } from '../../../../core/services/pessoa';
import { PersonRequest } from '../../models/person-request';
import { TipoEndereco } from '../../models/enum-tipo-endereco';

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,

    EnderecoCard
  ],
  templateUrl: './pessoa-form.html',
  styleUrl: './pessoa-form.scss'
})
export class PessoaForm implements OnInit {

  form!: PessoaFormType;

  constructor(
    private fb: NonNullableFormBuilder,

    private pessoaService: PessoaService,

    private viaCepService: ViaCepService,

    private snackBar: MatSnackBar,

    private router: Router

  ) { }
  private readonly destroyRef = inject(DestroyRef);
  saving = false;
  loadingCep: boolean[] = [];

  ngOnInit(): void {

    this.criarFormulario();

  }

  get enderecos(): FormArray<EnderecoForm> {

    return this.form.controls.enderecos;

  }

  adicionarEndereco(): void {

    this.enderecos.push(
      this.criarEndereco()
    );

    this.loadingCep.push(false);

  }

  removerEndereco(index: number): void {

    if (this.enderecos.length == 1) {
      return;
    }

    this.enderecos.removeAt(index);

    this.loadingCep.splice(index, 1);

  }

  salvar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.criarPessoa();

  }

  private criarPessoa(): void {

    this.saving = true;

    const value = this.form.getRawValue();

    const request: PersonRequest = {
      ...value,

      enderecos: value.enderecos.map(endereco => ({

        ...endereco,

        tipo: endereco.tipo!,
        codigoPostal: endereco.codigoPostal.replace(/\D/g, '')


      }))

    };
    this.pessoaService
      .create(request)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: () => {

          this.snackBar.open(

            'Pessoa cadastrada com sucesso.',

            'Fechar',

            {
              duration: 3000
            }

          );

          this.router.navigate(['/pessoas']);

        },

        error: () => {

          this.snackBar.open(

            'Erro ao cadastrar pessoa.',

            'Fechar',

            {
              duration: 4000
            }

          );

        },

        complete: () => {

          this.saving = false;

        }

      });

  }

  private criarFormulario(): void {

    this.form = this.fb.group({

      cpf: this.fb.control('', Validators.required),

      nome: this.fb.control('', Validators.required),

      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),

      dataNascimento: this.fb.control('', Validators.required),

      telefone: this.fb.control(''),

      enderecos: this.fb.array<EnderecoForm>([])

    });

    this.adicionarEndereco();

  }

  private criarEndereco(): EnderecoForm {

    return this.fb.group({

      tipo: this.fb.control<TipoEndereco | null>(
        null,
        Validators.required
      ),

      codigoPostal: this.fb.control('', Validators.required),

      logradouro: this.fb.control('', Validators.required),

      numero: this.fb.control('', Validators.required),

      complemento: this.fb.control(''),

      bairro: this.fb.control('', Validators.required),

      municipio: this.fb.control('', Validators.required),

      estado: this.fb.control('', Validators.required)

    });

  }

  buscarCep(index: number): void {

    const endereco = this.enderecos.at(index);

    const cep = endereco.controls.codigoPostal.value.replace(/\D/g, '');

    if (cep.length != 8) {
      return;
    }

    this.loadingCep[index] = true;

    this.viaCepService

      .buscar(cep)

      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )

      .subscribe({

        next: resposta => {

          endereco.patchValue({

            logradouro: resposta.logradouro,

            bairro: resposta.bairro,

            municipio: resposta.localidade,

            estado: resposta.uf

          });

        },

        error: () => {

          console.error('CEP inválido');

        },

        complete: () => {

          this.loadingCep[index] = false;

        }

      });

  }

}