import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoForm } from './endereco-form';

describe('EnderecoForm', () => {
  let component: EnderecoForm;
  let fixture: ComponentFixture<EnderecoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EnderecoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
