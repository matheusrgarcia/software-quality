import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AcervoComponent } from './acervo.component';

describe('AcervoComponent', () => {
  let component: AcervoComponent;
  let fixture: ComponentFixture<AcervoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcervoComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcervoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
