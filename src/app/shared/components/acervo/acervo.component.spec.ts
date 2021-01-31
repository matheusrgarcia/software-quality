import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { AcervoService } from '../../services/acervo.service';
import { AcervoComponent } from './acervo.component';

describe('AcervoComponent', () => {
  let component: AcervoComponent;
  let fixture: ComponentFixture<AcervoComponent>;
  let acervoServiceStub;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    acervoServiceStub = jasmine.createSpyObj('AcervoService', [
      'getAcervo',
      'getLivrosEmprestados',
      'addBook',
      'excluir',
      'emprestar',
      'devolver',
    ]);
    acervoServiceStub.getAcervo.and.returnValue(
      of({
        livros: [
          { title: 'Orgulho e Preconceito', autor: 'Jane Austen', id: 0 },
          { title: '1984', autor: 'George Orwell', id: 1 },
          { title: 'O Pequeno Principe', autor: 'Antoine de Saint', id: 2 },
          { title: 'Dom Casmurro', autor: 'Machado de Assis', id: 3 },
          { title: 'Harry Potter', autor: 'J.K Rowling', id: 4 },
        ],
      })
    );
    acervoServiceStub.getLivrosEmprestados.and.returnValue([
      { title: 'Jack Black', autor: 'Jack Jhonson Black', id: 152 },
    ]);
    await TestBed.configureTestingModule({
      declarations: [AcervoComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      providers: [
        {
          provide: AcervoService,
          useValue: acervoServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcervoComponent);
    component = fixture.componentInstance;
    component.acervoForm = formBuilder.group({
      title: new FormControl('Teste title'),
      autor: new FormControl('Teste autor'),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset selections', () => {
    component.resetSelection();
    fixture.detectChanges();
    expect(component.selectedLivro).toBeFalsy();
    expect(component.selectedLivroEmprestado).toBeFalsy();
  });

  it('should submit when onSubmit is invoked and form is valid', () => {
    component.acervoForm.controls.title.setValue('Book title');
    component.acervoForm.controls.autor.setValue('Book Autor');

    component.onSubmit();
    fixture.detectChanges();

    expect(acervoServiceStub.addBook).toHaveBeenCalledOnceWith({
      title: 'Book title',
      autor: 'Book Autor',
    });
  });

  it('should not submit when onSubmit is invoked and form is invalid', () => {
    for (const control in component.acervoForm.controls) {
      if (control) {
        component.acervoForm.controls[control].setErrors(Validators.nullValidator);
      }
    }
    fixture.detectChanges();
    component.onSubmit();

    expect(acervoServiceStub.addBook).not.toHaveBeenCalled();
  });

  it('Should validate form methods', () => {
    component.acervoForm.reset();
    component.acervoForm.markAsUntouched();
    expect(component.acervoForm.dirty).toBeFalsy();
    expect(component.acervoForm.touched).toBeFalsy();
  });

  it('should select a book that is borrowed', () => {
    component.selectLivroEmprestado({
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    });
    expect(component.selectedLivroEmprestado).toEqual({
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    });
  });

  it('should select a book', () => {
    component.selectLivroFromAcervo({
      title: 'Harry Potter',
      autor: 'J.K Rowling',
      id: 4,
    });
    expect(component.selectedLivro).toEqual({
      title: 'Harry Potter',
      autor: 'J.K Rowling',
      id: 4,
    });
  });

  it('should delete a book', () => {
    component.selectedLivro = {
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    };
    fixture.detectChanges();
    component.excluirLivro();

    expect(acervoServiceStub.excluir).toHaveBeenCalledOnceWith({
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    });
  });

  it('should not delete a book', () => {
    component.selectedLivro = null;
    fixture.detectChanges();
    component.excluirLivro();

    expect(acervoServiceStub.excluir).not.toHaveBeenCalled();
  });

  it('should return a book', () => {
    component.selectedLivroEmprestado = {
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    };
    fixture.detectChanges();
    component.devolverLivro();

    expect(acervoServiceStub.devolver).toHaveBeenCalledOnceWith({
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    });
  });

  it('should not return a book', () => {
    component.selectedLivroEmprestado = null;
    fixture.detectChanges();
    component.devolverLivro();

    expect(acervoServiceStub.devolver).not.toHaveBeenCalled();
  });

  it('should lend a book', () => {
    component.selectedLivro = {
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    };
    fixture.detectChanges();
    component.emprestarLivro();

    expect(acervoServiceStub.emprestar).toHaveBeenCalledOnceWith({
      title: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      id: 0,
    });
  });

  it('should not lend a book', () => {
    component.selectedLivro = null;
    fixture.detectChanges();
    component.emprestarLivro();

    expect(acervoServiceStub.emprestar).not.toHaveBeenCalled();
  });
});
