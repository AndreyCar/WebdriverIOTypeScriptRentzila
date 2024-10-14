import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';

const validPhoneNumber = `${process.env.ADMIN_PASSWORD}`;

const invalidPhoneNumbers = [
    validPhoneNumber.replace('+380', ''),             
    validPhoneNumber.slice(0, -1),                    
    validPhoneNumber.replace('+380', '+380-').replace(/(\d{2})(\d{3})(\d{3})/, '$1-$2-$3'), 
    validPhoneNumber.replace(/(\s)/g, '_'),            
    validPhoneNumber.replace('+380', '').replace(/(\d{2})(\d{3})(\d{3})/, '($1)$2'), 
    validPhoneNumber.replace('+380', '').replace(/(\d{2})(\d{3})(\d{3})/, '($1)$2'), 
    validPhoneNumber.slice(0, 12),                      
    validPhoneNumber.replace('+380', '+10'),            
    validPhoneNumber.replace('+380', '+').slice(0, -3), 
];

describe('Authorization with invalid phone', () => {
    it('id:C207 - Authorization with invalid phone', async () => {
        await homePage.clickLoginButton();

        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.hiddenPasswordIcon.click();
        await expect(await homePage.passwordField.getValue()).toEqual(`${process.env.ADMIN_PASSWORD}`);
    
        for (const invalidNumber of invalidPhoneNumbers) {
            await homePage.emailField.setValue(invalidNumber);
            await homePage.submitButton.click();
            
            await expect(homePage.popupWindow).toBeDisplayed();
            await expect(await homePage.emailFieldErrorMessage.getText()).toEqual('Неправильний формат email або номера телефону')
        }
    });
});