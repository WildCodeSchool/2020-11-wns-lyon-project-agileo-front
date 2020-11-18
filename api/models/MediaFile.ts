import { App } from '../index'
import { Text, Relationship } from '@keystonejs/fields'

App.keystone.createList('MediaFile', {
  fields: {
    name: { type: Text, isRequired: true },
    fileUrl: { type: Text },
    class: { type: Relationship, ref: 'Class', isRequired: true },
  },
})
