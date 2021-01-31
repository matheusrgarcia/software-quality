import { Injectable } from '@angular/core';

import { Acervo, Livro } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AcervoService {
  public acervo: Acervo = {
    livros: [
      { title: 'Orgulho e Preconceito', autor: 'Jane Austen', id: 0 },
      { title: '1984', autor: 'George Orwell', id: 1 },
      { title: 'O Pequeno Principe', autor: 'Antoine de Saint', id: 2 },
      { title: 'Dom Casmurro', autor: 'Machado de Assis', id: 3 },
      { title: 'Harry Potter', autor: 'J.K Rowling', id: 4 },
    ],
  };

  public livrosEmprestados: Livro[] = [];

  constructor() {}

  public getAcervo(): Acervo {
    return this.acervo;
  }

  public getLivrosEmprestados(): Livro[] {
    return this.livrosEmprestados;
  }

  public addBook(livro: Livro): void {
    this.acervo.livros.push(livro);
  }

  public excluir(livro: Livro): void {
    const index = this.acervo.livros.indexOf(livro);
    this.acervo.livros.splice(index, 1);
  }

  public emprestar(livro: Livro): void {
    const index = this.acervo.livros.indexOf(livro);
    this.acervo.livros.splice(index, 1);
    this.livrosEmprestados.push(livro);
  }

  public devolver(livro: Livro): void {
    const index = this.livrosEmprestados.indexOf(livro);
    this.livrosEmprestados.splice(index, 1);
    this.acervo.livros.push(livro);
  }
}
