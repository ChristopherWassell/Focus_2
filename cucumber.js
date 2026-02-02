// cucumber.js
module.exports = {
  default: {
    // 1. Look for feature files here
    paths: ['features/login.feature', 'features/**/*.feature'], 
    
    // 2. Look for step definitions here (The "require" part)
    require: ['login.steps.ts', 'purchase.steps.ts', 'features/step-definitions/**/*.ts'],  

    // 3. Load the loader for TypeScript
    requireModule: ['ts-node/register'], 
  }
}