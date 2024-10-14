import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('Authorization with valid phone and password', () => {
    it('id:C202 - Authorization with valid phone and password', async () => {
        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(homePage.emailField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);
    
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(homePage.passwordField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);
    
        await homePage.submitButton.click();
        await expect(homePage.popupWindow).not.toBeDisplayed();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
   
        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();
   
        await homePage.goToProfileDropdownMenu.click();
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/owner-cabinet/');

        await expect((await profilePage.phoneNumberField.getValue()).replace(/\s/g, '')).toEqual(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(profilePage.phoneNumberField).toHaveAttr('class', /OwnerProfileNumber_inputVerification/);
    
        await homePage.userIcon.click();
        await profilePage.logoutDropdownMenu.click();
        
        await homePage.loginButton.waitForDisplayed({ timeout: 20000 });
        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(homePage.emailField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);

        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(homePage.passwordField).not.toHaveAttr('class', /CustomReactHookInput_error_input/);

        await homePage.submitButton.click();
        await expect(homePage.popupWindow).not.toBeDisplayed();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);

        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();

        await homePage.goToProfileDropdownMenu.click();
        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/owner-cabinet/');

        await expect((await profilePage.phoneNumberField.getValue()).replace(/\s/g, '')).toEqual(`${process.env.ADMIN_PHONE_NUMBER}`);
        await expect(profilePage.phoneNumberField).toHaveAttr('class', /OwnerProfileNumber_inputVerification/);
    });
});