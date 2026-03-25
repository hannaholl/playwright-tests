I've spent a couple of lab days learning about Playwright and based on the current documentation, I've written a new Playwright test for geckoboard that creates a dataset widget and takes a screenshot.

# Differences to current tests

## Fixtures for setup - custom `test`
The new tests use a [fixture](https://playwright.dev/docs/test-fixtures) for the dashboard page instead of each test creating a new `DashboardPage`. This is recommended for shared setup and most of the dashboard related tests needs a new dashboard to start from. So the fixture creates this dashboard and ensures the browser has navigated to the new dashboard. Fixture advantages https://playwright.dev/docs/test-fixtures#with-fixtures

The fixture removes all dashboards created by the current page as part of its cleanup. This seems to work when the test fails too. In most cases we'll only create one dashboard per test, but since it's possible to keep creating more we should delete them all.

## Avoid using waits until necessary - Playwright auto-waiting
We have [various `page.waitFor...()`](https://github.com/search?q=repo%3Ageckoboard%2Fpolecat++path%3Ashakespeare%2F**+page.waitFor&type=code) in the tests that I never knew why or if they were needed when I came across them. I've been reading how Playwright [auto-waits](https://playwright.dev/docs/actionability) and I'm trying to avoid adding waits until they become necessary.

Because Playwright auto-waits for elements, we don't need to wait for elements to appear before interacting with a page. For example, the current test waits for the datasets config to appear by [looking for the text "Visualization type"](https://github.com/geckoboard/polecat/blob/76db148d4cafd627d2fc126783ca3577080db469/shakespeare/pom/models/Integrations.page.ts#L121), but we don't actually have to do that before interacting with the config. The new test simply changes the widget title after navigating to the config, and the test autowaits until the input becomes available.

## Separate Assertions from Page Objects
I was reading about the page-object-model and came across this article https://autify.com/blog/playwright-page-object-model. Based on that I decided to keep assertions out of the page objects as it's something I sometimes find confusing in the current tests. I think it's easier to read a test and track down failures if the assertions happen in the test itself.

# What's next
This was mainly done for me to learn more about Playwright and its core concepts, but I would like to use to a structure like this for the polecat Playwright tests. I'm not sure if it's feasible to change all the current tests, but we could prioritize some to port and create new tests this way.
