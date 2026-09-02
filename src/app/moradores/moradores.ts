import { Component } from '@angular/core';
type Morador = {
  nome: string;
  bloco: string;
  apartamento: string;
  codigo: string;
};
@Component({
  imports: [],
  selector: 'app-moradores',
  styleUrl: './moradores.css',
  templateUrl: './moradores.html',
})
export class Moradores {
  moradores: Morador[] = [];
  codigoGerado = '';
  erroCadastro = '';
  proximoCodigo = 1;
  mostrarModalConfirmacao = false;
  nomePendente = '';
  blocoPendente = '';
  apartamentoPendente = '';

  confirmarCadastro(nome: string, bloco: string, apartamento: string) {
    if (nome.trim() === '' || bloco.trim() === '' || apartamento.trim() === '') {
      this.erroCadastro = 'Preencha nome, bloco e apartamento.';
      this.codigoGerado = '';
      return;
    }
    const apartamentoJaCadastrado = this.moradores.some(
      (morador) =>
        morador.bloco.trim().toLowerCase() === bloco.trim().toLowerCase() &&
        morador.apartamento.trim() === apartamento.trim(),
    );

    if (apartamentoJaCadastrado) {
      this.erroCadastro = 'Já existe um morador cadastrado neste bloco e apartamento.';
      this.codigoGerado = '';
      return;
    }

    this.erroCadastro = '';
    this.nomePendente = nome.trim();
    this.blocoPendente = bloco.trim();
    this.apartamentoPendente = apartamento.trim();
    this.mostrarModalConfirmacao = true;
  }

  cadastrarMorador(nome: string, bloco: string, apartamento: string) {
    if (nome.trim() === '' || bloco.trim() === '' || apartamento.trim() === '') {
      this.erroCadastro = 'Preencha nome, bloco e apartamento.';
      return;
    }

    this.erroCadastro = '';
    const codigo = 'MOR-' + String(this.proximoCodigo).padStart(3, '0');

    this.moradores.push({
      nome: nome,
      bloco: bloco,
      apartamento: apartamento,
      codigo: codigo,
    });

    this.codigoGerado = codigo;
    this.proximoCodigo++;
  }
  cancelarConfirmacao() {
    this.mostrarModalConfirmacao = false;
    this.nomePendente = '';
    this.blocoPendente = '';
    this.apartamentoPendente = '';
  }

  confirmarCadastroFinal(
    nomeInput: HTMLInputElement,
    blocoInput: HTMLInputElement,
    apartamentoInput: HTMLInputElement,
  ) {
    this.cadastrarMorador(this.nomePendente, this.blocoPendente, this.apartamentoPendente);

    this.mostrarModalConfirmacao = false;
    this.nomePendente = '';
    this.blocoPendente = '';
    this.apartamentoPendente = '';

    nomeInput.value = '';
    blocoInput.value = '';
    apartamentoInput.value = '';
  }
}
