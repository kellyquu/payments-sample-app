<template>
  <v-layout>
    <v-flex>

      <!-- Add an Expense Section -->
      <v-card class="body-1 px-6 py-8 mb-4" max-width="800" outlined>
        <h1 class="headline">Add an Expense</h1>
        <v-form class="mt-6" ref="form">
          <v-text-field label="Description" v-model="description" required></v-text-field>
          <v-text-field label="Price" v-model="price" type="number" prefix="$" required></v-text-field>
          <v-combobox label="Currency" v-model="currency" :items="currencies" required></v-combobox>
          <v-select label="Paid by" v-model="paidBy" :items="users" required></v-select>
          <v-select label="For" v-model="selectedUsers" :items="users" multiple required></v-select>

          <v-btn color="primary" @click="addExpense">Submit Expense</v-btn>
        </v-form>
      </v-card>

      <!-- Calculate Expenses Section -->
      <v-card class="body-1 px-6 py-8 mb-4" max-width="800" outlined>
        <h2 class="title">Calculate Expenses</h2>
        <v-list>
          <v-list-item v-for="user in users" :key="user">
            <v-list-item-content>
              <v-list-item-subtitle v-for="otherUser in users.filter(u => u !== user)" :key="otherUser">
                {{ user }} owes {{ otherUser }}: ${{ calculateOwedAmount(user, otherUser) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <!-- Make Payment Section -->
      <v-card class="body-1 px-6 py-8 mb-4" max-width="800" outlined>
        <h2 class="title">Pay back your friends!</h2>
        <p class="font-weight-bold mt-6">Make payment:</p>
        <p>
          <v-btn href="/flow/charge" color="primary"> Settle Up! </v-btn>
        </p>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      price: '',
      currency: '',
      paidBy: '',
      selectedUsers: [],
      users: ['Carolyn', 'Kelly', 'Joanne'],
      currencies: ['CAD', 'EUR', 'GBP', 'JPY', 'USD', 'AUD'],
      expenses: []
    };
  },
  methods: {
    addExpense() {
      if (!this.price || this.selectedUsers.length === 0) {
        alert('Please input the price and select users.');
        return;
      }
      const splitAmount = (parseFloat(this.price) / this.selectedUsers.length).toFixed(2);
      this.expenses.push({
        description: this.description,
        amount: parseFloat(this.price),
        paidBy: this.paidBy,
        splitAmong: this.selectedUsers,
        currency: this.currency,
        splitAmount: splitAmount
      });
      this.description = '';
      this.price = '';
      this.currency = '';
      this.paidBy = '';
      this.selectedUsers = [];
    },
    calculateOwedAmount(owingUser, owedUser) {
      let owes = 0;
      this.expenses.forEach(expense => {
        if (expense.paidBy === owedUser && expense.splitAmong.includes(owingUser)) {
          owes += parseFloat(expense.splitAmount);
        }
      });
      return owes.toFixed(2);
    }
  }
};
</script>
