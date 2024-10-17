import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import profilePage from '../../pageobjects/profile.page';

describe('Verify vehicle location division', () => {
    before(async () => {
        await browser.url('/create-unit/');
        await homePage.emailField.waitForDisplayed({ timeout: 5000 });
        await homePage.passwordField.waitForDisplayed({ timeout: 5000 });

        await homePage.emailField.setValue(`${process.env.ADMIN_USERNAME}`);
        await homePage.passwordField.setValue(`${process.env.ADMIN_PASSWORD}`);

        await homePage.submitButton.click();
    });

    it('id:C319 - Verify vehicle location division', async () => {
        await expect(profilePage.vehicleLocationDivisionTitle).toBeDisplayed();
        await expect(await profilePage.vehicleLocationDivisionTitle.getText()).toMatch(/Місце розташування технічного засобу \*/);
        await expect(profilePage.vehicleLocationDivisionInput).toHaveText(/Виберіть на мапі/);

        await profilePage.nextButton.click();

        await expect(profilePage.vehicleLocationDivisionInput).toHaveAttr('class', /labelError/);
        await expect(profilePage.vehicleLocationDivisionInputErrorMessage).toHaveText(/Виберіть коректне місце на мапі України/);

        await profilePage.selectOnMapButton.click();

        await expect(profilePage.map).toBeDisplayed();

        await expect(profilePage.mapPopupTitle).toHaveText(/Техніка на мапі/);
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.mapPopupCloseButton).toBeDisplayed();
        await expect(profilePage.popupAddress).toHaveText(/Київ, вулиця Володимирська 21\/20 Україна, Київська область/);
        await profilePage.confirmAdressButton.click();
        await expect(profilePage.vehicleLocationDivisionInput).toHaveText(/Київ, вулиця Володимирська 21\/20 Україна, Київська область/);

        await profilePage.selectOnMapButton.click();
        await expect(profilePage.popupAddress).toHaveText(/Київ, вулиця Володимирська 21\/20 Україна, Київська область/);

        const { x, y } = await profilePage.mapPopup.getLocation();
        const { width, height } = await profilePage.mapPopup.getSize();

        const centerX = Math.floor(x + width / 2);
        const centerY = Math.floor(y + height / 2 - 10);

        await browser.performActions([
            {
                type: 'pointer',
                id: 'mouse',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerUp', button: 0 },
                    { type: 'pause', duration: 1000 },
                ],
            },
        ]);
        const expectedText = await profilePage.popupAddress.getText();

        await profilePage.confirmAdressButton.click();
        
        await browser.waitUntil(async () => {
            const actualText = await profilePage.vehicleLocationDivisionInput.getText();
            return actualText === expectedText;
        }, {
            timeout: 30000, 
            timeoutMsg: 'The text did not become expected in 30 seconds ', 
        });
    });
});
