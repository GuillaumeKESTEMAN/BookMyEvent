import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(username);

      if (storedUser) {
        const userData = JSON.parse(storedUser);

        const hashedPassword = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          password
        );

        if (userData.password === hashedPassword) {
          navigation.navigate('Home');
        } else {
          Alert.alert("Error", "Incorrect password.");
        }
      } else {
        Alert.alert("Error", "User not found. Please check your username.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while signing in.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('C:\\Users\\33614\\Desktop\\BookMyEvent\\assets\\5f880320-f299-43ad-965d-a382436e8a96-removebg-preview.png')} 
        style={styles.img}
      />

      <Text
        variant="displaySmall"
        style={styles.title}
      >
        BookMyEvent
      </Text>

      <TextInput
        style={styles.textInput}
        label="Username"
        value={username}
        onChangeText={username => setUsername(username)}
      />

      <TextInput
        style={styles.textInput}
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />

      <Button
        mode="contained"
        buttonColor="#DF621E"
        textColor="#000000"
        style={styles.button}
        onPress={handleSignIn}
      >
        Sign In
      </Button>

      <Button
        mode="contained"
        buttonColor="#DF621E"
        textColor="#000000"
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2A2A",
    justifyContent: "center"
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  textInput: {
    margin: 20,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    marginEnd: 50,
    marginStart: 50,
    height: 50,
    justifyContent: "center"
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  }
});
