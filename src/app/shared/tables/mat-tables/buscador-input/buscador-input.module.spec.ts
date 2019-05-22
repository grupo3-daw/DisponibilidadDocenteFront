import { BuscadorInputModule } from './buscador-input.module';

describe('BuscadorInputModule', () => {
  let buscadorInputModule: BuscadorInputModule;

  beforeEach(() => {
    buscadorInputModule = new BuscadorInputModule();
  });

  it('should create an instance', () => {
    expect(buscadorInputModule).toBeTruthy();
  });
});
