export interface Livro {
  title: string;
  autor: string;
  id: number;
}

export interface Acervo {
  livros: Livro[];
}
