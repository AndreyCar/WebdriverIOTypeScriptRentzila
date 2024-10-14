import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

describe('Authorization with valid email and password', () => {
    it('id:C201 - Authorization with valid email and password', async () => {
        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await expect(await homePage.emailField.getValue()).toEqual(`${process.env.ADMIN_USERNAME}`);
    
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(await homePage.passwordField.getAttribute('type')).toEqual('password');
   
        await homePage.hiddenPasswordIcon.click();
        await expect(await homePage.passwordField.getValue()).toEqual(`${process.env.ADMIN_PASSWORD}`);
    
        await homePage.hiddenPasswordIcon.click();
        await expect(await homePage.passwordField.getAttribute('type')).toEqual('password');
    
        const randomAction = Math.random() < 0.5;

        if (randomAction) {
            await homePage.submitButton.click();
        } else {
            await homePage.passwordField.click();
            await browser.keys('Enter');
        }

        await homePage.userIcon.waitForDisplayed({ timeout: 10000 });
        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();
        await expect(await homePage.userDropdownMenuEmail.getText()).toEqual(`${process.env.ADMIN_USERNAME}`);
    
        await homePage.logoutDropdownMenu.click();

        await homePage.clickLoginButton();
        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await expect(await homePage.emailField.getValue()).toEqual(`${process.env.ADMIN_USERNAME}`);

        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);
        await expect(await homePage.passwordField.getAttribute('type')).toEqual('password');

        await homePage.hiddenPasswordIcon.click();
        await expect(await homePage.passwordField.getValue()).toEqual(`${process.env.ADMIN_PASSWORD}`);

        const randomAction1 = Math.random() < 0.5;

        if (randomAction1) {
            await homePage.submitButton.click();
        } else {
            await homePage.passwordField.click();
            await browser.keys('Enter');
        }

        await expect(homePage.popupWindow).not.toBeDisplayed();

        await homePage.userIcon.click();
        await expect(homePage.userDropdownMenu).toBeDisplayed();
        await expect(await homePage.userDropdownMenuEmail.getText()).toEqual(`${process.env.ADMIN_USERNAME}`);
    });
});