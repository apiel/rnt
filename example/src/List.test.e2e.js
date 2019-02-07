const rnt = require('render-and-test');
const puppeteer = require('puppeteer');

describe('Item test', () => {
    it('should', () => {});
    // rnt.run(() => {
    //     beforeAll(async () => {
    //         const dataUrls = [{
    //             pathUrl: `/`,
    //             data: null,
    //         }];
    //         await rnt.loadUrls(dataUrls);
    //     }, 300000);
    // }, ({ baseUrl, pathUrl, data }) => {
    //     let page;
    //     let browser;
    //     beforeAll(async () => {
    //         browser = await puppeteer.launch();
    //         page = await browser.newPage();
    //         await page.goto(`${baseUrl}${pathUrl}`);
    //         rnt.setPage(page);
    //     });
    //     afterAll(async () => {
    //         await browser.close();
    //     })
    //     it('should success', async () => {
    //         // const text = await page.evaluate(() => document.body.textContent);
    //         // expect(text).toContain(data.name);
    //     });
    // });
});
