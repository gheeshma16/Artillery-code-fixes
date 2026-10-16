import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/user.json';

export default defineConfig({

    reporter: [
        ['html', {
            outputFolder: 'playwright-report',
            open: 'never'
        }]
    ],
    timeout:60000,
    // retries:3,
    use: {
        baseURL: process.env.BASE_URL,
        storageState: authFile,
        headless: false,

        launchOptions: {
            slowMo: 2000
        }
    },

    projects: [

        // Chromium
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: authFile,
            },
        },

        // Firefox
        // {
        //     name: 'firefox',
        //     use: {
        //         ...devices['Desktop Firefox'],
        //         storageState: authFile,
        //     },
        // },

        // WebKit
        // {
        //     name: 'webkit',
        //     use: {
        //         ...devices['Desktop Safari'],
        //         storageState: authFile,
        //     },
        // },
    ],
});














