import { App } from '../controllers/App'
import { Text, Relationship } from '@keystonejs/fields'

App.keystone.createList('Team', {
  fields: {
    name: { type: Text, isRequired: true },
    company: { type: Relationship, ref: 'Company', isRequired: true },
  },
})
