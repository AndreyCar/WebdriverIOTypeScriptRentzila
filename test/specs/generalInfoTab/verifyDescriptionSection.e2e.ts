import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';
import { faker } from '@faker-js/faker';

describe('Verify description section', () => {
    before(async () => {
        
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C318 - Verify description section', async () => {
        const title = profilePage.descriptionTitle; 
        await expect(title).toBeDisplayedInViewport();
        await expect(title).toHaveText('Детальний опис');

        await expect(profilePage.descriptionCustomTextArea).toBeDisplayed();
        await expect(profilePage.descriptionCustomTextArea).toBeClickable();
        await expect(profilePage.descriptionCustomTextArea).toHaveText(''); 
   
        const specialSymbolsInput = '<>{};^';
        const textArea = profilePage.descriptionCustomTextArea;

        await textArea.clearValue();
        await textArea.setValue(specialSymbolsInput);

        await expect(await textArea.getValue()).toEqual('');

        await textArea.clearValue();

        await browser.execute((text) => {
            navigator.clipboard.writeText(text);
        }, specialSymbolsInput);

        await textArea.click();
        await browser.keys(['Control', 'v']); 

        await expect(await textArea.getValue()).toEqual('');
    
        const longInput = faker.string.alpha({ length: 9001 });
        const textArea1 = profilePage.descriptionCustomTextArea;

        await textArea1.clearValue();
        await textArea1.setValue(longInput);

        const textAreaValue = await textArea1.getValue();
        expect(textAreaValue.length).toBeLessThanOrEqual(9000);
    });
});