import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { PessoaService } from '../../../../core/services/pessoa';
import { Pessoa } from '../../../../core/models/pessoa';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EnderecoManagementDialog } from '../../../pessoa/components/endereco-management-dialog/endereco-management-dialog';
@Component({
  selector: 'app-pessoa-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTooltipModule

  ],
  templateUrl: './pessoa-list.html',
  styleUrl: './pessoa-list.scss'
})
export class PessoaList implements OnInit {


  pessoas: Pessoa[] = [];
  pessoasFiltradas: Pessoa[] = [];

  columns: string[] = [
    'nome',
    'cpf',
    'email',
    'acoes'
  ];

  loading = false;
  readonly filterPlaceholder =
    'Pesquisar por nome ou CPF';

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackbar: SnackbarService


  ) { }

  ngOnInit(): void {

    this.buscarPessoas();

  }

  gerenciarEnderecos(pessoa: Pessoa): void {
    this.dialog.open(
      EnderecoManagementDialog,
      {
        width: '700px',
        maxHeight: '80vh',
        data: pessoa
      }
    );

  }

  buscarPessoas(): void {

    this.pessoaService.findAll()
      .subscribe({

        next: (response) => {

          this.pessoas = response;
          this.pessoasFiltradas = [...response];


          this.cd.detectChanges();

        },

        error: (error) => {

          console.error(error);
          this.snackbar.error(
            'Ocorreu um erro ao processar a solicitação.'
          );

        }

      });

  }

  editar(id: string) {

    this.router.navigate([
      '/pessoas',
      id
    ]);

  }

  remover(pessoa: Pessoa): void {

    const dialogRef = this.dialog.open(

      ConfirmDialog,

      {

        width: '420px',

        data: {

          title: 'Excluir Pessoa',

          message:
            `Deseja realmente excluir "${pessoa.nome}"?\n\nEsta ação não poderá ser desfeita.`,

          confirmText: 'Excluir',

          cancelText: 'Cancelar'

        }

      }

    );

    dialogRef.afterClosed()
      .subscribe(confirmado => {

        if (!confirmado) {
          return;
        }

        this.pessoaService
          .delete(pessoa.id)
          .subscribe({

            next: () => {

              this.buscarPessoas();

            },

            error: erro => {

              console.error(erro);

            }

          });

      });

  }
  novoCadastro() {

    this.router.navigate(
      ['/pessoas/nova']
    );

  }

  filtrar(event: Event): void {

    const filtro = (event.target as HTMLInputElement)
      .value
      .trim()
      .toLowerCase();

    this.pessoasFiltradas = this.pessoas.filter(pessoa => {

      const cpf = pessoa.cpf.replace(/\D/g, '');

      return (
        pessoa.nome.toLowerCase().includes(filtro) ||
        cpf.includes(filtro.replace(/\D/g, ''))
      );

    });

  }

  novaPessoa(): void {

    this.router.navigate([
      '/pessoas/nova'
    ]);

  }


}