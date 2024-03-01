import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "../Assets/navkar.jpg";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    setUsername('');
    setPassword('');
    navigation.navigate('companylist');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoComplete='off'
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoComplete='off'
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    color: 'black',  
    borderWidth: 2,
    borderColor: '#ccc',  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  loginButton: {
    backgroundColor: '#086025',
    padding: 10,
    borderRadius: 50,
    width:"30%"
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Login;
