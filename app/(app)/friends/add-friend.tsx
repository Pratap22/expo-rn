import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { supabase } from '../../../src/lib/supabase';
import { useAuth } from '../../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function AddFriendScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { session } = useAuth();
  const router = useRouter();

  const handleAddFriend = async () => {
    const { data, error } = await supabase
      .from('friends')
      .insert({
        name,
        email,
        user_id: session?.user.id,
      });

    if (error) {
      console.error('Error adding friend:', error);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Add Friend</Title>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddFriend} style={styles.button}>
        Add Friend
      </Button>
    </View>
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
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});

