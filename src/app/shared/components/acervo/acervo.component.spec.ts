import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AcervoComponent } from './acervo.component';

describe('AcervoComponent', () => {
  let component: AcervoComponent;
  let fixture: ComponentFixture<AcervoComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcervoComponent],
      imports: [FormsModule, ReactiveFormsModule],
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
});
