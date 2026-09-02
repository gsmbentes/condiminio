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
    codigo: string,
    senha: string,
    confirmarSenha: string,
  ) {
    if (
      nome.trim() === '' ||
      sobrenome.trim() === '' ||
      telefone.trim() === '' ||
      cpf.trim() === '' ||
      codigo.trim() === '' ||
      senha === '' ||
      confirmarSenha === ''
    ) {
      this.erroCadastro = 'Preencha todos os campos.';
      this.cadastroConcluido = '';
      return;
    }

    const cpfNumeros = cpf.replace(/\D/g, '');
    const telefoneNumeros = telefone.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
      this.erroCadastro = 'Informe um CPF com 11 números.';
      this.cadastroConcluido = '';
      return;
    }

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      this.erroCadastro = 'Informe um telefone com DDD.';
      this.cadastroConcluido = '';
      return;
    }

    if (!/^MOR-\d{3}$/i.test(codigo.trim())) {
      this.erroCadastro = 'Use o código no formato MOR-001.';
      this.cadastroConcluido = '';
      return;
    }

    if (senha.length !== 6) {
      this.erroCadastro = 'A senha deve ter exatamente 6 caracteres.';
      this.cadastroConcluido = '';
      return;
    }

    if (senha !== confirmarSenha) {
      this.erroCadastro = 'As senhas não são iguais.';
      this.cadastroConcluido = '';
      return;
    }

    this.erroCadastro = '';
    this.cadastroConcluido = 'Cadastro concluído com sucesso. Aguarde a liberação do acesso.';
  }
}
