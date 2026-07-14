import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoManagementDialog } from './endereco-management-dialog';

describe('EnderecoManagementDialog', () => {
  let component: EnderecoManagementDialog;
  let fixture: ComponentFixture<EnderecoManagementDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoManagementDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EnderecoManagementDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
