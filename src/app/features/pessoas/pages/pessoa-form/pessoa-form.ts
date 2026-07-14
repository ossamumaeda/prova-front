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
import { PersonUpdateRequest } from '../../models/person-update-request';
import { ActivatedRoute } from '@angular/router';
import { AddressResponse } from '../../models/address-response';
import { cpfValidator } from '../../../../shared/validators/cpf.validator';
import { futureDateValidator } from '../../../../shared/validators/future-date.validator';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

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

    private router: Router,
    private route: ActivatedRoute,
    private snackbar: SnackbarService



  ) { }
  private pessoaId?: string;

  editando = false;

  private readonly destroyRef = inject(DestroyRef);
  saving = false;
  loadingCep: boolean[] = [];

  ngOnInit(): void {

    this.criarFormulario();


    const id =
      this.route.snapshot.paramMap.get('id');


    if (id) {

      this.pessoaId = id;

      this.editando = true;

      this.carregarPessoa(id);

    } else {

      this.adicionarEndereco();

    }

  }

  private carregarPessoa(id: string): void {


    this.pessoaService
      .findById(id)
      .subscribe({

        next: pessoa => {

          this.form.patchValue({

            cpf: pessoa.cpf,

            nome: pessoa.nome,

            email: pessoa.email,

            dataNascimento:
              pessoa.dataNascimento,

            telefone:
              pessoa.telefone

          });


          this.carregarEnderecos(
            pessoa.enderecos
          );

        }

      });

  }

  private carregarEnderecos(
    enderecos: AddressResponse[]
  ): void {


    this.enderecos.clear();


    enderecos.forEach(endereco => {


      const form =
        this.criarEndereco();


      form.patchValue({

        id: endereco.id,

        tipo: endereco.tipo,

        codigoPostal:
          endereco.codigoPostal,

        logradouro:
          endereco.logradouro,

        numero:
          endereco.numero,

        complemento:
          endereco.complemento,

        bairro:
          endereco.bairro,

        municipio:
          endereco.municipio,

        estado:
          endereco.estado

      });


      this.enderecos.push(form);


    });


  }

  private montarCreateRequest(): PersonRequest {

    const value = this.form.getRawValue();


    return {

      cpf: value.cpf.replace(/\D/g, ''),

      nome: value.nome,

      email: value.email,

      dataNascimento: value.dataNascimento,

      telefone: value.telefone.replace(/\D/g, ''),

      enderecos: value.enderecos.map(endereco => ({

        ...endereco,

        tipo: endereco.tipo!,

        codigoPostal:
          endereco.codigoPostal.replace(/\D/g, '')

      }))

    };

  }
  private montarUpdateRequest(): PersonUpdateRequest {

    const value = this.form.getRawValue();


    return {

      pessoa: {

        nome: value.nome,

        email: value.email,

        dataNascimento:
          value.dataNascimento,

        telefone:
          value.telefone.replace(/\D/g, '')

      },

      enderecos:
        value.enderecos.map(endereco => ({
          ...(endereco.id
            ? { id: endereco.id }
            : {}
          ),

          tipo: endereco.tipo!,

          codigoPostal:
            endereco.codigoPostal.replace(/\D/g, ''),

          logradouro:
            endereco.logradouro,

          numero:
            endereco.numero,

          complemento:
            endereco.complemento,

          bairro:
            endereco.bairro,

          municipio:
            endereco.municipio,

          estado:
            endereco.estado

        }))

    };

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


    if (this.editando) {

      this.atualizarPessoa();

    } else {

      this.criarPessoa();

    }

  }

  private atualizarPessoa(): void {


    const request =
      this.montarUpdateRequest();


    this.pessoaService
      .update(
        this.pessoaId!,
        request
      )
      .subscribe({

        next: () => {


          // this.snackBar.open(

          //   'Pessoa atualizada com sucesso.',

          //   'Fechar',

          //   {
          //     duration: 3000
          //   }

          // );

          this.snackbar.success(
            'Pessoa atualizada com sucesso.'
          );


          this.router.navigate([
            '/pessoas'
          ]);


        },


        error: () => {

          this.snackbar.error(
            'Ocorreu um erro ao processar a solicitação.'
          );

        }

      });

  }

  private criarPessoa(): void {

    this.saving = true;

    const request =
      this.montarCreateRequest();

    this.pessoaService
      .create(request)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: () => {

          this.snackbar.success(
            'Pessoa criada com sucesso.'
          );

          this.router.navigate(['/pessoas']);

        },

        error: () => {
          
          this.snackbar.error(
            'Erro ao processar formulario'
          );

        },

        complete: () => {

          this.saving = false;

        }

      });

  }

  voltar(): void {

    this.router.navigate(['/pessoas']);

  }

  private criarFormulario(): void {

    this.form = this.fb.group({

      cpf: this.fb.control(
        '',
        [
          Validators.required,
          cpfValidator()
        ]
      ),

      nome: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      dataNascimento: this.fb.control(
        '',
        [
          Validators.required,
          futureDateValidator()
        ]
      ),

      telefone: [
        ''
      ],

      enderecos: this.fb.array<EnderecoForm>([])

    });

  }

  private criarEndereco(): EnderecoForm {

    return this.fb.group({

      id: this.fb.control<string | null>(
        null
      ),

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