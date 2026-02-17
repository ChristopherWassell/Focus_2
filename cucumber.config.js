module.exports = {
  default: {
    require: ['features/step-definitions/**/*.ts', 'features/hooks.ts'],
  
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber_report.json',
      'html:reports/cucumber_report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['features/*.feature'],
    publishQuiet: true,
  },
};