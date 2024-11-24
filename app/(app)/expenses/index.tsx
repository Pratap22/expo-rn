import React from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { Text, List, FAB } from "react-native-paper";
import { Stack, useRouter } from "expo-router";

const Expenses = () => {
  const router = useRouter();
  const expenses = [
    {
      id: "1",
      description: "Dinner",
      amount: 50,
      date: "2024-11-20",
      category: "Food",
    },
    {
      id: "2",
      description: "Uber",
      amount: 15,
      date: "2024-11-19",
      category: "Transport",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          title: "Expenses",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.description}
            description={`$${item.amount} - ${item.category}`}
            left={() => <List.Icon icon="currency-usd" />}
            right={() => <Text>{item.date}</Text>}
            onPress={() =>
              router.push(`/expenses/expense-details?id=${item.id}`)
            }
          />
        )}
        ListEmptyComponent={<Text>No expenses yet. Add one!</Text>}
      />
      <FAB
        icon="plus"
        style={{ position: "absolute", right: 16, bottom: 16 }}
        onPress={() => router.push("/expenses/add-expense")}
      />
    </View>
  );
};

export default Expenses;
