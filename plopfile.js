module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name ?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}.tsx',
        templateFile: 'src/templates/Component.tsx.hbs',
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        pattern: `/* INJECT_EXPORT */`,
        template: `export { default as {{pascalCase name}} } from './{{pascalCase name}}'`,
      },
    ],
  })
  plop.setGenerator('redux', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your redux name ?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/core/{{camelCase name}}/actions.ts',
        templateFile: 'src/templates/actions.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/core/{{camelCase name}}/domain.ts',
        templateFile: 'src/templates/domain.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/core/{{camelCase name}}/index.ts',
        templateFile: 'src/templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/core/{{camelCase name}}/reducers.ts',
        templateFile: 'src/templates/reducers.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/core/{{camelCase name}}/types.ts',
      },
      {
        type: 'append',
        path: 'src/core/index.ts',
        pattern: `/* INJECT_EXPORT */`,
        template: `export { default as {{camelCase name}} } from './{{camelCase name}}'`,
      },
      {
        type: 'append',
        path: 'src/domain/RootState.ts',
        pattern: `/* INJECT_IMPORT */`,
        template: `import { {{pascalCase name}}State } from 'core/{{camelCase name}}/domain'`,
      },
      {
        type: 'append',
        path: 'src/domain/RootState.ts',
        pattern: `/* INJECT_EXPORT */`,
        template: `  {{camelCase name}}: {{pascalCase name}}State`,
      },
    ],
  })
}
