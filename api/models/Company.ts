import { Text } from '@keystonejs/fields'
import { App } from '../controllers/App'

App.keystone.createList('Company', {
  fields: {
    name: { type: Text, isRequired: true },
  },
  plugins: [],
  access: {},
})
