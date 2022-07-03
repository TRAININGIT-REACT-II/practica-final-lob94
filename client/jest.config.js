module.exports = {

    presets: ["@babel/preset-env", "@babel/preset-react"],

    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    }
};