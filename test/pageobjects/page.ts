export default class Page {
    get advertsLink() {
        return $('a[class*="Navbar_link"][href="/products/"]');
    }

    get nabarLogo() {
        return $('a[class*="Navbar_logo"]');
    }

    get loginButton() {
        return $('div[class*="NavbarAuthBlock_buttonEnter"]');
    }

    get emailField() {
        return $('#email');
    }

    get passwordField() {
        return $('#password');
    }

    get emailFieldErrorMessage() {
        return $('label[for="email"] ~ [class*=CustomReactHookInput_input_wrapper] + p[class*=CustomReactHookInput_error_message]');
    }

    get passwordFieldErrorMessage() {
        return $('label[for="password"] ~ [class*=CustomReactHookInput_input_wrapper] + p[class*=CustomReactHookInput_error_message]');
    }

    get hiddenPasswordIcon() {
        return $('div[class*=CustomReactHookInput_icon]');
    }

    get popupWindow() {
        return $('[data-testid="authorizationContainer"]');
    }

    get userIcon() {
        return $('[data-testid="avatarBlock"]');
    }

    get userDropdownMenu() {
        return $('div[class*=ProfileDropdownMenu_container]');
    }

    get userDropdownMenuEmail() {
        return $('[data-testid="email"]');
    }

    get logoutDropdownMenu() {
        return $('[data-testid="logout"] [class*=ProfileDropdownMenu_name]');
    } 

    get goToProfileDropdownMenu() {
        return $('[data-testid="profile"]');
    }

    get submitButton() {
        return $('[data-testid="loginPopup"] button[type="submit"]');
    }

    get errorPopupLoginMessages() {
        return $$('[class*=CustomReactHookInput_error_message]');
    }

    get errorPopupLoginInputFields() {
        return $$('[class*="CustomReactHookInput_error_input"]');
    }

    get footer() {
        return $('div[class*="Footer_footer"]');
    }

    get rentzilaFooterLogo() {
        return $('div[class*="Footer_footer"] [data-testid="logo"]');
    }

    get aboutUsLable() {
        return $('[data-testid="content"]');
    }

    get privacyPolicy() {
        return $('[href="/privacy-policy/"]');
    }

    get cookiePolicy() {
        return $('[href="/cookie-policy/"]');
    }

    get termsConditions() {
        return $('[href="/terms-conditions/"]');
    }

    get forBuyers() {
        return $('div[class*="Footer_footer"] [class*="RentzilaForBuyers_title"]');
    }

    get productsLink() {
        return $('div[class*="Footer_footer"] [href="/products/"]');
    }

    get tendersMap() {
        return $('[href="/tenders-map/"]');
    }

    get contacts() {
        return $('div[class*="Footer_footer"] [class*="RentzilaContacts_title"]');
    }

    get copyright() {
        return $('[data-testid="copyright"]');
    }

    get infoEmail() {
        return $('[href="mailto:info@rentzila.com.ua"]');
    }

    get consultationSection() {
        return $('section[class*=Layouts_consultation]');
    }

    get oderConsultation() {
        return $('section[class*=Layouts_consultation] [type="submit"]');
    }

    get consultationSectionNameField() {
        return $('[placeholder="Ім\'я"]');
    }

    get consultationSectionPhoneNumberField() {
        return $('[placeholder="Номер телефону"]');
    }

    get consultationErrorMessagesList() {
        return $$('div [role="alert"]');
    }

    get relevantCategoriesUnits() {
        return '[data-testid="thirdCategoryLabel"]';
    }

    get relevantCategoriesUnitsNames() {
        return '[data-testid="thirdCategoryLabel"] p';
    }

    get telegramCrossButton() {
        return $('[data-testid="completeTenderRectangle"] [data-testid="crossIcon"]');
    }

    public open (path: string) {
        return browser.url(`${path}`)
    }

    async clickNavbarLogo() {
        await this.nabarLogo.click();
    }

    async clickAvertsLink() {
        await this.advertsLink.click();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(email: string, password: string) {
        await this.clickLoginButton();

        await this.emailField.waitForDisplayed({ timeout: 5000 });
        await this.passwordField.waitForDisplayed({ timeout: 5000 });

        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);

        await this.submitButton.click();
    }

    async waitForSubmitButtonToDisappear(timeout: number = 10000) {
        await browser.waitUntil(
            async () => !(await this.submitButton.isDisplayed()),
            {
                timeout,
                timeoutMsg: 'Submit button did not disappear in time'
            }
        );
    }

    async getAllCategoriesUnitsNames(): Promise<string[]> {
        const products = $$(this.relevantCategoriesUnits);
        const namesPromises = await products.map(async (product) => {
            const nameElement = product.$(this.relevantCategoriesUnitsNames);
            return nameElement.getText();
        });

        const names = await Promise.all(namesPromises);
        return names;
    }
}