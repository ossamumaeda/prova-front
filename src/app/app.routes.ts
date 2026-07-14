import { Routes } from '@angular/router';
import { PessoaList } from './features/pessoas/pages/pessoa-list/pessoa-list';
import { PessoaForm } from './features/pessoas/pages/pessoa-form/pessoa-form';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'pessoas',
    pathMatch: 'full'
  },

  {
    path: 'pessoas',
    component: PessoaList
  },

  {
    path: 'pessoas/nova',
    component: PessoaForm
  }

];