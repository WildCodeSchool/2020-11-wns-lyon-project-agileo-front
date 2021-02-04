import { App } from '../index'
import { Text, Checkbox, Relationship } from '@keystonejs/fields'

App.keystone.createList('Event', {
  fields: {
    name: { type: Text, isRequired: true },
    subject: { type: Text, isRequired: true },
    start: { type: Text },
    end: { type: Text },
    allDay: { type: Checkbox },
    class: { type: Relationship, ref: 'Class' },
    user: { type: Relationship, ref: 'User', many: true },
  },
})
