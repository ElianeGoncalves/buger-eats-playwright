import { Page, expect } from '@playwright/test'
import { dataTitle, dataModel, dataMessages, dataMessagesCpf, dataMessagesEmail, dataCep, dataMethod, dataRequiredMsg } from '../../../fixtures/data.model'

export class TasksPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto('/')
    }
    async shouldHaveText(title: dataTitle) {
        await expect(this.page).toHaveTitle(title.principalTitle)
    }

    async clickButton() {
        const link = this.page.locator('a[href="/deliver"]')
        await link.click()
    }

    async inputData(data: dataModel) {
        const inputName = this.page.locator('input[placeholder="Nome completo"]')
        await inputName.fill(data.name)


        const inputCpf = this.page.getByPlaceholder('CPF somente números')
        await inputCpf.fill(data.cpf)

        const inputEmail = this.page.getByPlaceholder('E-mail')
        await inputEmail.fill(data.email)

        const inputWhatsapp = this.page.getByPlaceholder('Whatsapp')
        await inputWhatsapp.fill(data.whatsapp)

        const inputCep = this.page.getByPlaceholder('CEP')
        await inputCep.fill(data.cep)
        const buttonCep = this.page.locator('input[value="Buscar CEP"]')
        await buttonCep.click()

        const inputNumber = this.page.locator('input[name="address-number"]')
        await inputNumber.fill(data.number)

        const inputComplement = this.page.getByPlaceholder('Complemento')
        await inputComplement.fill(data.complement)

        const imgDeliveryMethod = this.page.locator('img[alt="' + data.deliveryMethod + '"]')
        await imgDeliveryMethod.click()

        const inputCnh = this.page.locator('input[accept^="image"]')
        await inputCnh.setInputFiles(data.cnh)
    }

    async submit() {
        const buttonSubmit = this.page.locator('button[class="button-success"]')
        await buttonSubmit.click()
    }

    async modalContext(message: dataMessages) {

        const modalContent = this.page.locator('.swal2-container .swal2-html-container')
        await expect(modalContent).toHaveText(message.successMessage)

        const modalButton = this.page.locator('button[class="swal2-confirm swal2-styled"]')
        await modalButton.click()
    }

    async shouldHaveAlertErrorCpf(messageCpf: dataMessagesCpf) {

        const alertErrorCpf = this.page.getByText('Oops! CPF inválido')
        await expect(alertErrorCpf).toHaveText(messageCpf.alertCpf)

    }

    async shouldHaveAlertErrorEmail(messageEmail: dataMessagesEmail) {

        const email = this.page.getByPlaceholder('E-mail')
        const validationMessage = await email.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toContain(messageEmail.alertEmail)

    }

    async shouldHaveAlertErrorCep(incorrectCep: dataCep) {

        const cep = this.page.getByPlaceholder('CEP')
        await cep.fill(incorrectCep.cep)
        const btnCep = this.page.locator('input[value="Buscar CEP"]')
        await btnCep.click()
        const alertErrorCep = this.page.getByText('Informe um CEP válido')
        await expect(alertErrorCep).toHaveText(incorrectCep.alertCep)

    }

    async selectAllDeliveryMethods(validateDeliveryMethod: dataMethod) {

        const deliveryMethodMoto = this.page.locator('img[alt="' + validateDeliveryMethod.methodMoto + '"]')
        await deliveryMethodMoto.click()

        const deliveryMethodBike = this.page.locator('img[alt="' + validateDeliveryMethod.methodBicicleta + '"]')
        await deliveryMethodBike.click()

        const deliveryMethodCar = this.page.locator('img[alt="' + validateDeliveryMethod.methodVan + '"]')
        await deliveryMethodCar.click()

    }

    async shouldHaveAlertErrorDeliveryMethod(validateDeliveryMethod: dataMethod) {

        const alertErrorDeliveryMethod = this.page.getByText('Oops! Selecione apenas um método de entrega')
        await expect(alertErrorDeliveryMethod).toHaveText(validateDeliveryMethod.alertMethod)
    }

    async shouldHaveAlertErrorRequiredFields(requiredMsg: dataRequiredMsg) {

        const fieldName = this.page.getByText('É necessário informar o nome')
        const fieldCpf = this.page.getByText('É necessário informar o CPF')
        const fieldEmail = this.page.getByText('É necessário informar o email')
        const fieldCep = this.page.getByText('É necessário informar o CEP')
        const fieldNumber = this.page.getByText('É necessário informar o número do endereço')
        const fieldDeliveryMethod = this.page.getByText('Selecione o método de entrega')
        const fieldCnh = this.page.getByText('Adicione uma foto da sua CNH')

        await expect(fieldName).toHaveText(requiredMsg.msgName)
        await expect(fieldCpf).toHaveText(requiredMsg.msgCpf)
        await expect(fieldEmail).toHaveText(requiredMsg.msgEmail)
        await expect(fieldCep).toHaveText(requiredMsg.msgCep)
        await expect(fieldNumber).toHaveText(requiredMsg.msgNumber)
        await expect(fieldDeliveryMethod).toHaveText(requiredMsg.msgDeliveryMethod)
        await expect(fieldCnh).toHaveText(requiredMsg.msgCnh)

    }


}