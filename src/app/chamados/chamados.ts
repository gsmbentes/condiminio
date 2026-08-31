import { Component, Input } from '@angular/core';
type Chamado = {
  descricao: string;
  gravidade: number;
  status: string;
  criadoPor: string;
  excluidoPor?: string;
};


@Component({
  imports: [],
  selector: 'app-chamados',
  styleUrl: './chamados.css',
  templateUrl: './chamados.html',
})
export class Chamados {
  mensagemSucesso = '';
  mensagemErro = '';
  @Input() perfil = '';
  @Input() usuarioLogado = '';
  telaChamados = 'lista';
  chamadosExcluidos: Chamado[] = [];

  chamados: Chamado[] = [
    {
      descricao: 'Lâmpada quebrada',
      gravidade: 4,
      status: 'aberto',
      criadoPor: 'sindico@veritas.com',
    },
    {
      descricao: 'Vazamento de água',
      gravidade: 9,
      status: 'aberto',
      criadoPor: 'sindico@veritas.com',
    },
    {
      descricao: 'Portão quebrado',
      gravidade: 8,
      status: 'resolvido',
      criadoPor: 'sindico@veritas.com',
    },
  ];

 resolver(chamado: Chamado) {
  chamado.status = 'resolvido';
}
  quantidadeAbertos() {
  return this.chamados.filter((chamado) => chamado.status === 'aberto').length;
}
adicionarChamado( descricaoInput: HTMLInputElement,gravidadeInput: HTMLInputElement) {
  const descricao = descricaoInput.value;
  const gravidade = Number(gravidadeInput.value);

  if (descricao.trim() === '' || gravidade < 1 || gravidade > 10) {
    this.mensagemSucesso = '';
    this.mensagemErro = 'Informe uma descrição e uma gravidade entre 1 e 10.';
    return;
  }
  this.mensagemSucesso = 'Chamado criado com sucesso.';
  this.mensagemErro = '';

  this.chamados.push({
  descricao: descricao,
  gravidade: gravidade,
  status: 'aberto',
  criadoPor: this.usuarioLogado,
});

descricaoInput.value = '';
gravidadeInput.value = '';
}
  
removerChamado(chamado: Chamado) {
  const indice = this.chamados.indexOf(chamado);
  const chamadoRemovido = this.chamados.splice(indice, 1)[0];

  if (chamadoRemovido) {
  chamadoRemovido.excluidoPor = this.perfil;
  this.chamadosExcluidos.push(chamadoRemovido);
}
}
abrirHistorico() {
  this.telaChamados = 'historico';
}

voltarParaChamados() {
  this.telaChamados = 'lista';
}
recuperarChamado(chamado: Chamado) {
  const indice = this.chamadosExcluidos.indexOf(chamado);
  const chamadoRecuperado = this.chamadosExcluidos.splice(indice, 1)[0];

  if (chamadoRecuperado) {
    this.chamados.push(chamadoRecuperado);
  }
}

chamadosDoMorador() {
  return this.chamados.filter(
    (chamado) => chamado.criadoPor === this.usuarioLogado
  );
}
quantidadeAbertosDoMorador() {
  return this.chamadosDoMorador().filter(
    (chamado) => chamado.status === 'aberto'
  ).length;
}
historicoDoSindico() {
  return this.chamadosExcluidos.filter(
    (chamado) => chamado.excluidoPor === 'sindico'
  );
}
}