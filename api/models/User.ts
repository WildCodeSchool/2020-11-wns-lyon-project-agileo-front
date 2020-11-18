import { App } from '../index'
import { Password, Relationship, Select, Text } from '@keystonejs/fields'

App.keystone.createList('User', {
  labelField: 'firstName',
  fields: {
    pictureUrl: { type: Text },
    class: { type: Relationship, ref: 'Class' },
    subject: { type: Text },
    lastName: { type: Text },
    firstName: { type: Text, isRequired: true },
    email: { type: Text, isUnique: true, isRequired: true },
    password: { type: Password, isRequired: false },
    role: { type: Select, options: 'Admin, Prof, Student' },
    school: { type: Relationship, ref: 'School' },
  },
})
