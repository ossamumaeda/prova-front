import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Endereco, Pessoa } from '../../../../core/models/pessoa';
import { OnInit } from '@angular/core';

import { EnderecoService } from '../../../../core/services/endereco';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EnderecoFormDialog } from '../endereco-form-dialog/endereco-form-dialog';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-endereco-management-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './endereco-management-dialog.html',
  styleUrl: './endereco-management-dialog.scss'
})
export class EnderecoManagementDialog implements OnInit {


  enderecos: Endereco[] = [];

  loading = false;


  constructor(

    private dialogRef: MatDialogRef<EnderecoManagementDialog>,

    @Inject(MAT_DIALOG_DATA)
    public pessoa: Pessoa,

    private enderecoService: EnderecoService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackbar: SnackbarService,

  ) { }


  ngOnInit(): void {

    this.buscarEnderecos();

  }

  removerEndereco(endereco: Endereco): void {


    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {

        width: '420px',

        data: {

          title: 'Excluir endereço',

          message:
            `Deseja realmente excluir este endereço?\n\n${endereco.logradouro}, ${endereco.numero}`,

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


        this.excluirEndereco(endereco.id);


      });

  }

  excluirEndereco(enderecoId: string): void {


    this.enderecoService
      .delete(
        this.pessoa.id,
        enderecoId
      )
      .subscribe({

        next: () => {


          this.snackbar.success(
            'Endereço removido com sucesso.'
          );


          this.buscarEnderecos();


        },


        error: erro => {


          console.error(erro);


          this.snackbar.error(
            'Erro ao remover endereço.'
          );


        }

      });


  }

  novoEndereco(): void {


    const dialogRef = this.dialog.open(
      EnderecoFormDialog,
      {

        width: '700px',

        data: {

          pessoaId: this.pessoa.id

        }

      }

    );


    dialogRef.afterClosed()
      .subscribe(endereco => {


        if (!endereco) {

          return;

        }


        this.salvarEndereco(endereco);


      });


  }

  salvarEndereco(endereco: Endereco): void {


    this.enderecoService
      .create(
        this.pessoa.id,
        endereco
      )
      .subscribe({

        next: () => {


          this.buscarEnderecos();


        },


        error: erro => {


          console.error(
            erro
          );


        }

      });


  }

  editarEndereco(endereco: Endereco): void {


    const dialogRef = this.dialog.open(
      EnderecoFormDialog,
      {

        width: '700px',

        data: {

          pessoaId: this.pessoa.id,

          endereco: endereco

        }

      }

    );


    dialogRef.afterClosed()
      .subscribe(resultado => {


        if (!resultado) {

          return;

        }


        this.atualizarEndereco(
          endereco.id,
          resultado
        );


      });


  }

  atualizarEndereco(
    enderecoId: string,
    endereco: Endereco
  ): void {


    this.enderecoService
      .update(
        this.pessoa.id,
        enderecoId,
        endereco
      )
      .subscribe({

        next: () => {


          this.buscarEnderecos();


        },


        error: erro => {


          console.error(erro);


        }

      });


  }

  buscarEnderecos(): void {


    this.loading = true;


    this.enderecoService
      .findByPessoa(this.pessoa.id)
      .subscribe({

        next: response => {
          console.log(response)
          this.enderecos = response;

          this.loading = false;
          this.cd.detectChanges();

        },


        error: error => {

          console.error(error);

          this.loading = false;

        }

      });


  }


  fechar(): void {

    this.dialogRef.close();

  }

}