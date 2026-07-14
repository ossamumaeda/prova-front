import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoCard } from './endereco-card';

describe('EnderecoCard', () => {
  let component: EnderecoCard;
  let fixture: ComponentFixture<EnderecoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EnderecoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
