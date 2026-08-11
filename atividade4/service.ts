import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutosRepository } from './repository/produtos.repository';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
    constructor(
        private readonly produtosRepository: ProdutosRepository,
    ) {}

    // CREATE
    async criar(createDto: CreateProdutoDto): Promise<Produto> {
        const produto = await this.produtosRepository.criar(createDto);
        return produto;
    }

    // READ ALL
    async listarTodos(): Promise<Produto[]> {
        return this.produtosRepository.listarTodos();
    }

    // READ BY ID
    async buscarPorId(id: number): Promise<Produto> {
        const produto = await this.produtosRepository.buscarPorId(id);
        if (!produto) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }
        return produto;
    }

    // UPDATE
    async atualizar(
        id: number,
        updateDto: UpdateProdutoDto,
    ): Promise<Produto> {
        const existente = await this.produtosRepository.buscarPorId(id);
        if (!existente) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }

        const atualizado = await this.produtosRepository.atualizar(
            id,
            updateDto,
        );
        return atualizado;
    }

    // DELETE
    async deletar(id: number): Promise<void> {
        const existente = await this.produtosRepository.buscarPorId(id);
        if (!existente) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }

        const removido = await this.produtosRepository.deletar(id);
        if (!removido) {
            throw new NotFoundException(
                `Não foi possível remover o produto com ID ${id}`,
            );
        }
    }

    // FILTRO POR CATEGORIA
    async filtrarPorCategoria(categoria: string): Promise<Produto[]> {
        return this.produtosRepository.filtrarPorCategoria(categoria);
    }

    // FILTRO POR NOME
    async filtrarPorNome(nome: string): Promise<Produto[]> {
        return this.produtosRepository.filtrarPorNome(nome);
    }
}
