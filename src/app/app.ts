import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chamados } from './chamados/chamados';

@Component({
  imports: [RouterOutlet, Chamados],
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
    this.telaAtual = 'sistema';
    
  }
}
voltarParaPerfil(){
  this.telaAtual = 'perfil';
  this.perfil_selecionado = '';
  this.erroLogin = '';
  this.usuarioLogado = '';
}
sair(){
  this.telaAtual = 'perfil';
  this.perfil_selecionado = '';
  this.erroLogin = '';
  this.usuarioLogado = '';
}
}