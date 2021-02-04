import { App } from '../index'
import { Text, File } from '@keystonejs/fields'
import { Adapter } from '../../config/adapter'

App.keystone.createList('School', {
  fields: {
    name: { type: Text, isRequired: true },
    logo: { type: File, adapter: Adapter },
  },
})
