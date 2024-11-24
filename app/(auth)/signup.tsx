import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignupScreen() {
  const [eyeOpen, setEyeOpen] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      await signUp(values.email, values.password);
      router.replace("/(app)");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Sign Up</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <>
            <TextInput
              mode="outlined"
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.input}
            />
            {touched.email && errors.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}

            <TextInput
              mode="outlined"
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry={!eyeOpen}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={eyeOpen ? "eye" : "eye-off"}
                  onPress={() => setEyeOpen(!eyeOpen)}
                />
              }
            />
            {touched.password && errors.password && (
              <HelperText type="error">{errors.password}</HelperText>
            )}

            <Button mode="contained" onPress={() => handleSubmit()} style={styles.button}>
              Sign Up
            </Button>

            <Button onPress={() => router.push("/login")}>
              Already have an account? Log in
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
  },
});
