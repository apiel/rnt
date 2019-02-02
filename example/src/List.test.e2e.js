describe('List test', () => {
    it('should do something in list', () => {

    });
});

// // import fetch from 'node-fetch';
// const fetch = require('node-fetch');

// let data = [];

// const loadData = async () => {
//     const response = await fetch('http://localhost:2000/');
//     data = await response.json();
// }
// // create a script looping through e2e files
// // find load data function
// // then call jest using env variable to pass params

// describe('Item', () => {
//     beforeAll(async () => {
//         await loadData();
//     });

//     // it('hello', () => {});

//     // data.forEach((item, index) => {
//     for(let index = 0; index < 100; index++) {
//         testIndex(index);
//     }
//     // });
// });

// function testIndex(index) {
//     describe(`Item at index ${index}`, () => {
//         beforeAll(async () => {
//             await page.goto(`http://localhost:3000/item/${index}`);
//         });

//         it('should display name text on page', async () => {
//             const item = data[index];
//             await expect(page).toMatch(item.name);
//         });
//     });
// }
