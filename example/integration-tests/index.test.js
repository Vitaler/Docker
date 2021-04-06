// const assert = require('assert');
// const puppeteer = require('puppeteer');

// let browser;
// let page;

// before(async () => {
//   browser = await puppeteer.launch({
//     args: [
//       // Required for Docker version of Puppeteer
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       // This will write shared memory files into /tmp instead of /dev/shm,
//       // because Docker’s default for /dev/shm is 64MB
//       '--disable-dev-shm-usage'
//     ]
//   });

//   const browserVersion = await browser.version();
//   console.log(`Started ${browserVersion}`);
// })

// beforeEach(async () => {
//   page = await browser.newPage();
// })

// afterEach(async () => {
//   await page.close();
// })

// after(async () => {
//   await browser.close();
// })

// describe('App', () => {
//   it('renders', async () => {
//     const response = await page.goto('https://tools.shuax.com/chrome');
//     assert(response.ok());

//     await (await page.$('.ivu-tabs-nav > div:nth-child(3)')).click();

//     await page.screenshot({ path: `/screenshots/app.png` });

//     let content = await page.$("body > div > div > div:nth-child(4) > div:nth-child(3)");
//     let version = await content.$eval('p:nth-child(1) > b', node => node.textContent);
//     console.log(`version is ${version}`);
//   })
// })




const puppeteer = require('puppeteer');

(async () => {
  let browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage'
    ]
  });
  let page = await browser.newPage();
  await page.goto('https://tools.shuax.com/chrome');
  // await page.screenshot({ path: `/screenshots/${new Date().getTime()}.png` });
  await (await page.$('.ivu-tabs-nav > div:nth-child(3)')).click();

  await page.screenshot({ path: `/screenshots/app.png` });

  let content = await page.$("body > div > div > div:nth-child(4) > div:nth-child(3)");
  let version = await content.$eval('p:nth-child(1) > b', node => node.textContent);
  console.log(vewsion);
  browser.close();
})();
