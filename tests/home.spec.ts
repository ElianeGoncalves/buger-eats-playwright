import { test } from '@playwright/test'
import { dataTitle} from './fixtures/data.model'
import { TasksPage } from './support/pages/tasks/index.ts'
import dat from './fixtures/data.json'

test('webapp should be online', async ({ page }) => {

    const tasksPage: TasksPage = new TasksPage(page)
    const title = dat.title as dataTitle

    await tasksPage.go()
    await tasksPage.shouldHaveText(title)
})






