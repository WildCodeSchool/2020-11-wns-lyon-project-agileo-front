import { Text } from '@keystonejs/fields'
import { App } from '../controllers/App'

App.keystone.createList('Team', {
  fields: {
    name: { type: Text, isRequired: true },
  },
  plugins: [],
  access: {},
})
