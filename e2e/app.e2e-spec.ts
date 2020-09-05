import { LWMRequirementsManagementToolPage } from './app.po';

describe('lwmrequirements-management-tool App', () => {
  let page: LWMRequirementsManagementToolPage;

  beforeEach(() => {
    page = new LWMRequirementsManagementToolPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
