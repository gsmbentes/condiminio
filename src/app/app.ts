  import { Component, signal } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { Chamados } from './chamados/chamados';
  import { Moradores } from './moradores/moradores';
  import { CadastroMorador } from './cadastro-morador/cadastro-morador';

  @Component({
    imports: [RouterOutlet, Chamados, Moradores, CadastroMorador],
    selector: 'app-root',
    styleUrl: './app.css',
    templateUrl: './app.html',
  })
  export class App {
    protected readonly title = signal('Veritas condominio');
    mensagem = '';
    cliques = 0;
    telaAtual ='perfil';
    perfil_selecionado = '';
    erroLogin = '';
    usuarioLogado = '';


    escolherPerfil(perfil: string) {
    this.perfil_selecionado= perfil;
  }
  ir_paralogin(){
    this.telaAtual = 'login'
  }
  fazerLogin(identificador: string, senha: string) {
  if (identificador === '' || senha === '') {
    this.erroLogin = 'Preencha os campos para realizar o login.';
  } else {
    this.erroLogin = '';
    this.usuarioLogado = identificador;

    if (this.perfil_selecionado === 'sindico') {
      this.telaAtual = 'painelSindico';
    } else {
      this.telaAtual = 'sistema';
    }
  }
}
  voltarParaPerfil(){
    this.telaAtual = 'perfil';
    this.perfil_selecionado = '';
    this.erroLogin = '';
    this.usuarioLogado = '';
  }
sair() {
  this.telaAtual = 'perfil';
  this.perfil_selecionado = '';
  this.erroLogin = '';
  this.usuarioLogado = '';
}

abrirChamados() {
  this.telaAtual = 'sistema';
}

abrirMoradores() {
  this.telaAtual = 'moradores';
}
voltarParaPainelSindico() {
  this.telaAtual = 'painelSindico';
}
abrirCadastroMorador() {
  this.telaAtual = 'cadastroMorador';
}
voltarParaLogin() {
  this.telaAtual = 'login';
}
}
