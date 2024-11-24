import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Title, Card, Paragraph, Button } from "react-native-paper";
import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";

export type Group = {
  id: string;
  name: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  currency?: string;
  date: string;
  receipt_url?: string;
  group_id?: string;
  created_by?: string;
  group: Group;
};

export type Debt = {
  id: string;
  amount: number;
  from_user_id: string;
  to_user_id: string;
  settled: boolean | null;
  group_id: string;
  created_at: string;
  updated_at: string;
  group: Group;
};

const DashboardScreen = () => {
  const { session } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [pendingDebts, setPendingDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: groupData, error: groupError } = await supabase
          .from("group_members")
          .select("group_id, groups(name)")
          .eq("user_id", session?.user.id);

        if (groupError) throw groupError;

        const mappedGroups: Group[] = groupData.map((item: any) => ({
          id: item.group_id,
          name: item.groups.name,
        }));
        setGroups(mappedGroups);

        const { data: expenseData, error: expenseError } = await supabase
          .from("expenses")
          .select("id, currency, description, amount, date, groups(name)")
          .eq("created_by", session?.user.id)
          .order("date", { ascending: false })
          .limit(5);

        if (expenseError) throw expenseError;

        const mappedExpenses: Expense[] = expenseData.map((item: any) => ({
          id: item.id,
          description: item.description,
          amount: item.amount,
          group: { name: item.groups.name, id: item.groups.id },
          date: item.date,
        }));
        setRecentExpenses(mappedExpenses);

        const { data: debtData, error: debtError } = await supabase
          .from("debts")
          .select("*")
          .eq("from_user_id", session?.user.id)
          .or("settled.is.null, settled.eq.false");

        if (debtError) throw debtError;

        console.log(debtData);
        setPendingDebts(debtData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.id) {
      fetchData();
    }
  }, [session?.user.id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>Welcome, {session?.user.email}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Summary</Title>
          <Paragraph>Groups: {groups.length}</Paragraph>
          <Paragraph>Pending Expenses: {recentExpenses.length}</Paragraph>
          <Paragraph>
            Total Debt: $
            {pendingDebts.reduce((acc, debt) => acc + debt.amount, 0)}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Expenses</Title>
          <FlatList
            data={recentExpenses}
            renderItem={({ item }) => (
              <Paragraph>
                {item.description} - ${item.amount} ({item.group?.name})
              </Paragraph>
            )}
            keyExtractor={(item) => item.id}
          />
        </Card.Content>
      </Card>

      {pendingDebts.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Pending Debts</Title>
            <FlatList
              data={pendingDebts}
              renderItem={({ item }) => (
                <Paragraph>
                  {item.amount} owed to {item.to_user_id} ({item.group?.name})
                </Paragraph>
              )}
              keyExtractor={(item) => item.id}
            />
          </Card.Content>
        </Card>
      )}

      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button}>
          Add Expense
        </Button>
        <Button mode="contained" style={styles.button}>
          Create Group
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default DashboardScreen;
