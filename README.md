# Getting Started using Ubuntu 24.04 LTS
1. Download GitHub repository
2. Open repository using Visual Studio Code
3. Install the following extension: Playwright Test for VSCode" (verified from Microsoft)
4. In keyboard press "ctrl+shift+P" to open command panel
5. Search and select "Install Playwright"
6. In "Install Playwright" option select:
   - At least Chrome Browser
   - Add GitHub Actions Workflow
   - Install Linux dependencies
7. Press OK
8. In main repository terminal use the following command `npm install` to install all dependencies


# Running commands
* Run in main repository terminal:
- `npx playwright test --workers 1` to run all tests using 1 worker
- `npx playwright test loginLogout.spec.ts --workers 1` to run UI test(s) from "loginLogout" file with 1 worker
- `npx playwright test order.spec.ts --workers 1` to run UI test(s) from "order.spec.ts" file with 1 worker
- `npx playwright test reqRes.spec.ts --workers 1` to run REST API test(s) from "reqRes.spec.ts" file with 1 worker
- `npx playwright test jsonPlaceholder.spec.ts --workers 1` to run Back-up REST API test(s) from "jsonPlaceholder.spec.ts" file with 1 worker
* If you want to run both files for UI tests at once then use both ".spec.ts" files name in command: `npx playwright test loginLogout.spec.ts order.spec.ts --workers 1`
* If you want to run UI tests with REST API tests at once then use all ".spec.ts" files name in command: `npx playwright test loginLogout.spec.ts order.spec.ts reqRes.spec.ts --workers 1`

# Other commands in main repository terminal
* `npx playwright install --with-deps` - Install/Update the browsers with system dependencies
* `npx playwright show-report` - Show report after test(s) finish running
* `npx playwright codegen` - Playwright test generator
* `npx playwright test loginLogout.spec.ts --workers 1 --repeat-each=5` - Running Login/Logout test in "loginLogout.spec.ts" 5-times with 1 worker
