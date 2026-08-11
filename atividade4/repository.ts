import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutosRepository {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  // CREATE
  async criar(data: Partial<Produto>): Promise<Produto> {
    const produto = this.produtoRepository.create(data);
    return await this.produtoRepository.save(produto);
  }

  // READ ALL
  async listarTodos(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      order: {
        nome: 'ASC',
      },
    });
  }

  // READ BY ID
  async buscarPorId(id: number): Promise<Produto | null> {
    return await this.produtoRepository.findOne({
      where: { id },
    });
  }

  // READ BY CATEGORIA
  async buscarPorCategoria(categoria: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        categoria: ILike(`%${categoria}%`),
      },
      order: {
        nome: 'ASC',
      },
    });
  }

  // UPDATE
  async atualizar(
    id: number,
    data: Partial<Produto>,
  ): Promise<Produto | null> {
    const result = await this.produtoRepository.update(id, data);

    if (result.affected === 0) {
      return null;
    }

    return await this.buscarPorId(id);
  }

  // DELETE
  async deletar(id: number): Promise<boolean> {
    const result = await this.produtoRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  // FILTRO POR CATEGORIA
  async filtrarPorCategoria(categoria: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        categoria: Like(`%${categoria}%`),
      },
      order: {
        nome: 'ASC',
      },
    });
  }

  // FILTRO POR NOME
  async filtrarPorNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
      order: {
        nome: 'ASC',
      },
    });
  }

  // CONTAR TOTAL
  async contar(): Promise<number> {
    return await this.produtoRepository.count();
  }
}