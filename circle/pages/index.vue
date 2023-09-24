<template>
  <v-layout>
    <v-flex>
      <v-card class="body-1 px-6 py-8 mb-4" max-width="800" outlined>
        <h1 class="headline">Add an Expense</h1>

        <v-form class="mt-6" ref="form">
          <v-text-field
            label="Description"
            v-model="description"
            required
          ></v-text-field>

          <v-text-field
            label="Price"
            v-model="price"
            type="number"
            prefix="$"
            required
          ></v-text-field>

          <v-combobox
            label="Currency"
            v-model="currency"
            :items="currencies"
            required
          ></v-combobox>

          <v-select
            label="Paid by"
            v-model="paidBy"
            :items="users"
            required
          ></v-select>

          <v-select
            label="For"
            v-model="selectedUsers"
            :items="users"
            multiple
            required
          ></v-select>

          <v-btn color="primary" @click="splitExpense">Split Equally</v-btn>
        </v-form>
      </v-card>

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
      users: ['User1', 'User2', 'User3'],
      currencies: ['CAD', 'EUR', 'GBP', 'JPY', 'USD', 'AUD']
    };
  },
  methods: {
    splitExpense() {
      if (!this.price || this.selectedUsers.length === 0) {
        alert('Please input the price and select users.');
        return;
      }

      const splitAmount = (parseFloat(this.price) / this.selectedUsers.length).toFixed(2);
      alert(`Each user owes: $${splitAmount}`);
    }
  }
};
</script>
