import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoFormDialog } from './endereco-form-dialog';

describe('EnderecoFormDialog', () => {
  let component: EnderecoFormDialog;
  let fixture: ComponentFixture<EnderecoFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EnderecoFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
