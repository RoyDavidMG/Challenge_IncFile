//Challenge IncFile

import puppeteer from 'puppeteer';

(async () => {

//Open Chrome and open Trello 
  const browser = await puppeteer.launch(    { headless: false });
  const page = await browser.newPage();
  await page.goto('https://trello.com/b/QvHVksDa/personal-work-goals');
//save tasks from Trello
  const TaskList = await page.$$eval('.list-card-title', elements => elements.map(el => el.textContent));
  //console.log(TaskList);

  //Login into todoist.com
  const todoistTasks = await browser.newPage();
  await todoistTasks.goto('https://todoist.com/users/showlogin');
  await todoistTasks.type('input[type="email"]', 'roydavid_98@hotmail.com');
  await todoistTasks.type('input[type="password"]', 'roy1998d');
  await todoistTasks.click('button[type="submit"]');
  await todoistTasks.waitForNavigation();
  
//Go to projects
  await todoistTasks.goto('https://todoist.com/app/projects/active');
////Create new proyect
  await todoistTasks.evaluate(() => {
    const boton = document.querySelector('button._8313bd46.f169a390._5e45d59f._2a3b75a1._56a651f6');
    boton.click();
    console.log('In')
    });
  await todoistTasks.type('#edit_project_modal_field_name.form_field_control', 'Challenge');
  await todoistTasks.keyboard.press('Enter');

//create new task 
  await todoistTasks.click('button[class="plus_add_button"]');

  //add 5 task from todoistTasks
  for (let i = 0; i < 5 && i < TaskList.length; i++) {

    await todoistTasks.waitForSelector('p.is-empty.is-editor-empty');
    await todoistTasks.type('p.is-empty.is-editor-empty', TaskList[i]);
    await todoistTasks.keyboard.press('Enter');
    //console.log('in')
  }


  await browser.close();
})();