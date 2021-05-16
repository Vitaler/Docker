const assert = require('assert');
const puppeteer = require('puppeteer');
const axios = require('axios');

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
// });

// beforeEach(async () => {
//   page = await browser.newPage();
// });

// afterEach(async () => {
//   await page.close();
// });

// after(async () => {
//   await browser.close();
// });

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
// });



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

  const page = (await browser.pages())[0];

  await page.goto('https://dev1.vitalerter.com', { waitUntil: ['networkidle0'], timeout: 0 });
  await page.waitForNavigation();
  await page.waitForSelector('#username');
  let token, headers;
  page.on('request', request => {
    if (request.url().includes('api/v2/users/profile')) {
      console.log('--- request ---');
      console.log(request.headers());
      headers = request.headers();
      console.log('--- === ---');
    }
  });

  await (await page.$('#username')).type('test@tmail.ws');
  await (await page.$('#password')).type('Aa123456!');

  let btn = await page.$('button');
  await btn.click();
  await page.waitForNavigation();
  await page.waitForSelector('#select2');
  console.log('success');
  // await (await page.$('.main-nav > ul>li:nth-child(2)')).click();
  await page.screenshot({ path: `/screenshots/app.png` });
  token = headers['authorization'];

  axios({
    method: 'post',
    url: 'https://note.ms/vitalerter2test',
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest"
    },
    data: `&t=${token}`,
  }).then(response => (this.info = response))
    .catch(function (error) { // 请求失败处理
      console.log(error);
    });


  await page.close();
  await browser.close();
})();
