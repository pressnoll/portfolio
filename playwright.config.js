import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
const chrome='C:/Program Files/Google/Chrome/Application/chrome.exe';
export default defineConfig({testDir:'./tests',use:{baseURL:'http://127.0.0.1:4173',launchOptions:process.platform==='win32'&&existsSync(chrome)?{executablePath:chrome}:{}},webServer:{command:'npm run preview -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:true},workers:1});
