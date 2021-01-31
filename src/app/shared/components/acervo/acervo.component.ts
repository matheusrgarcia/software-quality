import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AcervoService } from '../../services/acervo.service';
import { Livro } from '../../services/interfaces';

@Component({
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.scss'],
})
export class AcervoComponent implements OnInit {
  public acervoForm: FormGroup;
  public livros: Livro[];
  public livrosEmprestados: Livro[];
  public selectedLivroEmprestado: Livro;
  public selectedLivro: Livro;

  constructor(
    private formBuilder: FormBuilder,
    private acervoService: AcervoService
  ) {
    this.acervoForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
    });
  }

  public ngOnInit(): void {
    this.livros = this.acervoService.getAcervo().livros;
    this.livrosEmprestados = this.acervoService.getLivrosEmprestados();
  }

  public resetSelection(): void {
    this.selectedLivro = null;
    this.selectedLivroEmprestado = null;
  }

  public onSubmit(): void {
    if (this.acervoForm.valid) {
      this.acervoService.addBook(this.acervoForm.value);
      this.acervoForm.reset();
      this.acervoForm.markAsUntouched();
    }
  }
  public excluirLivro(): void {
    if (this.selectedLivro) {
      this.acervoService.excluir(this.selectedLivro[0]);
      this.resetSelection();
    }
  }

  public devolverLivro(): void {
    if (this.selectedLivroEmprestado) {
      this.acervoService.devolver(this.selectedLivroEmprestado[0]);
      this.resetSelection();
    }
  }

  public emprestarLivro(): void {
    if (this.selectedLivro) {
      this.acervoService.emprestar(this.selectedLivro[0]);
      this.resetSelection();
    }
  }
}
