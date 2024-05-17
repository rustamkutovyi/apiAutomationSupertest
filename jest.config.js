/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
      "default", ["jest-junit", {outputDirectory: "report"}],
      ["jest-html-reporters", {
      publicPath: "report"
      }]
  ]

};