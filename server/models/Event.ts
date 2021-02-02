import { App } from '../controllers/App'
import { Text, Checkbox, Relationship } from '@keystonejs/fields'

App.keystone.createList('Event', {
  fields: {
    name: { type: Text, isRequired: true },
    subject: { type: Text, isRequired: true },
    start: { type: Text },
    end: { type: Text },
    allDay: { type: Checkbox },
    team: { type: Relationship, ref: 'Team' },
    user: { type: Relationship, ref: 'User', many: true },
  },
})
