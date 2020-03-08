<template>
  <div class="modal-card">
    <header class="modal-card-head has-background-danger">
      <p class="modal-card-title has-text-white">Warning</p>
    </header>
    <section class="modal-card-body ms-thin">

      <p>
        Error(s) have been found with your input. Please review the errors below.
      </p>

      <br>

      <div v-if="automatedErrors.length > 0">
        <h1 class="title is-5">Automated Errors</h1>
        <p class="italic">
          The following errors are automated and have been fixed automatically. No further actions is required.
        </p>
        <br>
        <div v-for="error in automatedErrors" :key="error.id">
          <b>{{ error.suggested_feature | titleCase }}</b> - You entered: <b>{{ derivative[error.suggested_feature] }}</b>, the correct value should be <b>{{ error.suggested_value }}</b>.
        </div>
        <hr>
      </div>


      <div v-if="nonAutomatedErrors.length > 0">
        <h1 class="title is-5">Non-Automated Errors</h1>
        <p class="italic">
          The following errors are not automated and must be reviewed manually.
        </p>
        <br>
        <div v-for="error in nonAutomatedErrors" :key="error.id">
          <b>{{ error.suggested_feature | titleCase }}</b> -
          You entered: <b-field><b-input class="w-3/4" :id="`input-${error.id}`" :value="derivative[error.suggested_feature]"></b-input>
          <b-button :class="completedErrors.includes(error.id) ? 'is-light' : 'is-success'" class="ml-2" @click="updateFromField(`input-${error.id}`, error.suggested_feature, error.id)">Update</b-button></b-field>
          previous updates show that this could be incorrect.
          <p v-if="error.suggested_value"> The correct value could be <b>{{ error.suggested_value }}</b>.</p>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="w-full h-full">
        <button
          class="button is-danger"
          type="button"
          @click="$parent.close"
        >
          Ignore
        </button>
        <button
          class="button is-success is-pulled-right"
          type="button"
          @click="$parent.close"
        >
          Resolve
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  props: {
    derivative: Object,
    derivativeId: Number,
    errors: Array,
  },
  data() {
    return {
        completedErrors: []
      };
  },
  computed: {
    automatedErrors() {
      return this.errors.filter(error => error.automated);
    },
    nonAutomatedErrors() {
      return this.errors.filter(error => !error.automated);
    }
  },
  methods: {
    updateFromField(fieldId, field, error_id) {
      var value = document.getElementById(fieldId).value;
      this.update(field, value, error_id);
      this.completedErrors.push(error_id);
    },
    update(field, value, error_id) {
      var updates = {};
      updates[field] = value;
      axios
        .post(`${process.env.VUE_APP_API_BASE}/derivative-management/update-derivative/${this.derivativeId}`,
        {
          updates: updates,
          user_id: this.$store.getters['user'].id,
          tree_id: error_id
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Failed to modify derivative.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    }
  },
  mounted() {
    this.automatedErrors.forEach(error => {
      this.update(error.suggested_feature, error.suggested_value, error.id);
    });
  }
};
</script>
