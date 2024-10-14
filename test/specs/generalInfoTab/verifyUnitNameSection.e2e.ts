import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('Verify unit name section', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C297 - Verify unit name section', async () => {
        await expect(profilePage.unitNameText).toBeDisplayedInViewport();
        await expect(await profilePage.unitNameText.getText()).toMatch(/Назва оголошення \*/);
        await expect(profilePage.unitNameInputField).toHaveAttr('placeholder', /Введіть назву оголошення/);

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
   
        await profilePage.unitNameInputField.setValue(`${Math.floor(Math.random() * 1000000000)}`);

        await expect(profilePage.unitNameInputField).toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(/У назві оголошення повинно бути не менше 10 символів/);
   
        const longString = 'a'.repeat(101);

        await profilePage.unitNameInputField.clearValue();
        await profilePage.unitNameInputField.setValue(longString);

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttribute('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(/У назві оголошення може бути не більше 100 символів/);

        await profilePage.unitNameInputField.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, longString);

        await profilePage.unitNameInputField.click();
        await browser.keys(['Control', 'v']); 

        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).toHaveAttribute('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).toBeDisplayed();
        await expect(profilePage.unitNameInputFieldErrorMessage).toHaveText(/У назві оголошення може бути не більше 100 символів/);
    
        const specialSymbols = '<>{};^';
    
        await profilePage.unitNameInputField.clearValue();
    
        await profilePage.unitNameInputField.setValue(specialSymbols);
    
        const fieldValueAfterTyping = await profilePage.unitNameInputField.getValue();
        expect(fieldValueAfterTyping).not.toContain(specialSymbols); 
    
        await profilePage.unitNameInputField.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, specialSymbols);

        await profilePage.unitNameInputField.click(); 
        await browser.keys(['Control', 'v']); 
    
        const fieldValueAfterPasting = await profilePage.unitNameInputField.getValue();
        expect(fieldValueAfterPasting).not.toContain(specialSymbols); 
    
        const validInput = 'abcdefghij';
    
        await profilePage.unitNameInputField.clearValue();
    
        await profilePage.unitNameInputField.setValue(validInput);
    
        await profilePage.nextButton.click();

        await expect(profilePage.unitNameInputField).not.toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).not.toBeDisplayed();
    
        await profilePage.unitNameInputField.clearValue();
    
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, validInput);
    
        await profilePage.unitNameInputField.click(); 
        await browser.keys(['Control', 'v']); 
    
        await profilePage.nextButton.click();
    
        await expect(profilePage.unitNameInputField).not.toHaveAttr('class', /inputError/);
        await expect(profilePage.unitNameInputFieldErrorMessage).not.toBeDisplayed();
    });    
});