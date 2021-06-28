import {App} from '../index'
import {Relationship, Text} from '@keystonejs/fields'

App.keystone.createList('Event', {
    fields: {
        title: {type: Text, isRequired: true},
        notes: {type: Text},
        startDate: {type: Text, isRequired: true},
        endDate: {type: Text, isRequired: true},
        rRule: {type: Text},
        location: {type: Text, isRequired: true},
        type: {type: Text, isRequired: true},
        user: {type: Relationship, ref: 'User'},
    },
})
