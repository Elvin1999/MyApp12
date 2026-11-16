import { loginUser } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          router.replace("/");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await loginUser(username, password);

      if (res.accessToken) {
        await AsyncStorage.setItem("token", res.accessToken);
        router.replace("/");
      } else {
        Alert.alert("Error", "Invalid Credentials!");
      }
    } catch (error) {
      Alert.alert("Error", "There is a problem in login!");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Username</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      <Button title="Sign IN" onPress={handleLogin}></Button>
    </View>
  );
}
