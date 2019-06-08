import { ButtonsModule } from './buttons.module';

describe('ButtonsModule', () => {
  let buttonsModule: ButtonsModule;

  beforeEach(() => {
    buttonsModule = new ButtonsModule();
  });

  xit('should create an instance', () => {
    expect(buttonsModule).toBeTruthy();
  });
});
