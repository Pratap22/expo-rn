type Participant = {
  id: string;
  name: string;
};

type Expense = {
  id: string;
  amount: number;
  paidBy: string;
  participants: string[];
};

export function splitExpenses(
  expenses: Expense[],
  participants: Participant[]
) {
  const balances: { [key: string]: number } = {};
  participants.forEach((p) => (balances[p.id] = 0));

  expenses.forEach((expense) => {
    const paidBy = expense.paidBy;
    const amount = expense.amount;
    const numParticipants = expense.participants.length;
    const sharePerPerson = amount / numParticipants;

    balances[paidBy] += amount;

    expense.participants.forEach((participantId) => {
      balances[participantId] -= sharePerPerson;
    });
  });

  const settlements: { from: string; to: string; amount: number }[] = [];

  while (Object.values(balances).some((balance) => Math.abs(balance) > 0.01)) {
    const maxDebtor = Object.entries(balances).reduce((a, b) =>
      balances[a[0]] < balances[b[0]] ? a : b
    )[0];
    const maxCreditor = Object.entries(balances).reduce((a, b) =>
      balances[a[0]] > balances[b[0]] ? a : b
    )[0];

    const amount = Math.min(
      Math.abs(balances[maxDebtor]),
      balances[maxCreditor]
    );

    balances[maxDebtor] += amount;
    balances[maxCreditor] -= amount;

    settlements.push({ from: maxDebtor, to: maxCreditor, amount });
  }

  return settlements;
}
