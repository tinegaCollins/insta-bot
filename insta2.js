const puppeteer = require("puppeteer");
const targetusernames = require("./targetusernames");
const accounts = require("./accounts");
const passwords = require("./passwords");
const comments = require("./comments");
var counter = 0;
let usernamescounter = 0;
const loginusernames = accounts.loginusernames;
var cmnt1 = comments.comment[0];
var cmnt2 = comments.comment[1];
var cmnt3 = comments.comment[2];
var comment1 = String(cmnt1);
var comment2 = String(cmnt2);
var comment3 = String(cmnt3);
let commentsArr = [comment1,comment2, comment3];
var str1 = "https://www.instagram.com/";
var linkcounter = 0;
(async () => {
  while (usernamescounter < loginusernames.length) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(20000);
    try {
      await page.goto(
        "https://www.instagram.com/accounts/login/?source=auth_switcher"
      );
      await page.waitForSelector('input[name="username"]');
      await page.type(
        'input[name="username"]',
        loginusernames[usernamescounter]
      );
      await page.type('input[name="password"]', passwords.password);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
    } catch (e) {
      usernamescounter++;
      console.log("username or password are not valid");
      await browser.close();
      continue;
    }
    j = 0;
    while( j < 3 ){
      try {
        await page.goto(str1.concat(targetusernames.usernames[linkcounter]));
        let post;
        try {
          await page.waitForSelector("._aagw", { timeout: 10000 });
          post = await page.$("._aagw");
        } catch (error) {
          await page.waitForSelector("._9AhH0", { timeout: 10000 });
          post = await page.$("._9AhH0");
        }
  
        if (post) {
          await post.click();
          await page.waitForSelector("textarea");
          let randomnumber = Math.floor(Math.random() * 3);
          await page.type("textarea", commentsArr[randomnumber]);
          await page.click('button[type="submit"]');
          await page.waitForTimeout(10000);
          j++;
          counter ++;
          linkcounter++;
          console.log(loginusernames[usernamescounter]);
          console.log(str1.concat(targetusernames.usernames[linkcounter]));
          console.log(counter);
        } else {
          linkcounter++
          console.log("No Post");
          continue;
        }

      } catch (e) {
        linkcounter++
        console.log("No Post");
        continue;
      };
    }
    usernamescounter++;
    await browser.close();
  }
})();
