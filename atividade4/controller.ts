import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('api/produtos')
export class ProdutosController {
  constructor(
    private readonly produtosService: ProdutosService,
  ) {}

  // ============================================================
  // CREATE
  // POST /api/produtos
  // ============================================================
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criar(
    @Body() createDto: CreateProdutoDto,
  ) {
    const produto = await this.produtosService.criar(createDto);

    return {
      statusCode: HttpStatus.CREATED,
      mensagem: `Produto ${produto.nome} adicionado com sucesso`,
      id: produto.id,
      data: produto,
    };
  }


  // ============================================================
  // READ ALL
  // GET /api/produtos
  // ============================================================
  @Get()
  async listarTodos() {
    const produtos = await this.produtosService.listarTodos();

    return {
      statusCode: HttpStatus.OK,
      total: produtos.length,
      data: produtos,
    };
  }


  // ============================================================
  // FILTRO POR CATEGORIA
  // GET /api/produtos/filtrar/categoria/:categoria
  // ============================================================
  @Get('filtrar/categoria/:categoria')
  async filtrarPorCategoria(
    @Param('categoria') categoria: string,
  ) {
    const produtos =
      await this.produtosService.filtrarPorCategoria(categoria);

    return {
      statusCode: HttpStatus.OK,
      total: produtos.length,
      data: produtos,
    };
  }


  // ============================================================
  // FILTRO POR NOME
  // GET /api/produtos/filtrar/nome/:nome
  // ============================================================
  @Get('filtrar/nome/:nome')
  async filtrarPorNome(
    @Param('nome') nome: string,
  ) {
    const produtos =
      await this.produtosService.filtrarPorNome(nome);

    return {
      statusCode: HttpStatus.OK,
      total: produtos.length,
      data: produtos,
    };
  }


  // ============================================================
  // READ BY ID
  // GET /api/produtos/:id
  // ============================================================
  @Get(':id')
  async buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const produto =
      await this.produtosService.buscarPorId(id);

    return {
      statusCode: HttpStatus.OK,
      data: produto,
    };
  }


  // ============================================================
  // UPDATE
  // PUT /api/produtos/:id
  // ============================================================
  @Put(':id')
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProdutoDto,
  ) {
    const produto =
      await this.produtosService.atualizar(
        id,
        updateDto,
      );

    return {
      statusCode: HttpStatus.OK,
      mensagem: 'Produto atualizado com sucesso',
      data: produto,
    };
  }


  // ============================================================
  // DELETE
  // DELETE /api/produtos/:id
  // ============================================================
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.produtosService.deletar(id);

    return {
      statusCode: HttpStatus.OK,
      mensagem: `Produto ID ${id} removido com sucesso`,
    };
  }
}