import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

const textToVerify = 'Неправильний формат email або номера телефону';

describe('Authorization with invalid email', () => {
    it('id:C576 - Authorization with invalid email', async () => {
        await homePage.clickLoginButton();

        await homePage.emailField.waitForDisplayed({ timeout: 20000 });
        await expect(homePage.emailField).toBeDisplayed();
        await homePage.emailField.setValue('testuser  rentzila@gmail.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
    
        await homePage.emailField.setValue('еуіегіуккутеяшдф');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
   
        await homePage.emailField.setValue('testuserrentzilagmail.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
   
        await homePage.emailField.setValue('testuserrentzila@gmailcom');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
    
        await homePage.emailField.setValue('testuserrentzila@gmail');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
    
        await homePage.emailField.setValue('testuserrentzila@.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
    
        await homePage.emailField.setValue('testuserrentzila');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
    
        await homePage.emailField.setValue('testuserrentzila@@gmail.com');

        await homePage.submitButton.click();
            
        await expect(homePage.popupWindow).toBeDisplayed();
        await expect(homePage.emailFieldErrorMessage).toHaveText(textToVerify)
    });
});