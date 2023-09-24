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
          
          <v-btn color="primary" @click="submitExpense">Submit Expense</v-btn>
        </v-form>

        <p class="font-weight-bold mt-8">Paid by you and split equally</p>
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
      currencies: ['CAD', 'EUR', 'GBP', 'JPY', 'USD', 'AUD'] // Add more as needed
    };
  },
  methods: {
    async submitExpense() {
      if (this.$refs.form.validate()) {
        // Handle the submission logic here. For example:
        // await apiCallToAddExpense(this.description, this.price, this.currency);
        console.log('Expense submitted:', this.description, this.price, this.currency);
      }
    }
  }
};
</script>
