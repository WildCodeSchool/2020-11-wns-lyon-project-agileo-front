import { App } from '../index'
import { Text, Select, Relationship } from '@keystonejs/fields'

App.keystone.createList('Course', {
  fields: {
    name: { type: Text, isRequired: true },
    subject: { type: Text, isRequired: true },
    content: { type: Text, isRequired: true },
    state: { type: Select, options: 'start, continue, completed' },
    school: { type: Relationship, ref: 'School' },
  },
})
