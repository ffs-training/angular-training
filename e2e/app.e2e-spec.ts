import { AngularComponentPage } from './app.po';

describe('angular-component App', () => {
  let page: AngularComponentPage;

  beforeEach(() => {
    page = new AngularComponentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
