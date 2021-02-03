import { App } from '../controllers/App'
import { Checkbox, File, Password, Text, Select, Relationship } from '@keystonejs/fields'
import { Adapter } from '../../config/adapter'

App.keystone.createList('User', {
  labelField: 'firstName',
  fields: {
    isValidated: { type: Checkbox },
    isOnline: { type: Checkbox },
    isProf: { type: Checkbox },
    subject: { type: Text },
    lastName: { type: Text },
    firstName: { type: Text, isRequired: true },
    email: { type: Text, isUnique: true, isRequired: true },
    password: { type: Password, isRequired: false },
    picture: { type: File, adapter: Adapter },
    role: { type: Select, options: 'Admin, Owner, Member' },
    company: { type: Relationship, ref: 'Company' },
    team: { type: Relationship, ref: 'Team' },
  },
})
