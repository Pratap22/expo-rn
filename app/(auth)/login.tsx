import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useAuth } from "../../src/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(app)");
    } catch (error) {
      setLoading(false);
      Alert.alert("Login Failed", "Incorrect email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>

      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        right={<TextInput.Icon icon="email" />}
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!eyeOpen}
        style={styles.input}
        right={
          <TextInput.Icon
            icon={eyeOpen ? "eye" : "eye-off"}
            onPress={() => setEyeOpen(!eyeOpen)}
          />
        }
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>

      <Button onPress={() => router.push("/signup")}>
        Don't have an account? Sign up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
});
