import { NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
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
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
      },
      {
        type: 'append',
        path: 'components/index.ts',
        pattern: `/* INJECT_EXPORT */`,
        template: `export { default as {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}';`,
      },
    ],
  })
}
