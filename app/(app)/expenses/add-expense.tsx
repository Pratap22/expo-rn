import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Stack, useRouter } from "expo-router";

const AddExpense = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    console.log({ description, amount, category });
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          title: `New Expense`,
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text variant="titleLarge">Add Expense</Text>
      <TextInput
        mode="outlined"
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={{ marginBottom: 16 }}
      />
      <TextInput
        mode="outlined"
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ marginBottom: 16 }}
      />
      <TextInput
        mode="outlined"
        label="Category"
        value={category}
        onChangeText={setCategory}
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Save
      </Button>
    </View>
  );
};

export default AddExpense;
