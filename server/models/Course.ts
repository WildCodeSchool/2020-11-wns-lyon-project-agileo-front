import { App } from '../controllers/App'
import { Text, Select, Relationship } from '@keystonejs/fields'

App.keystone.createList('Course', {
  fields: {
    name: { type: Text, isRequired: true },
    subject: { type: Text, isRequired: true },
    content: { type: Text, isRequired: true },
    state: { type: Select, options: 'start, continue, completed' },
    company: { type: Relationship, ref: 'Company' },
  },
})
