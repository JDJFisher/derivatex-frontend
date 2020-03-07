<template>
  <div>
    {{ filterString }}
    <multiselect
      v-if="type == 'multiselect'"
      class="mt-4"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      v-model="newValue"
    />
    <datepicker
      class="text-black"
      v-if="type == 'date'"
      v-model="newDate"
      name="datePicker"
    />
    <div v-if="type == 'range'" class="flex flex-row w-full mt-4">
      <div class="flex-auto">
        <vue-numeric
          currency="$"
          v-model="newMin"
          :max="newMax"
          :precision="2"
          class="text-black p-1 rounded shadow w-full bg-white"
        />
      </div>
      <div class="flex-auto px-2 pt-1">
        -
      </div>
      <div class="flex-auto">
        <vue-numeric
          currency="$"
          v-model="newMax"
          :min="newMin"
          :precision="2"
          class="text-black p-1 rounded shadow w-full bg-white"
        />
      </div>
    </div>
    <a class="button is-danger mt-4" @click="remove">
      <TrashCan />
      {{ type == "date" ? "Reset" : "Remove" }}
    </a>
    <a class="button is-accent float-right mt-4" @click="apply">
      <Check />
      Apply
    </a>
  </div>
</template>

<script>
import Moment from "moment";
import { EventBus } from "@/event-bus.js";

import VueNumeric from "vue-numeric";
import Datepicker from "vuejs-datepicker";
import Multiselect from "vue-multiselect";
import Check from "vue-material-design-icons/Check.vue";
import TrashCan from "vue-material-design-icons/TrashCan.vue";

export default {
  components: {
    TrashCan,
    Check,
    Datepicker,
    Multiselect,
    VueNumeric
  },
  props: {
    filterString: String,
    initialValue: { required: true },
    mutation: String,
    options: Array,
    type: String
  },
  mounted() {
    if (this.type == "multiselect") {
      this.newValue = this.initialValue;
    } else if (this.type == "range") {
      this.newMin = this.initialValue.min || 0;
      this.newMax = this.initialValue.max || 0;
    } else if (this.type == "date") {
      this.newDate = this.initialValue.format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      newValue: null,
      newMin: null,
      newMax: null,
      newDate: null
    };
  },
  methods: {
    apply() {
      if (this.newMax == 0) {
        return this.remove();
      }
      var newVal;
      if (this.type == "multiselect") {
        newVal = this.newValue;
      } else if (this.type == "range") {
        newVal = { min: this.newMin, max: this.newMax };
      } else if (this.type == "date") {
        newVal = Moment(this.newDate);
      }
      this.$store.dispatch(this.mutation, newVal);
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      this.newVal = [];
      this.newMin = null;
      this.newMax = null;
      this.newDate = Moment();
      var newVal;
      if (this.type == "multiselect") {
        newVal = [];
      } else if (this.type == "range") {
        newVal = { min: null, max: null };
      } else if (this.type == "date") {
        newVal = Moment();
      }
      this.$store.dispatch(this.mutation, newVal);
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    }
  }
};
</script>
