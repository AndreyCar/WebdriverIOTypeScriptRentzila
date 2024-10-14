import { expect } from '@wdio/globals';
import homePage from '../../pageobjects/home.page';
import { faker } from '@faker-js/faker';
import apiService from '../../api/rentzilla.api';

let createdBackcallId: number;
let randomName = faker.person.firstName();
let phoneNumber = '+380506743060';

describe('Verify ""У Вас залишилися питання?"" form', () => {
    after(async () => {
        if (createdBackcallId) {
            await apiService.deleteBackcalle(createdBackcallId); 
        }
    });

    it('id:C226 - Verify ""У Вас залишилися питання?"" form', async () => {
        await expect(homePage.consultationSection).toBeDisplayed();
    
        await homePage.oderConsultation.click();
        const consultationSectionNameFieldHasErrorClass = await homePage.consultationSectionNameField.getAttribute('class');
        const consultationSectionPhoneNumberFieldHasErrorClass = await homePage.consultationSectionNameField.getAttribute('class');
        
        expect(consultationSectionNameFieldHasErrorClass).toHaveAttr('class', /ConsultationForm_error/);
        expect(consultationSectionPhoneNumberFieldHasErrorClass).toHaveAttr('class', /ConsultationForm_error/);

        expect(homePage.consultationErrorMessagesList[0]).toHaveText('Поле не може бути порожнім');
        expect(homePage.consultationErrorMessagesList[1]).toHaveText('Поле не може бути порожнім');
    
        await homePage.consultationSectionNameField.setValue('Test');
        
        await homePage.oderConsultation.click();

        expect(await homePage.consultationSectionNameField.getAttribute('class')).not.toHaveAttr('class', /ConsultationForm_error/);
        expect(await homePage.consultationSectionPhoneNumberField.getAttribute('class')).toHaveAttr('class', /ConsultationForm_error/);

        await homePage.consultationSectionPhoneNumberField.click();
    
        expect(await homePage.consultationSectionPhoneNumberField.getValue()).toContain('+380');
    
        await homePage.consultationSectionNameField.clearValue();

        await homePage.consultationSectionPhoneNumberField.clearValue();
        
        await homePage.consultationSectionPhoneNumberField.setValue(phoneNumber);

        await homePage.oderConsultation.click();

        const consultationSectionNameFieldHasErrorClass2 = await homePage.consultationSectionNameField.getAttribute('class');

        expect(consultationSectionNameFieldHasErrorClass2).toHaveAttr('class', /ConsultationForm_error/);
        await browser.waitUntil(
            async () => {
                const consultationSectionPhoneNumberFieldHasErrorClass = await homePage.consultationSectionPhoneNumberField.getAttribute('class');
                return !consultationSectionPhoneNumberFieldHasErrorClass.includes('ConsultationForm_error');
            },
            {
                timeout: 5000, 
                timeoutMsg: 'Expected phone number field to not contain error class within 5 seconds'
            }
        );

        await homePage.consultationSectionNameField.clearValue();
        await homePage.consultationSectionNameField.setValue(randomName);

        await homePage.consultationSectionPhoneNumberField.clearValue();
        await homePage.consultationSectionPhoneNumberField.setValue('+38063 111 111');

        await homePage.oderConsultation.click();

        await homePage.verifyContactUsForm();

        await homePage.consultationSectionPhoneNumberField.clearValue();
        await homePage.consultationSectionPhoneNumberField.setValue('+1 1111111111111');

        await homePage.oderConsultation.click();

        await homePage.verifyContactUsForm();

        await homePage.consultationSectionPhoneNumberField.clearValue();
        await homePage.consultationSectionPhoneNumberField.setValue(phoneNumber);

        await homePage.oderConsultation.click();

        browser.on('dialog', (dialog) => {
            expect(dialog.message()).toEqual('TEXT');
            dialog.accept();
        })
   
        const backcallList = await apiService.getListOfBackcalles();
        const lastBackcall = backcallList[backcallList.length - 1]; 

        expect(lastBackcall.name).toEqual(randomName);
        expect(lastBackcall.phone).toEqual(phoneNumber);

        createdBackcallId = lastBackcall.id;
    });    
});
