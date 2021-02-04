import { App } from '../index'
import { File, Text, Relationship } from '@keystonejs/fields'
import { Adapter } from '../../config/adapter'

App.keystone.createList('MediaFile', {
  fields: {
    name: { type: Text, isRequired: true },
    file: { type: File, adapter: Adapter },
    class: { type: Relationship, ref: 'Class', isRequired: true },
  },
})
