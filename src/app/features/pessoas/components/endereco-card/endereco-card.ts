import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EnderecoForm } from '../../types/endereco-form.type';
import { TipoEndereco } from '../../models/enum-tipo-endereco'
@Component({
  selector: 'app-endereco-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './endereco-card.html',
  styleUrl: './endereco-card.scss'
})
export class EnderecoCard {

  @Input({ required: true })
  form!: EnderecoForm;

  @Input()
  index = 0;

  @Input()
  canRemove = false;

  @Input()
  loading = false;

  @Output()
  remove = new EventEmitter<void>();
  TipoEndereco = TipoEndereco;

  remover(): void {
    this.remove.emit();
  }

  @Output()
  buscarCep = new EventEmitter<void>();

  buscar(): void {
    this.buscarCep.emit();
  }

}