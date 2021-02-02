import { App } from '../controllers/App'
import { File, Text, Relationship } from '@keystonejs/fields'
import { Adapter } from '../utils/fileAdapter'

App.keystone.createList('MediaFile', {
  fields: {
    name: { type: Text, isRequired: true },
    file: { type: File, adapter: Adapter },
    team: { type: Relationship, ref: 'Team', isRequired: true },
  },
})
