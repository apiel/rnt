const rnt = require('render-and-test');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

describe('Item test', () => {
    rnt.run(() => {
        // jest.setTimeout(300000);
        beforeAll(async () => {
            const response = await fetch('http://localhost:2000/');
            const json = await response.json();
            const dataUrls = json.map((data, index) => ({
                pathUrl: `/item/${index}.html`,
                data,
            }));
            await rnt.loadUrls(dataUrls);
        }, 300000);
    }, ({ baseUrl, pathUrl, data }) => {
        let page;
        let browser;
        beforeAll(async () => {
            browser = await puppeteer.launch();
            page = await browser.newPage();
            await page.goto(`${baseUrl}${pathUrl}`);
            rnt.page(page);
        });
        afterAll(async () => {
            await browser.close();
        })
        it('should success', async () => {
            const text = await page.evaluate(() => document.body.textContent);
            expect(text).toContain(data.name);
        });
    });
});
