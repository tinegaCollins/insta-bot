const puppeteer = require('puppeteer');
const targetusernames = require('./targetusernames') ;  
const accounts = require('./accounts') ;  
const passwords = require('./passwords') ; 
const comments = require('./comments') ;  
var counter = 0;
var usernamescounter = 0;
var linkcounter= 0;
const loginusernames = accounts.loginusernames;
var cmnt1 = comments.comment[0];
var cmnt2 = comments.comment[1];
var cmnt3 = comments.comment[2];
var comment1 = String(cmnt1);
var comment2 = String(cmnt2);
var comment3 = String(cmnt3);
var str1 = "https://www.instagram.com/";
(async () => { 
  while (counter < 1000000 ) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(20000); 
  try {
  await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', loginusernames[usernamescounter]);
  await page.type('input[name="password"]', passwords.password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation(); 
   } catch (e) {
    console.error(e);
   }
   try{
      try {
        await page.goto(str1.concat(targetusernames.usernames[linkcounter]));
        await Promise.all([
          await page.click('._9AhH0')
        ]);
        await page.waitForSelector('textarea');
        await page.type('textarea', comment1);
        await page.click('button[type="submit"]');
        await page.waitForTimeout(10000);
        console.log(loginusernames[usernamescounter])
        console.log(str1.concat(targetusernames.usernames[linkcounter]))
      } catch (e) {
        console.error(e);
      } 
      linkcounter++;
  
    try {
      await page.goto(str1.concat(targetusernames.usernames[linkcounter]));
      await Promise.all([
      await page.click('._9AhH0')
    ]);
    await page.waitForSelector('textarea');
    await page.type('textarea', comment2);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(10000);
    console.log(loginusernames[usernamescounter])
    console.log(str1.concat(targetusernames.usernames[linkcounter]))
  } catch (e) {
    console.error(e);
  } 
    linkcounter++;
  
  try {
    await page.goto(str1.concat(targetusernames.usernames[linkcounter]));
    await Promise.all([
      await page.click('._9AhH0')
    ]);
    await page.waitForSelector('textarea');
    await page.type('textarea', comment3);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(10000);
    console.log(loginusernames[usernamescounter])
    console.log(str1.concat(targetusernames.usernames[linkcounter]))
  } catch (e) {
    console.error(e);
  } 
   }
   catch(e){
    console.error(e);
   }
  usernamescounter++;  
  await browser.close();
  }
})();

