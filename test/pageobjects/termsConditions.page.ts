import Page from './page';

class TermsConditionsPage extends Page {
    get title() {
        return $('div h1[class*=TermsConditions_title]');
    }

    async scrollToFooter(): Promise<void> {
        await this.footer.scrollIntoView();
    }

    async isFooterDisplayed(): Promise<boolean> {
        return await this.footer.isDisplayed();
    }
}

export default new TermsConditionsPage();