import { App } from '../index'
import { Text, Relationship } from '@keystonejs/fields'

App.keystone.createList('Class', {
  fields: {
    name: { type: Text, isRequired: true },
    school: { type: Relationship, ref: 'School', isRequired: true },
  },
})
