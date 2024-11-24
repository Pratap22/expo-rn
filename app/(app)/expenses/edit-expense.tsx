import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";

const EditExpense = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const [description, setDescription] = useState("Dinner");
  const [amount, setAmount] = useState("50");
  const [category, setCategory] = useState("Food");

  const handleUpdate = () => {
    console.log({ id, description, amount, category });
    router.push("/expenses");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          title: `Edit Expense - ${id}`,
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text variant="titleLarge">Edit Expense</Text>
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
      <Button mode="contained" onPress={handleUpdate}>
        Update
      </Button>
    </View>
  );
};

export default EditExpense;
