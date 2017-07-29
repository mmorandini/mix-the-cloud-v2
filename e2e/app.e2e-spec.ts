import { MiixTheCloudPage } from './app.po';

describe('miix-the-cloud App', () => {
  let page: MiixTheCloudPage;

  beforeEach(() => {
    page = new MiixTheCloudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
