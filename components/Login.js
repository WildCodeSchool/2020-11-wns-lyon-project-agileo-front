import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { gql, useMutation } from '@apollo/client'

const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
      }
    }
  }
`;

const Login = () => {
  const [authenticate, { loading }] = useMutation(AUTHENTICATE, { refetchQueries: ['authenticatedUser'] })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      await authenticate({ variables: { email: email, password: password } })
      Alert.alert('Connexion réussie !')
      
    } catch (error) {
      Alert.alert("Vérifiez l'adresse email et le mot de passe puis réessayez.")
      setEmail('')
      setPassword('')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Agileo</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Mot de passe..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} >
        <Text style={styles.loginText}>{loading ? 'CHARGEMENT...' : 'SE CONNECTER'}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0cada6',
    justifyContent: 'center',
    height:500
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#f79311',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#f79311',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
})
