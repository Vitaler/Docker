const puppeteer = require('puppeteer');

// // const iPhone = puppeteer.devices['iPhone 6'];
// async function getVersion(url) {
//     const browser = await puppeteer.launch({
//         // headless: false, slowMo: 1000,
//         // defaultViewport: { width: 1280, height: 720 },
//         // devtools: true
//     });
//     const page = await browser.newPage();
//     // await page.emulate(iPhone);
//     await page.goto(url, { waitUntil: ['load'] });

//     await (await page.$('.ivu-tabs-nav > div:nth-child(3)')).click();

//     // await page.screenshot({
//     //     path: `${new Date().getTime()}.png`,
//     //     type: 'png',
//     //     fullPage: true //边滚动边截图
//     // });

//     let content = await page.$("body > div > div > div:nth-child(4) > div:nth-child(3)");
//     let version = await content.$eval('p:nth-child(1) > b', node => node.textContent);
//     console.log(version);
//     await browser.close();
//     return version;
// };

console.log('Package Test');

alert("Hello, World!");
