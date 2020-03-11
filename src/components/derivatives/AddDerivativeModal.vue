<template>
  <div class="modal-card">
    <header class="modal-card-head has-background-primary">
      <p class="modal-card-title has-text-white">Add Derivative</p>
    </header>
    <section class="modal-card-body ms-thin">
      <b-field
        label="Code"
        class="pb-2"
        :type="validation['code'] ? 'is-danger' : ''"
        :message="validation['code'] ? validation['code'] : ''"
      >
        <b-input v-model="formData.code" placeholder="ABC-123"></b-input>
      </b-field>

      <b-field grouped>
        <b-field
          label="Buying Party"
          :type="validation['buying_party'] ? 'is-danger' : ''"
          :message="
            validation['buying_party'] ? validation['buying_party'] : ''
          "
          expanded
        >
          <multiselect
            :options="companies"
            track-by="value"
            label="label"
            v-model="formData.buying_party"
          />
        </b-field>

        <b-field
          label="Selling Party"
          :type="validation['selling_party'] ? 'is-danger' : ''"
          :message="
            validation['selling_party'] ? validation['selling_party'] : ''
          "
          expanded
        >
          <multiselect
            :options="companies"
            track-by="value"
            label="label"
            v-model="formData.selling_party"
          />
        </b-field>
      </b-field>

      <b-field grouped>
        <b-field
          label="Asset"
          :type="validation['asset'] ? 'is-danger' : ''"
          :message="validation['asset'] ? validation['asset'] : ''"
          expanded
        >
          <multiselect :options="assets" v-model="formData.asset" />
        </b-field>

        <b-field
          label="Quantity"
          :type="validation['quantity'] ? 'is-danger' : ''"
          :message="validation['quantity'] ? validation['quantity'] : ''"
        >
          <b-input
            type="number"
            v-model="formData.quantity"
            min="0"
            placeholder="100"
            expanded
          ></b-input>
        </b-field>
      </b-field>

      <b-field grouped>
        <b-field
          label="Currency"
          :type="validation['notional_curr_code'] ? 'is-danger' : ''"
          :message="
            validation['notional_curr_code']
              ? validation['notional_curr_code']
              : ''
          "
          expanded
        >
          <multiselect
            :options="currencies"
            track-by="value"
            label="label"
            v-model="formData.notional_curr_code"
          />
        </b-field>

        <b-field
          label="Strike Price"
          :type="validation['strike_price'] ? 'is-danger' : ''"
          :message="
            validation['strike_price'] ? validation['strike_price'] : ''
          "
        >
          <b-field>
            <p class="control">
              <span
                class="button is-static"
                v-if="formData.notional_curr_code == null"
                >-</span
              >
              <span class="button is-static" v-else>{{
                formData.notional_curr_code.symbol
              }}</span>
            </p>
            <b-input
              type="number"
              step="0.01"
              min="0"
              v-model="formData.strike_price"
              placeholder="100.00"
              expanded
            ></b-input>
          </b-field>
        </b-field>
      </b-field>

      <b-field
        label="Date of Trade"
        :type="validation['date_of_trade'] ? 'is-danger' : ''"
        :message="
          validation['date_of_trade'] ? validation['date_of_trade'] : ''
        "
        expanded
      >
        <b-datepicker
          v-model="formData.date_of_trade"
          placeholder="Select date"
          icon="calendar-today"
        >
        </b-datepicker>
      </b-field>

      <b-field
        label="Maturity Date"
        :type="validation['maturity_date'] ? 'is-danger' : ''"
        :message="
          validation['maturity_date'] ? validation['maturity_date'] : ''
        "
        expanded
      >
        <b-datepicker
          v-model="formData.maturity_date"
          placeholder="Select date"
          icon="calendar-today"
        >
        </b-datepicker>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <div class="w-full h-full">
        <button class="button is-danger" type="button" @click="$parent.close()">
          Cancel
        </button>
        <button
          class="button is-success is-pulled-right"
          type="button"
          @click="add"
        >
          Add Derivative
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import Moment from "moment";
const axios = require("axios");
import { mapGetters } from "vuex";

import Multiselect from "vue-multiselect";

import AddDerivativeErrorModal from "@/components/derivatives/AddDerivativeErrorModal";

export default {
  components: {
    Multiselect
  },
  computed: {
    ...mapGetters(["user", "currencies", "assets", "companies"])
  },
  data() {
    return {
      validation: {},
      formData: {
        code: "",
        buying_party: null,
        selling_party: null,
        asset: null,
        quantity: 0,
        strike_price: 0,
        notional_curr_code: null,
        date_of_trade: null,
        maturity_date: null
      }
    };
  },
  methods: {
    validate() {
      this.validation = {};
      if (this.formData.code == "") {
        this.validation["code"] = "This field is required";
      }
      if (this.formData.buying_party == null) {
        this.validation["buying_party"] = "This field is required";
      }
      if (this.formData.selling_party == null) {
        this.validation["selling_party"] = "This field is required";
      }
      if (this.formData.asset == null) {
        this.validation["asset"] = "This field is required";
      }
      if (this.formData.quantity <= 0) {
        this.validation["quantity"] = "Invalid quantity";
      }
      if (this.formData.notional_curr_code == null) {
        this.validation["notional_curr_code"] = "This field is required";
      }
      if (this.formData.strike_price <= 0) {
        this.validation["strike_price"] = "Invalid strike price";
      }
      if (this.formData.date_of_trade == null) {
        this.validation["date_of_trade"] = "This field is required";
      }
      if (this.formData.maturity_date == null) {
        this.validation["maturity_date"] = "This field is required";
      }
      return Object.keys(this.validation).length == 0;
    },
    checkLearnedBehaviours(derivative) {
      return axios.post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/verify-derivative`,
      {
        derivative: derivative
      });
    },
    add() {
      if (this.validate()) {
        var formData = { ...this.formData };
        formData.notional_curr_code = formData.notional_curr_code.value;
        formData.buying_party = formData.buying_party.value;
        formData.selling_party = formData.selling_party.value;
        formData.strike_price = parseFloat(formData.strike_price);
        formData.quantity = parseInt(formData.quantity);
        formData.date_of_trade = Moment(formData.date_of_trade).format(
          "YYYY-MM-DD"
        );
        formData.maturity_date = Moment(formData.maturity_date).format(
          "YYYY-MM-DD"
        );
        axios
          .post(
            `${process.env.VUE_APP_API_BASE}/derivative-management/add-derivative`,
            {
              derivative: formData,
              user_id: this.user.id
            }
          )
          .then((derivativeResponse) => {
            this.$buefy.snackbar.open({
              message: "Derivative added successfully",
              type: "is-success",
              position: "is-top",
              indefinite: false
            });
            this.checkLearnedBehaviours(formData).then(response => {
              if (response.data.result.length != 0) {
                this.$buefy.modal.open({
                  parent: this,
                  component: AddDerivativeErrorModal,
                  hasModalCard: true,
                  trapFocus: true,
                  props: {
                    derivative: formData,
                    derivativeId: derivativeResponse.data.id,
                    errors: response.data.result
                  }
                });
              }
            });
            this.$parent.close();
          })
          .catch(error => {
            this.$buefy.snackbar.open({
              message: "Failed to create derivative.<br>" + error.response.data,
              type: "is-warning",
              position: "is-top",
              indefinite: false
            });
          });
      }
    }
  }
};
</script>
