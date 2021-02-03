import { App } from '../controllers/App'
import { Text, File } from '@keystonejs/fields'
import { Adapter } from '../../config/adapter'

App.keystone.createList('Company', {
  fields: {
    name: { type: Text, isRequired: true },
    logo: { type: File, adapter: Adapter },
  },
})
