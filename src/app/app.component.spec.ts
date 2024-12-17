import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TabelaDinamicaComponent } from './components/tabela-dinamica/tabela-dinamica.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TabelaDinamicaComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
