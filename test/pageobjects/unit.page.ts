import Page from './page';

class UnitPage extends Page {
    get servicesProvided() {
        return $$('div[class*=UnitCharacteristics_service]');
    }
 
    get servicesContainer() {
        return $('div[class*=UnitCharacteristics_services_container]');
    }

    async validateServiceProvided(expectedService: string) {
        await this.servicesContainer.waitForDisplayed({ timeout: 30000 });

        const displayedServices = await this.getAllServices();

        await expect(displayedServices).toContain(expectedService);
    }

    async getAllServices(): Promise<string[]> {
        const servicesElements = this.servicesProvided;
        const servicesTextPromises = await servicesElements.map(async (serviceElement) => {
            return serviceElement.getText();
        });

        const services = await Promise.all(servicesTextPromises);
        return services;
    }

    async validatePageLoad() {
        await this.servicesContainer.waitForDisplayed({
            timeout: 10000, 
            timeoutMsg: 'Unit page did not load within the expected time',
        });
    }
}

export default new UnitPage();
