import { App } from '../controllers/App'
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
    team: { type: Relationship, ref: 'Team' },

    //type: { type: Relationship, ref: 'User', many: true },
  },
})
