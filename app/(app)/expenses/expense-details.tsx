import React from "react";
import { View } from "react-native";
import { Text, Button, Divider, Appbar } from "react-native-paper";
import { useRouter, useLocalSearchParams, useSegments, Stack } from "expo-router";

const ExpenseDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const expense = {
    id,
    description: "Dinner",
    amount: 50,
    category: "Food",
    date: "2024-11-20",
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          title: `Expense - ${id}`,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text variant="titleLarge">{expense.description}</Text>
      <Divider style={{ marginVertical: 16 }} />
      <Text>Amount: ${expense.amount}</Text>
      <Text>Category: {expense.category}</Text>
      <Text>Date: {expense.date}</Text>
      <Divider style={{ marginVertical: 16 }} />
      <Button
        mode="contained"
        onPress={() => router.push(`/expenses/edit-expense?id=${expense.id}`)}
      >
        Edit Expense
      </Button>
    </View>
  );
};

export default ExpenseDetails;
