import Page from './page';

class AdvertsPage extends Page {
    get checkedCheckboxElement() {
        return $('//input[@data-testid="serviceCheckbox" and @checked]/parent::div');
    }

    get relevantUnitNames() {
        return '[data-testid="serviceLabel"]';
    }

    get relevantUnits() {
        return $$('div[class*="CheckboxService"]');
    }

    get firstArrow() {
        return $('(//div[@data-testid="rightArrow"])[1]');
    }

    get secondArrow() {
        return $('(//div[@data-testid="rightArrow"])[2]');
    }

    get thirdArrow() {
        return $('(//div[@data-testid="rightArrow"])[3]');
    }

    get products() {
        return $$('[data-testid="cardWrapper"]');
    }

    get unclickedArrows() {
        return $$('[class*="ServiceCategory_svgContainer"] > *');
    }

    get unclickedCategoriesArrows() {
        return $$('[data-testid="firstCategoryList"] [data-testid="firstCategoryImage"]');
    }

    get secondLayerOfUnclickedCategoriesArrows() {
        return $$('[data-testid="firstCategoryList"] [data-testid="secondCategoryImage"]');
    }

    get searchInput() {
        return $('[data-testid="searchInput"]');
    }

    async validateFiltersAndUnitOneSpecialEquipment(firstSpecialEquipmentItemName: string) {
        const arrows = this.unclickedCategoriesArrows;
        await arrows[1].click();
        const secondLayerArrows = this.secondLayerOfUnclickedCategoriesArrows;
        await secondLayerArrows[6].click();
        const names = await this.getAllCategoriesUnitsNames();
        await expect(names).toContain(firstSpecialEquipmentItemName);
    }

    async validateFiltersAndUnits(serviceNames: string[], itemClicked: string) {
        await this.firstArrow.click();
        await this.secondArrow.click();
        await this.thirdArrow.click();
        const allUnitsNames = await this.getAllUnitsNames();
        
        const strippedUnitNames = allUnitsNames.map(name => name.split(' (')[0]);
        
        for (const name of serviceNames) {
            await expect(strippedUnitNames).toContain(name);
        }
        
        await this.validateCheckedCheckboxeHaveProperName(itemClicked);
    }

    async validateCheckedCheckboxeHaveProperName(itemClicked: string) {
        const checkedProduct = this.checkedCheckboxElement;
        const checkedProductText = await checkedProduct.getText();
        const cleanedText = checkedProductText.replace(/\s*\(\d+\)$/, '');

        await expect(cleanedText).toEqual(itemClicked);
    }
    
    async getAllItemNames(): Promise<string[]> {
        const units = this.relevantUnits;
        const namesPromises = await units.map(async (unit) => {
            const nameElement = unit.$(this.relevantUnitNames);
            return nameElement.getText();
        });

        const names = await Promise.all(namesPromises);
        return names;
    }

    async getAllUnitsNames(): Promise<string[]> {
        const products = this.relevantUnits;
        const namesPromises = await products.map(async (product) => {
            const nameElement = product.$(this.relevantUnitNames);
            return nameElement.getText();
        });

        const names = await Promise.all(namesPromises);
        return names;
    }

    async clickFirstUnit() {
        const products = this.products;
        await products[0].click();
    }

    async validatePageLoad() {
        await this.checkedCheckboxElement.isDisplayed();
    }

    async openAllClosedArrows() {
        const arrows = this.unclickedArrows;
       
        arrows.forEach(async (arrow) => {
            await arrow.click();
        });

        await browser.pause(2000);
    } 
}

export default new AdvertsPage();
