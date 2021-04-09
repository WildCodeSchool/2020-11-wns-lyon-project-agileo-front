import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { useAuth } from "../contexts/AuthContext";

const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
      }
        token
    }
  }
`

const Login = () => {
  const [authenticate, { loading,data }] = useMutation(AUTHENTICATE, { refetchQueries: ['authenticatedUser'] })
  const [email, setEmail] = useState('abdel@agileo.com')
  const [password, setPassword] = useState('123456789')
  const auth = useAuth();
  

  const handleSubmit = async () => {
    try {
      await authenticate({ variables: { email: email, password: password } })
      const response = await data && data.authenticateUserWithPassword
      if(response)
      auth.signin(response, () => {
      });
      alert('Login Success !')
      
    } catch (error) {
      alert('Please check your email and password then try again.')
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
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} >
        <Text style={styles.loginText}>{loading ? 'LOADING...' : 'LOGIN'}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#003f5c',
    justifyContent: 'center',
    height:500
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
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
    backgroundColor: '#fb5b5a',
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
