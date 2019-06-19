import { MaterialModule } from './material.module';

describe('MaterialModule', () => {
  let materialModule: MaterialModule;

  beforeEach(() => {
    materialModule = new MaterialModule();
  });

  xit('should create an instance', () => {
    expect(materialModule).toBeTruthy();
  });
});
