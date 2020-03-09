<template>
  <div class="modal-card">
    <header class="modal-card-head has-background-primary">
      <p class="modal-card-title has-text-white">View Learned Behaviour</p>
    </header>
    <section class="modal-card-body ms-thin">
      <div class="flex flex-row h-full">
        <div class="w-1/2 p-4 h-full flex flex-col">
          <div class="" style="height: 65%;">
            <div class="box h-full">
              <h1 class="title is-5">Decision Tree</h1>
              <RootNodeDisplay
                :node="learnedBehaviour"
                class="overflow-auto"
                style="margin-top:-1.4rem; height: 95%; margin-left:-1rem; margin-right: -1rem;"
              />
            </div>
          </div>
          <div class="h-1/2 py-4">

            <div class="box">

              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Confidence</p>
                    <p class="title">{{ learnedBehaviour.confidence }}%</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Flags</p>
                    <p class="title">{{ learnedBehaviour.last_flag_count }}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Corrections</p>
                    <p class="title">{{ learnedBehaviour.actions.length }}</p>
                  </div>
                </div>
              </nav>

            </div>
            <div class="box">

              <h1 class="title is-5">Details</h1>

              <b-field label="Description" expanded>
                <b-input v-model="newDescription" placeholder="Enter a description..."></b-input>
              </b-field>

              <b-button @click="saveDescription" :loading="savingDescription" :disabled="savingDescription" class="is-pulled-right is-success" v-if="newDescription != learnedBehaviour.description">
                Save
              </b-button>


              <nav class="level my-8">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Approved</p>
                    <b-switch v-model="newApproved" class="pt-2"></b-switch>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Automated</p>
                    <b-switch v-model="newAutomated" :disabled="!learnedBehaviour.suggested_value || !learnedBehaviour.approved" class="pt-2"></b-switch>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Automation Field</p>
                    <multiselect
                      :options="['buying_party', 'selling_party', 'asset', 'quantity', 'strike_price', 'notional_curr_code', 'date_of_trade', 'maturity_date']"
                      v-model="newFeature"
                      :disabled="savingFeature"
                      :loading="savingFeature"
                      @input="saveFeature"
                    />
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Automation Value</p>
                    <b-field class="is-pulled-left">
                      <b-input v-model="newValue" placeholder="Enter a value..."></b-input>
                    </b-field>
                    <b-button @click="saveValue" :loading="savingValue" :disabled="savingValue" class="ml-2 is-success" v-if="newValue != learnedBehaviour.suggested_value">
                      Save
                    </b-button>
                  </div>
                </div>
              </nav>

            </div>
          </div>
        </div>
        <div class="w-1/2 p-4 h-full">
          <div class="box" style="height: 50%;">
            <h1 class="title is-5">Flags</h1>
            <Flags
              class="w-full h-full overflow-auto"
              style="height: 90%;"
              :node="learnedBehaviour"
            />
          </div>
          <div class="box" style="height: 50%;">
            <h1 class="title is-5">Corrections</h1>
            <Corrections
              class="w-full overflow-auto"
              style="height: 90%;"
              :actions="learnedBehaviour.actions"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const axios = require("axios");
import { mapGetters } from "vuex";
import { EventBus } from "@/event-bus.js";

import Multiselect from "vue-multiselect";
import Flags from "@/components/error_detection/Flags"
import Corrections from "@/components/error_detection/Corrections"
import RootNodeDisplay from "@/components/error_detection/RootNodeDisplay"

export default {
  components: {
    Flags,
    Corrections,
    Multiselect,
    RootNodeDisplay
  },
  data() {
    return {
      newDescription: "",
      newFeature: "",
      newValue: "",
      newApproved: false,
      newAutomated: false,
      savingDescription: false,
      savingValue: false,
      savingFeature: false
    }
  },
  mounted() {
    this.newDescription = this.learnedBehaviour.description;
    this.newApproved = this.learnedBehaviour.approved;
    this.newAutomated = this.learnedBehaviour.automated;
    this.newFeature = this.learnedBehaviour.suggested_feature;
    this.newValue = this.learnedBehaviour.suggested_value;
  },
  computed: {
    ...mapGetters(["learnedBehaviour"]),
  },
  watch: {
    newApproved: function() {
      if (this.newApproved != this.learnedBehaviour.approved) {
        axios
          .post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/update-tree/${this.learnedBehaviour.id}`,
           {updates: {approved: this.newApproved, automated: false}}
           )
          .then(() => {
            var newLearnedBehaviour = {...this.learnedBehaviour};
            newLearnedBehaviour.approved = this.newApproved;
            newLearnedBehaviour.automated = false;
            this.newAutomated = false;
            this.$store.dispatch("set_learned_behaviour", newLearnedBehaviour);
            EventBus.$emit("refreshLB");
          })
          .catch(error => {
            this.$buefy.snackbar.open({
              message: "Failed to update learned behaviour.<br>" + error.response.data,
              type: "is-warning",
              position: "is-top",
              indefinite: false
            });
          });
      }
    },
    newAutomated: function() {
      if (this.newAutomated != this.learnedBehaviour.automated) {
        axios
          .post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/update-tree/${this.learnedBehaviour.id}`,
           {updates: {automated: this.newAutomated}}
           )
          .then(() => {
            var newLearnedBehaviour = {...this.learnedBehaviour};
            newLearnedBehaviour.automated = this.newAutomated;
            this.$store.dispatch("set_learned_behaviour", newLearnedBehaviour);
            EventBus.$emit("refreshLB");
          })
          .catch(error => {
            this.$buefy.snackbar.open({
              message: "Failed to update learned behaviour.<br>" + error.response.data,
              type: "is-warning",
              position: "is-top",
              indefinite: false
            });
          });
      }
    }
  },
  methods: {
    saveDescription() {
      this.savingDescription = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/update-tree/${this.learnedBehaviour.id}`,
         {updates: {description: this.newDescription}}
         )
        .then(() => {
          this.savingDescription = false;
          var newLearnedBehaviour = {...this.learnedBehaviour};
          newLearnedBehaviour.description = this.newDescription;
          this.$store.dispatch("set_learned_behaviour", newLearnedBehaviour);
          EventBus.$emit("refreshLB");
        })
        .catch(error => {
          this.savingDescription = false;
          this.$buefy.snackbar.open({
            message: "Failed to update learned behaviour.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    },
    saveValue() {
      this.savingValue = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/update-tree/${this.learnedBehaviour.id}`,
         {updates: {suggested_value: this.newValue}}
         )
        .then(() => {
          this.savingValue = false;
          var newLearnedBehaviour = {...this.learnedBehaviour};
          newLearnedBehaviour.suggested_value = this.newValue;
          this.$store.dispatch("set_learned_behaviour", newLearnedBehaviour);
          EventBus.$emit("refreshLB");
        })
        .catch(error => {
          this.savingValue = false;
          this.$buefy.snackbar.open({
            message: "Failed to update learned behaviour.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    },
    saveFeature() {
      this.savingFeature = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/update-tree/${this.learnedBehaviour.id}`,
         {updates: {suggested_feature: this.newFeature}}
         )
        .then(() => {
          this.savingFeature = false;
          var newLearnedBehaviour = {...this.learnedBehaviour};
          newLearnedBehaviour.suggested_feature = this.newFeature;
          this.$store.dispatch("set_learned_behaviour", newLearnedBehaviour);
          EventBus.$emit("refreshLB");
        })
        .catch(error => {
          this.savingFeature = false;
          this.$buefy.snackbar.open({
            message: "Failed to update learned behaviour.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    }
  }
};
</script>
