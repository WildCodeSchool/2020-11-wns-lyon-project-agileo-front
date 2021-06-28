import {App} from '../index'
import {Password, Select, Text} from '@keystonejs/fields'

App.keystone.createList('User', {
    labelField: 'firstName',
    fields: {
        pictureUrl: {type: Text},
        subject: {type: Text},
        lastName: {type: Text},
        firstName: {type: Text, isRequired: true},
        email: {type: Text, isUnique: true, isRequired: true},
        password: {type: Password, isRequired: false},
        role: {type: Select, options: 'Admin, Prof, Student'},
    },
})
