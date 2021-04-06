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
  await page.goto('https://cn.vitalerter.com', { waitUntil: ['load'] });
  await (await page.$('#UserName')).type('qatestingcn');
  await (await page.$('#Password')).type('123');
  await page.screenshot({ path: `/screenshots/app1.png` });
  let btn = await page.$('#signIn');
  await btn.click();
  await page.waitForNavigation();

  await page.screenshot({ path: `/screenshots/app2.png` });

  await (await page.$('#residents-tab')).click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `/screenshots/app3.png` });
  await (await page.$('.flaticon-hr')).click();
  let options = await page.$$('.checkmark');
  await options[3].click();
  let rz = await page.$('.rz-pointer-min');
  let position = await rz.boundingBox();
  await page.screenshot({ path: `/screenshots/app4.png` });

  await page.mouse.move(position.x, position.y);
  await page.mouse.down();
  await page.mouse.move(position.x + 15, position.y);
  await page.waitForTimeout(2000);
  await page.mouse.move(position.x - 35, position.y);
  await page.mouse.up();

  await page.screenshot({ path: `/screenshots/app5.png` });
  await rz.click();
  for (let i = 0; i < ' World'.length; i++)
    await page.keyboard.press('ArrowLeft');
  await page.screenshot({ path: `/screenshots/app6.png` });
  await browser.close();
})();
