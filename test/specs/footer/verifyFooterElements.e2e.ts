import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import privacyPolicyPage from '../../pageobjects/privacyPolicy.page';
import cookiePolicyPage from '../../pageobjects/cookiePolicy.page';
import termsConditionsPage from '../../pageobjects/termsConditions.page';
import advertsPage from '../../pageobjects/adverts.page';
import tendersPage from '../../pageobjects/tenders.page';

describe('Verify that all elements on the footer are displayed and all links are clickable', () => {
    it('id:C214 - Verify that all elements on the footer are displayed and all links are clickable', async () => {
        await homePage.scrollToFooter();
        await expect(await homePage.isFooterDisplayed()).toBe(true);
        await expect(await homePage.rentzilaFooterLogo.isClickable()).toBe(false);
   
        await expect(await homePage.aboutUsLable.isDisplayed()).toBe(true);
   
        await expect(await homePage.privacyPolicy.isDisplayed()).toBe(true);
    
        await expect(await homePage.cookiePolicy.isDisplayed()).toBe(true);
    
        await expect(await homePage.termsConditions.isDisplayed()).toBe(true);
   
        await expect(await homePage.forBuyers.isDisplayed()).toBe(true);
    
        await expect(await homePage.productsLink.isDisplayed()).toBe(true);
    
        await expect(await homePage.tendersMap.isDisplayed()).toBe(true);
    
        await expect(await homePage.contacts.isDisplayed()).toBe(true);
    
        await expect(await homePage.rentzilaFooterLogo.isDisplayed()).toBe(true);
   
        await expect(await homePage.copyright.isDisplayed()).toBe(true);
    
        await homePage.privacyPolicy.click();
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/privacy-policy/');

        await expect(privacyPolicyPage.title).toBeDisplayedInViewport();
        await expect(privacyPolicyPage.title).toHaveText('Політика конфіденційності');
    
        await privacyPolicyPage.scrollToFooter();
        await privacyPolicyPage.cookiePolicy.click();
        
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/cookie-policy/');

        await expect(cookiePolicyPage.title).toBeDisplayedInViewport();
        await expect(cookiePolicyPage.title).toHaveText('Політика використання файлів cookie');
    
        await cookiePolicyPage.scrollToFooter();
        await cookiePolicyPage.termsConditions.click();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/terms-conditions/');

        await expect(termsConditionsPage.title).toBeDisplayedInViewport();
        await expect(termsConditionsPage.title).toHaveText('Угода користувача');
   
        await termsConditionsPage.scrollToFooter();
        await termsConditionsPage.productsLink.click();
        
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/products/');

        await expect(advertsPage.searchInput).toBeDisplayedInViewport();
        await expect(advertsPage.searchInput).toHaveAttribute('placeholder', 'Пошук оголошень або послуг');
    
        await advertsPage.clickNavbarLogo();

        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://dev.rentzila.com.ua/',
            {
                timeout: 20000, 
                timeoutMsg: 'Expected URL to be https://dev.rentzila.com.ua/ after 20 seconds',
            }
        );
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');


        await expect(homePage.header).toBeDisplayedInViewport();
        await expect(homePage.header).toHaveText('Сервіс пошуку послуг спецтехніки');
    
        await homePage.scrollToFooter();
        await homePage.tendersMap.click();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/tenders-map/');

        await expect(tendersPage.searchInput).toBeDisplayedInViewport();
        await expect(tendersPage.searchInput).toHaveAttribute('placeholder', 'Пошук тендера за ключовими словами');
    
        await tendersPage.rentzilaLogo.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://dev.rentzila.com.ua/',
            {
                timeout: 20000, 
                timeoutMsg: 'Expected URL to be https://dev.rentzila.com.ua/ after 20 seconds',
            }
        );
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');
    
        expect(await homePage.infoEmail.getAttribute('href')).toBe('mailto:info@rentzila.com.ua');
    });
});