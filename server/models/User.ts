import { Checkbox, Password, Text } from '@keystonejs/fields'
import { App } from '../controllers/App'

App.keystone.createList('User', {
  labelField: 'name',
  fields: {
    name: { type: Text, isRequired: true },
    email: {
      type: Text,
      isUnique: true,
      access: ({ existingItem, authentication: { item } }) => {
        return (
          process.env.DISABLE_AUTH === 'true' || item === undefined || !!item.isAdmin || existingItem.id === item.id
        )
      },
    },
    isAdmin: { type: Checkbox },
    password: { type: Password, isRequired: false },
  },
  plugins: [],
  access: {},
})
