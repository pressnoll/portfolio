import {test,expect} from '@playwright/test';
test('contact form handles acceptance and failure without losing messages',async({page})=>{
 let accept=false;let requests=0;
 await page.route('https://formsubmit.co/ajax/**',async route=>{requests++;await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:accept?'true':'false'})});});
 await page.goto('/');
 await page.getByRole('button',{name:'Send message'}).click();expect(requests).toBe(0);
 await page.getByLabel('Your name',{exact:true}).fill('Test visitor');
 await page.getByLabel('Email address',{exact:true}).fill('visitor@example.com');
 await page.getByLabel('Your message',{exact:true}).fill('A test message about an AI project.');
 await page.getByRole('button',{name:'Send message'}).click();
 await expect(page.locator('#message-status')).toContainText('couldn’t confirm');
 await expect(page.getByLabel('Your message',{exact:true})).toHaveValue('A test message about an AI project.');
 accept=true;await page.getByRole('button',{name:'Send message'}).click();
 await expect(page.locator('#message-status')).toContainText('has been submitted');
 await expect(page.getByLabel('Your message',{exact:true})).toHaveValue('');
 await expect(page.getByRole('link',{name:'Message on WhatsApp'})).toHaveAttribute('href',/^https:\/\/wa.me\/2348129240412\?text=/);
 expect(await page.locator('body').innerText()).not.toContain('\u2014');
});
test('AI/ML positioning and motion run, pause and respect system preference',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
 await expect(page).toHaveTitle('Temple Gideon - AI/ML Engineer');
 await expect(page.locator('.hero-bottom>p')).toContainText('I build AI & ML systems.');
 await expect(page.getByRole('button',{name:'Pause animations'})).toBeVisible();
 await page.locator('.signal-panel').scrollIntoViewIfNeeded();
 await expect.poll(()=>page.locator('.travelling-signal').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('running');
 const before=await page.locator('.travelling-signal').first().evaluate(el=>getComputedStyle(el).strokeDashoffset);
 await expect.poll(()=>page.locator('.travelling-signal').first().evaluate(el=>getComputedStyle(el).strokeDashoffset)).not.toBe(before);
 await page.locator('.convert-art').scrollIntoViewIfNeeded();
 await expect(page.locator('.audio-equalizer i')).toHaveCount(13);
 await expect.poll(()=>page.locator('.audio-equalizer i').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('running');
 await expect.poll(()=>page.locator('.reading-progress').evaluate(el=>Number(el.style.getPropertyValue('--read')))).toBeGreaterThan(0);
 await page.locator('.journey-list li').last().scrollIntoViewIfNeeded();
 await expect.poll(()=>page.locator('.journey-list').evaluate(el=>Number(el.style.getPropertyValue('--journey-progress')))).toBeGreaterThan(0);
 await page.getByRole('button',{name:'Pause animations'}).click();
 await expect(page.locator('.reading-progress')).toBeHidden();
 await expect.poll(()=>page.locator('.audio-equalizer i').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 await expect.poll(()=>page.locator('.asterisk').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 await page.reload();await expect(page.getByRole('button',{name:'Enable animations'})).toBeVisible();
 await page.getByRole('button',{name:'Enable animations'}).click();
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.getByRole('button',{name:'Motion disabled by system preference'})).toBeDisabled();
 await expect.poll(()=>page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
});
test('homepage and project stories render at desktop and mobile widths',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('.project')).toHaveCount(4);
  await expect(page.locator('.notebook')).toHaveCount(3);
  await expect(page.getByText('Completed internship · January 2026')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('.about-photo img').scrollIntoViewIfNeeded();
  await expect.poll(()=>page.locator('.about-photo img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  if(width===1440||width===390)await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true});
 }
 for(const id of ['jai','neurofocus','grainguard','jconvert','jenom']){
  await page.goto(`/case-study.html?project=${id}`);await expect(page.locator('h1')).toBeVisible();await expect(page.getByRole('heading',{name:id==='grainguard'?'From detection to decisions':'Current scope'})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/case-study.html?project=unknown');await expect(page.getByRole('heading',{name:'Project not found.'})).toBeVisible();expect(errors).toEqual([]);
});
test('keyboard access, copy feedback and reduced motion',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByText('Skip to content')).toBeFocused();
 await page.getByRole('button',{name:'Copy email'}).click();await expect(page.locator('#copy-status')).toHaveText('Email copied.');expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('templegideon001@gmail.com');
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
 await page.getByRole('link',{name:'Explore Jconvert',exact:false}).click();await expect(page).toHaveURL(/project=jconvert/);await expect(page.locator('h1')).toHaveText('Jconvert');
});
