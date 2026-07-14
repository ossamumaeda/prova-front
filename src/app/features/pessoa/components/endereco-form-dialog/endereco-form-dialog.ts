import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Endereco } from '../../../../core/models/pessoa';



export interface EnderecoFormData {

  endereco?: Endereco;

  pessoaId: string;

}



@Component({

  selector: 'app-endereco-form-dialog',

  standalone: true,

  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule
  ],

  templateUrl: './endereco-form-dialog.html',

  styleUrl: './endereco-form-dialog.scss'

})
export class EnderecoFormDialog implements OnInit {


  form!: FormGroup;


  editando = false;



  constructor(

    private fb: FormBuilder,


    private dialogRef:
      MatDialogRef<EnderecoFormDialog>,


    @Inject(MAT_DIALOG_DATA)
    public data: EnderecoFormData

  ) {}



  ngOnInit(): void {


    this.editando = !!this.data.endereco;


    this.criarFormulario();


  }



  criarFormulario(): void {


    this.form = this.fb.group({


      tipo: [
        this.data.endereco?.tipo ?? '',
        Validators.required
      ],


      codigoPostal: [
        this.data.endereco?.codigoPostal ?? '',
        Validators.required
      ],


      logradouro: [
        this.data.endereco?.logradouro ?? '',
        Validators.required
      ],


      numero: [
        this.data.endereco?.numero ?? '',
        Validators.required
      ],


      complemento: [
        this.data.endereco?.complemento ?? ''
      ],


      bairro: [
        this.data.endereco?.bairro ?? '',
        Validators.required
      ],


      municipio: [
        this.data.endereco?.municipio ?? '',
        Validators.required
      ],


      estado: [
        this.data.endereco?.estado ?? '',
        Validators.required
      ]

    });


  }



  salvar(): void {


    if(this.form.invalid){

      this.form.markAllAsTouched();

      return;

    }


    this.dialogRef.close(

      this.form.value

    );


  }



  cancelar(): void {

    this.dialogRef.close();

  }


}