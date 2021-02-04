import { App } from '../index'
import { Checkbox, File, Password, Text, Select, Relationship } from '@keystonejs/fields'
import { Adapter } from '../../config/adapter'

App.keystone.createList('User', {
  labelField: 'firstName',
  fields: {
    isOnline: { type: Checkbox },
    avatar: { type: Text, isRequired: true },
    subject: { type: Text },
    lastName: { type: Text },
    firstName: { type: Text, isRequired: true },
    email: { type: Text, isUnique: true, isRequired: true },
    password: { type: Password, isRequired: false },
    picture: { type: File, adapter: Adapter },
    role: { type: Select, options: 'Admin, Prof, Student' },
    school: { type: Relationship, ref: 'School' },
    class: { type: Relationship, ref: 'Class' },
  },
})
