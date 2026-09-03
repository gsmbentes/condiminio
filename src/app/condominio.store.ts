import { Injectable } from '@angular/core';

export type Morador = {
  nome: string;
  bloco: string;
  apartamento: string;
  codigo: string;
};

export type Chamado = {
  id: number;
  descricao: string;
  gravidade: number;
  status: 'aberto' | 'resolvido';
  criadoPor: string;
  excluidoPor?: string;
  perfilCriador: string;
};

@Injectable({ providedIn: 'root' })
export class CondominioStore {
  readonly moradores: Morador[] = [];
  readonly chamados: Chamado[] = [
    { id: 1, descricao: 'Lâmpada quebrada', gravidade: 4, status: 'aberto', criadoPor: 'sindico@veritas.com', perfilCriador: 'sindico' },
    { id: 2, descricao: 'Vazamento de água', gravidade: 9, status: 'aberto', criadoPor: 'sindico@veritas.com', perfilCriador: 'sindico' },
    { id: 3, descricao: 'Portão quebrado', gravidade: 8, status: 'resolvido', criadoPor: 'sindico@veritas.com', perfilCriador: 'sindico' },
  ];
  readonly chamadosExcluidos: Chamado[] = [];
  private proximoCodigo = 1;
  private proximoChamadoId = 4;

  cadastrarMorador(nome: string, bloco: string, apartamento: string): Morador {
    const apartamentoJaCadastrado = this.moradores.some(
      (morador) =>
        morador.bloco.toLocaleLowerCase() === bloco.toLocaleLowerCase() &&
        morador.apartamento.toLocaleLowerCase() === apartamento.toLocaleLowerCase(),
    );

    if (apartamentoJaCadastrado) {
      throw new Error('Já existe um morador cadastrado neste bloco e apartamento.');
    }

    const codigo = `MOR-${String(this.proximoCodigo++).padStart(3, '0')}`;
    const morador = { nome, bloco, apartamento, codigo };
    this.moradores.push(morador);
    return morador;
  }

  codigoExiste(codigo: string): boolean {
    return this.moradores.some((morador) => morador.codigo === codigo.trim().toUpperCase());
  }

  removerMorador(morador: Morador): boolean {
    const indice = this.moradores.indexOf(morador);
    if (indice === -1) return false;

    this.moradores.splice(indice, 1);
    return true;
  }

  criarChamado(descricao: string, gravidade: number, criadoPor: string, perfilCriador: string): void {
    this.chamados.push({ id: this.proximoChamadoId++, descricao, gravidade, status: 'aberto', criadoPor, perfilCriador });
  }
}
