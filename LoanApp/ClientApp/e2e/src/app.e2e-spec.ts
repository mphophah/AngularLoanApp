
import { AppPage } from './app.po';

describe('QuickApp-PRO App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display application title: QuickApp Pro', async () => {
    await page.navigateTo();
    expect(await page.getAppTitle()).toEqual('QuickApp Pro');
  });
});
