import { App } from '../index'
import { Text, Relationship } from '@keystonejs/fields'

App.keystone.createList('Event', {
  fields: {
    title: { type: Text, isRequired: true },
    notes: { type: Text },
    startDate: { type: Text, isRequired: true },
    endDate: { type: Text, isRequired: true },
    rRule: { type: Text },
    location: { type: Text, isRequired: true },
    type: { type: Text, isRequired: true },
    class: { type: Relationship, ref: 'Class' },
    user: { type: Relationship, ref: 'User' },
  },
})
