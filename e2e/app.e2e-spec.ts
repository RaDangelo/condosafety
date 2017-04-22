import { CondoSafetyPage } from './app.po';

describe('condosafety App', () => {
  let page: CondoSafetyPage;

  beforeEach(() => {
    page = new CondoSafetyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
