import Page from './page';
import { errorMessages } from '../constants/errorMessages';

class HomePage extends Page {
    get header() {
        return $('h1[class*=HeroSection_title]');
    }

    get serviceItemsNames() {
        return '[data-testid="services"] [class*=RentzilaProposes_proposes_list] > * [class*=RentzilaProposes_name]';
    }

    get serviceItems() {
        return '[data-testid="services"] [class*=RentzilaProposes_proposes_list] > *';
    }

    get servicesSection() {
        return '[data-testid="services"]';
    }

    get popularTab() {
        return '[data-testid="services__populyarni"]';
    }

    get serviceAgriculturalTab() {
        return '[data-testid="services__silskogospodarski"]';
    }

    get serviceBuildingTab() {
        return '[data-testid="services__budivelni"]';
    }

    get serviceTabOther() {
        return '[data-testid="services__inshi"]';
    }

    get specialEquipmentSection() {
        return '[data-testid="specialEquipment"]';
    }

    get specialEquipmentPopularTab() {
        return '[data-testid="specialEquipment__populyarna"]';
    }

    get specialEquipmentAgriculturalTab() {
        return '[data-testid="specialEquipment__silskogospodarska"]';
    }

    get specialEquipmentBuildingTab() {
        return '[data-testid="specialEquipment__budivelna"]';
    }

    get specialEquipmentTabOther() {
        return '[data-testid="specialEquipment__insha"]';
    }

    get specialEquipmentItems() {
        return '[data-testid="specialEquipment"] [class*=RentzilaProposes_proposes_list] > *';
    }

    get specialEquipmentItemsNames() {
        return '[data-testid="specialEquipment"] [class*=RentzilaProposes_proposes_list] > * [class*=RentzilaProposes_name]';
    }

    async getAllItemNames(): Promise<string[]> {
        const products = $$(this.serviceItems);
        const namesPromises = await products.map(async (product) => {
            const nameElement = product.$(this.serviceItemsNames);
            return nameElement.getText();
        });

        const names = await Promise.all(namesPromises);
        return names;
    }

    async getAllSpecialEquipmentItemsNames(): Promise<string[]> {
        const products = $$(this.specialEquipmentItems);
        const namesPromises = await products.map(async (product) => {
            const nameElement = product.$(this.specialEquipmentItemsNames);
            return nameElement.getText();
        });

        const names = await Promise.all(namesPromises);
        return names;
    }

    async validateServicesSection() {
        await expect($(this.servicesSection)).toBeDisplayed();
        await expect($(this.popularTab)).toBeDisplayed();
        await expect($$(this.serviceItems)).toBeElementsArrayOfSize(7);
    }

    async validateSpecialEquipmentSection() {
        await expect($(this.specialEquipmentSection)).toBeDisplayed();
        await expect($(this.specialEquipmentPopularTab)).toBeDisplayed();
        await expect($$(this.specialEquipmentItems)).toBeElementsArrayOfSize(7);
    }

    async clickFirstServiceItem() {
        const products = $$(this.serviceItems);
        await products[0].click();
    }

    async clickFirstSpecialEquipmentItem() {
        const products = $$(this.specialEquipmentItems);
        await products[0].click();
    }

    async getFirstItemName() {
        const products = $$(this.serviceItems);
        const firstProduct = products[0];
        return await firstProduct.$(this.serviceItemsNames).getText();
    }

    async getFirstSpecialEquipmentItemName() {
        const products = $$(this.specialEquipmentItems);
        const firstProduct = products[0];
        return await firstProduct.$(this.specialEquipmentItemsNames).getText();
    }

    async scrollToFooter(): Promise<void> {
        await this.footer.scrollIntoView();
    }

    async scrollToConsultationSection(): Promise<void> {
        await this.consultationSection.scrollIntoView();
    }

    async isFooterDisplayed(): Promise<boolean> {
        return await this.footer.isDisplayed();
    }

    async clickServiceTab(serviceTabLocator: string) {
        await $(serviceTabLocator).click();
    }

    async clickOkInDialogPopUp() {
        await browser.waitUntil(async () => await browser.isAlertOpen(), {});
        let alertText = await browser.getAlertText();
        await expect(alertText).toEqual("Ви успішно відправили заявку");
        await browser.acceptAlert();
    }

    async verifyContactUsForm() {
        expect($(this.consultationSectionNameField)).not.toHaveAttr('class', /ConsultationForm_error/);
        expect($(this.consultationSectionPhoneNumberField)).toHaveAttr('class', /ConsultationForm_error/);
    
        expect(this.consultationErrorMessagesList[1]).toHaveText(errorMessages.phoneValidationError);
    }

    async secviceItemClickByIndex(index: number) {
        await $$(this.serviceItems)[index].click()
    }

    async specialEquipmentItemClickByIndex(index: number) {
        await $$(this.specialEquipmentItems)[index].click()
    }
}

export default new HomePage();