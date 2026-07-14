import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { PessoaService } from '../../../../core/services/pessoa';
import { Pessoa } from '../../../../core/models/pessoa';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-pessoa-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pessoa-list.html',
  styleUrl: './pessoa-list.scss'
})
export class PessoaList implements OnInit {


  pessoas: Pessoa[] = [];


  columns: string[] = [
    'nome',
    'cpf',
    'email',
    'acoes'
  ];

  loading = false;


  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private cd: ChangeDetectorRef

  ) { }
  editar(id: string) {

    this.router.navigate([
      '/pessoas',
      id
    ]);

  }

  remover(id: string) {

    if (!confirm(
      'Deseja remover esta pessoa?'
    )) {
      return;
    }


    this.pessoaService
      .delete(id)
      .subscribe({

        next: () => {

          this.buscarPessoas();

        }

      });

  }
  novoCadastro() {

    this.router.navigate(
      ['/pessoas/nova']
    );

  }

  ngOnInit(): void {

    this.buscarPessoas();

  }

  buscarPessoas(): void {

    this.pessoaService.findAll()
      .subscribe({

        next: (response) => {

          this.pessoas = response;

          this.cd.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }


  novaPessoa(): void {

    this.router.navigate([
      '/pessoas/nova'
    ]);

  }


}