import homePage from '../pageobjects/home.page';
import advertsPage from '../pageobjects/adverts.page';
import unitPage from '../pageobjects/unit.page';

export async function repeatTestCaseForService(serviceLocator: string) { 
    if (await homePage.telegramCrossButton.isDisplayed()) {
        await homePage.telegramCrossButton.click();
    } 
    await homePage.clickServiceTab(serviceLocator);

    const serviceNames = await homePage.getAllItemNames();
    
    for (let i = 0; i < serviceNames.length; i++) {
        await homePage.clickServiceTab(serviceLocator);
        await homePage.validateServicesSection();

        const currentServiceName = serviceNames[i];
        await homePage.secviceItemClickByIndex(i);
        
        await advertsPage.validatePageLoad();
        await advertsPage.openAllClosedArrows();
        
        await advertsPage.clickFirstUnit();
        await unitPage.validateServiceProvided(currentServiceName);
        await unitPage.clickNavbarLogo();
    }
}

export async function repeatTestCaseForspecialEquipment(serviceLocator: string) { 
    await homePage.clickServiceTab(serviceLocator);

    const serviceNames = await homePage.getAllSpecialEquipmentItemsNames();
    
    for (let i = 0; i < serviceNames.length; i++) {
        await homePage.clickServiceTab(serviceLocator);

        const currentServiceName = serviceNames[i];
        await homePage.specialEquipmentItemClickByIndex(i);
        
        await advertsPage.validatePageLoad();
        await advertsPage.openAllClosedArrows();
        
        await advertsPage.clickFirstUnit();
        await unitPage.validateServiceProvided(currentServiceName);
        await unitPage.clickNavbarLogo();
    }
}