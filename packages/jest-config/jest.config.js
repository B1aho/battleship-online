/** @type {import('jest').Config} */
const config = {
    coverageReporters: ["text", "html"],
    setupFilesAfterEnv: ["@workspace/jest-config/jest.setup.js"],  // Настройка для установочного файла Jest
    testEnvironment: "jest-environment-jsdom",  // Для работы в браузерном окружении
    transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest'],  // Для работы с TypeScript и React
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',  // Пример алиасов
    },
    testMatch: [
        "**/?(*.)+(spec|test).[tj]s?(x)",  // Найдет файлы, заканчивающиеся на .test.tsx или .spec.tsx
      ],
  };

module.exports = config;
  