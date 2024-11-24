import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Title, Card, Paragraph } from "react-native-paper";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/contexts/AuthContext";
import { splitExpenses } from "../../utils/expenseSplitting";

type Expense = {
  id: string;
  amount: number;
  paidBy: string;
  participants: string[];
};

type Friend = {
  id: string;
  name: string;
};

type Settlement = {
  from: string;
  to: string;
  amount: number;
};

export default function ReportsScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const { session } = useAuth();

  useEffect(() => {
    fetchExpenses();
    fetchFriends();
  }, []);

  useEffect(() => {
    if (expenses.length > 0 && friends.length > 0) {
      const calculatedSettlements = splitExpenses(expenses, friends);
      setSettlements(calculatedSettlements);
    }
  }, [expenses, friends]);

  const fetchExpenses = async () => {
    const { data, error } = await supabase.from("expenses").select("*");

    if (error) {
      console.error("Error fetching expenses:", error);
    } else {
      setExpenses(data || []);
    }
  };

  const fetchFriends = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select("*")
      .eq("user_id", session?.user.id);

    if (error) {
      console.error("Error fetching friends:", error);
    } else {
      setFriends(data || []);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Expense Reports</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>
            Total Expenses: $
            {expenses
              .reduce((sum, expense) => sum + expense.amount, 0)
              .toFixed(2)}
          </Paragraph>
        </Card.Content>
      </Card>
      <Title style={styles.subtitle}>Settlements</Title>
      {settlements.map((settlement, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Paragraph>{`${settlement.from} owes ${
              settlement.to
            }: $${settlement.amount.toFixed(2)}`}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
});
