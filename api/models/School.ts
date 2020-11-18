import { App } from '../index'
import { Text, File } from '@keystonejs/fields'

App.keystone.createList('School', {
  fields: {
    name: { type: Text, isRequired: true },
  },
})
