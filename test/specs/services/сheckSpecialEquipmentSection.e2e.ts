import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import advertsPage from '../../pageobjects/adverts.page';
import unitPage from '../../pageobjects/unit.page';
import { repeatTestCaseForspecialEquipment } from '../../helpers/serviceHelper';

let specialEquipmentItemsNames: string[];
let firstSpecialEquipmentItemName: string;

xdescribe('Checking the Спецтехніка section and related functionality', () => {
    it('id:C213 - Checking the Спецтехніка section and related functionality', async () => {
        await homePage.validateSpecialEquipmentSection();
        
        specialEquipmentItemsNames = await homePage.getAllSpecialEquipmentItemsNames();
        console.log(specialEquipmentItemsNames);

        firstSpecialEquipmentItemName = await homePage.getFirstSpecialEquipmentItemName();

        await homePage.clickFirstSpecialEquipmentItem();
        await advertsPage.validatePageLoad();

        await advertsPage.validateFiltersAndUnitOneSpecialEquipment("посівна та садильна техніка");
   
        await advertsPage.clickFirstUnit();

        await unitPage.validateServiceProvided("Посів технічних та зернових культур");
    
        await unitPage.clickNavbarLogo();

        await expect(browser).toHaveUrl('https://dev.rentzila.com.ua/');
    
        const specialEquipmentCategories = [
            homePage.specialEquipmentPopularTab,     
            homePage.specialEquipmentAgriculturalTab, 
            homePage.specialEquipmentBuildingTab,        
            homePage.specialEquipmentTabOther          
        ];

        for (const specialEquipmentLocator of specialEquipmentCategories) {
            await repeatTestCaseForspecialEquipment(specialEquipmentLocator);
        }
    });
});
