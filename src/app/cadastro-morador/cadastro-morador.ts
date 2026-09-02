import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cadastro-morador',
  styleUrl: './cadastro-morador.css',
  templateUrl: './cadastro-morador.html',
})
export class CadastroMorador {
  erroCadastro = '';
  cadastroConcluido = '';

  finalizarCadastro(
    nome: string,
    sobrenome: string,
    telefone: string,
    cpf: string,
    codigo: string
  ) {
    if (nome.trim() === '' ||sobrenome.trim() === '' ||telefone.trim() === '' ||cpf.trim() === '' ||codigo.trim() === '') {
      this.erroCadastro = 'Preencha todos os campos.';
      this.cadastroConcluido = '';
      return;
    }

    this.erroCadastro = '';
    this.cadastroConcluido =
      'Cadastro concluído com sucesso. Aguarde a liberação do acesso.';
  }
}
