import { expect } from '@wdio/globals'
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('Verify ""Скасувати"" button', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C326 - Verify ""Скасувати"" button', async () => {
        await expect(profilePage.canceledButton).toHaveText(/Скасувати/);

        await profilePage.canceledButton.click();

        browser.on('dialog', (dialog) => {
            expect(dialog.message()).toEqual('Внесені зміни, можливо, не буде збережено.');
            dialog.accept();
        });

        await expect(browser).toHaveUrl(`${process.env.BASE_URL}`);
    });
});

