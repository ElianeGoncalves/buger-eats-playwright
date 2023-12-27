import { test} from '@playwright/test'
import { dataTitle, dataModel, dataMessages, dataMessagesCpf, dataMessagesEmail, dataCep, dataMethod, dataRequiredMsg} from './fixtures/data.model'
import { TasksPage } from './support/pages/tasks/index.ts'
import dat from './fixtures/data.json'



test.describe('', () => {

    test.beforeEach(async ({ page }) => {

       const tasksPage: TasksPage = new TasksPage(page)
       const title = dat.title as dataTitle

       await tasksPage.go()
       await tasksPage.shouldHaveText(title)
       await tasksPage.clickButton()
       await tasksPage.shouldHaveText(title)
    });

    test('app must register a delivery person succesfuly', async ({ page }) => {

        const tasksPage: TasksPage = new TasksPage(page)

        const data = dat.success as dataModel
        const successmessage = dat.message as dataMessages
       

        await tasksPage.inputData(data)
        await tasksPage.submit()
        await tasksPage.modalContext(successmessage)

    });

    test('app must validate incorrect cpf', async ({ page }) => {

        const tasksPage: TasksPage = new TasksPage(page)
        const data = dat.incorrectCpf as dataModel
        const alertCpf = dat.messageCpf as dataMessagesCpf
       

        await tasksPage.inputData(data)
        await tasksPage.submit()
        await tasksPage.shouldHaveAlertErrorCpf(alertCpf)
        

    }); 

    test('app must validate incorrect email', async ({ page }) => {

        const tasksPage: TasksPage = new TasksPage(page)
        const data = dat.incorrectEmail as dataModel
        const alertEmail = dat.messageEmail as dataMessagesEmail
    
        await tasksPage.inputData(data)
        await tasksPage.submit()
        await tasksPage.shouldHaveAlertErrorEmail(alertEmail)

    }); 
    
    test('app must validate incorrect cep', async ({ page }) => {
        const tasksPage: TasksPage = new TasksPage(page)
        const data = dat.incorrectCEP as dataCep

        await tasksPage.shouldHaveAlertErrorCep(data)
        
    }); 

    test('app must select only one delivery method', async ({ page }) => {
       
        const tasksPage: TasksPage = new TasksPage(page)
        const data = dat.validateDeliveryMethod as dataMethod

        await tasksPage.selectAllDeliveryMethods(data)
        await tasksPage.submit()
        await tasksPage.shouldHaveAlertErrorDeliveryMethod(data)
        
    }); 

    test('app must validate required fields', async ({ page }) => {
        
        const tasksPage: TasksPage = new TasksPage(page)
        const messages = dat.requiredMsg as dataRequiredMsg

        await tasksPage.submit()
        await tasksPage.shouldHaveAlertErrorRequiredFields(messages)
        
    }); 
    
   
})
