import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

const textToVerify = 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли';

describe('Authorization with invalid password', () => {
    it('id:C577 - Authorization with invalid password', async () => {
        await homePage.clickLoginButton();

        await homePage.passwordField.waitForDisplayed({ timeout: 20000 });
        await homePage.passwordField.setValue('Testuser10  ');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(textToVerify);
    
        await homePage.passwordField.setValue(' Testuser10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(textToVerify);
    
        await homePage.passwordField.setValue('Testuser13');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.passwordFieldErrorMessage).not.toBeDisplayed();
    
        await homePage.passwordField.setValue('testuser10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(textToVerify);
    
        await homePage.passwordField.setValue('TESTUSER10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(textToVerify);
    
        await homePage.passwordField.setValue('Еуіегіук10');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(await homePage.passwordFieldErrorMessage.getText()).toEqual(textToVerify);
    });
});