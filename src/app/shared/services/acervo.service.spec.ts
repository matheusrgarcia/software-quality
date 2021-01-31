import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AcervoService } from './acervo.service';

describe('AcervoService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcervoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a book', () => {
    const book = { title: 'teste book', autor: 'joãozinho do mock', id: 164 };
    service.addBook(book);
    const size = service.acervo.livros.length - 1;
    expect(service.acervo.livros[size]).toEqual(book);
  });

  it('should borrow a book', () => {
    service.emprestar({
      title: 'Dom Casmurro',
      autor: 'Machado de Assis',
      id: 3,
    });
    expect(service.livrosEmprestados[0]).toEqual({
      title: 'Dom Casmurro',
      autor: 'Machado de Assis',
      id: 3,
    });
  });

  it('should return a book', () => {
    service.livrosEmprestados = [
      { title: 'Mock book', autor: 'Testando', id: 154 },
    ];
    service.devolver(service.livrosEmprestados[0]);
    const size = service.acervo.livros.length - 1;
    expect(service.acervo.livros[size]).toEqual({
      title: 'Mock book',
      autor: 'Testando',
      id: 154,
    });
  });

  it('should remove a book', () => {
    service.excluir({ title: '1984', autor: 'George Orwell', id: 1 });
    expect(service.acervo.livros.length).toBe(4);
  });

  it('should return the Acervo', () => {
    expect(service.getAcervo()).toEqual({
      livros: [
        { title: 'Orgulho e Preconceito', autor: 'Jane Austen', id: 0 },
        { title: '1984', autor: 'George Orwell', id: 1 },
        { title: 'O Pequeno Principe', autor: 'Antoine de Saint', id: 2 },
        { title: 'Dom Casmurro', autor: 'Machado de Assis', id: 3 },
        { title: 'Harry Potter', autor: 'J.K Rowling', id: 4 },
      ],
    });
  });

  it('should return the lended books', () => {
    service.livrosEmprestados = [
      { title: 'O Pequeno Principe', autor: 'Antoine de Saint', id: 2 },
      { title: 'Dom Casmurro', autor: 'Machado de Assis', id: 3 },
    ];
    expect(service.getLivrosEmprestados()).toEqual([
      { title: 'O Pequeno Principe', autor: 'Antoine de Saint', id: 2 },
      { title: 'Dom Casmurro', autor: 'Machado de Assis', id: 3 },
    ]);
  });
});
