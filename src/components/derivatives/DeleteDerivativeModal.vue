<template>
  <div class="modal-card">
    <header class="modal-card-head has-background-danger">
      <p class="modal-card-title has-text-white">Delete Derivative</p>
    </header>
    <section class="modal-card-body">
      <p class="text-lg has-text-danger">
        You are about to <b>delete</b> the derivative
        <b>{{ rightSidebarData.code }}</b
        >.
      </p>
      <br />
      <p>
        To confirm this action, please type the derivative code,
        {{ rightSidebarData.code }} into the box below.
      </p>
      <br />
      <b-field class="pb-2">
        <b-input v-model="code" :placeholder="rightSidebarData.code"></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <div class="w-full h-full">
        <button
          class="button is-primary"
          type="button"
          @click="$parent.close()"
        >
          Cancel
        </button>
        <button
          class="button is-danger is-pulled-right"
          type="button"
          @click="deleteDerivative"
          :disabled="code != rightSidebarData.code"
        >
          Delete Derivative
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
const axios = require("axios");
import { mapGetters } from "vuex";
import { EventBus } from "@/event-bus.js";

export default {
  computed: {
    ...mapGetters(["user", "rightSidebarData"])
  },
  data() {
    return {
      code: ""
    };
  },
  methods: {
    deleteDerivative() {
      axios
        .delete(
          `${process.env.VUE_APP_API_BASE}/derivative-management/delete-derivative/${this.rightSidebarData.id}`,
          {
            data: {
              user_id: this.user.id
            }
          }
        )
        .then(() => {
          this.$buefy.snackbar.open({
            message: "successfully deleted derivative",
            type: "is-success",
            position: "is-top",
            indefinite: false
          });
          EventBus.$emit("refreshFilters");
          this.$parent.close();
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Failed to delete derivative.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    }
  }
};
</script>
