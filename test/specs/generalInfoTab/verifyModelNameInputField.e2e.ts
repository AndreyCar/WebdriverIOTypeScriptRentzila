import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('Verify model name input field', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C299 - Verify model name input field', async () => {
        await expect(profilePage.modalNameInputTitle).toBeDisplayedInViewport();
        await expect(profilePage.modalNameInputTitle).toHaveText(/Назва моделі/);
        await expect(profilePage.modalNameInput).toHaveAttr('placeholder', /Введіть назву моделі/);
        await expect(profilePage.modalNameInput).toBeDisplayed();
   
        const longInput = '1234567890123456'; 
        const spaceInsideInput = '1234567890 12345'; 
        const spaceAfterInput = '123456789012345 '; 
    
        const testInputs = [longInput, spaceInsideInput, spaceAfterInput];
    
        for (const input of testInputs) {
            await profilePage.modalNameInput.clearValue();
            await profilePage.modalNameInput.setValue(input);
    
            await expect(profilePage.modalNameInput).toHaveAttr('class', /inputError/);
            await expect(profilePage.modalNameInputErrorMessage).toHaveText(/У назві моделі може бути не більше 15 символів/);
    
            await profilePage.modalNameInput.clearValue();
    
            await browser.execute((text) => {
                navigator.clipboard.writeText(text);
            }, input);
    
            await profilePage.modalNameInput.click();
            await browser.keys(['Control', 'v']); 
    
            await expect(profilePage.modalNameInput).toHaveAttr('class', /inputError/);
            await expect(profilePage.modalNameInputErrorMessage).toHaveText(/У назві моделі може бути не більше 15 символів/);
        }
    
        await profilePage.modalNameInput.clearValue();

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');
    
        await profilePage.modalNameInput.clearValue();
        await profilePage.modalNameInput.setValue('<>{};^');

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');
        
        await profilePage.modalNameInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, '<>{};^');

        await profilePage.modalNameInput.click();
        await browser.keys(['Control', 'v']); 

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');

        await profilePage.modalNameInput.clearValue();
        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, '');

        await profilePage.modalNameInput.click();
        await browser.keys(['Control', 'v']); 

        await expect(await profilePage.modalNameInput.getValue()).toEqual('');
    
        const validInput = '012345678901234'; 

        await profilePage.modalNameInput.clearValue();
        await profilePage.modalNameInput.setValue(validInput);

        await expect(profilePage.modalNameInput).not.toHaveAttr('class', /inputError/); 
        await expect(profilePage.modalNameInputErrorMessage).not.toBeDisplayed(); 

        const inputValue = await profilePage.modalNameInput.getValue();
        expect(inputValue).toEqual(validInput);
    });
});