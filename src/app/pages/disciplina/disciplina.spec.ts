import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Disciplina } from './disciplina';

describe('Disciplina', () => {
  let component: Disciplina;
  let fixture: ComponentFixture<Disciplina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Disciplina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Disciplina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
