import {App} from '../index'
import {Relationship, Text} from '@keystonejs/fields'

App.keystone.createList('Event', {
  fields: {
    notes: { type: Text, isRequired: true },
    startingDay: { type: Text, isRequired: true },
    endingDay: { type: Text, isRequired: true },
  },
})
