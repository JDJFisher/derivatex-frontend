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
    <div v-if="type == 'range'" class="flex flex-row w-full mt-4">
      <div class="flex-auto">
        <vue-numeric
          currency="$"
          v-model="newMin"
          :max="newMax"
          :precision="2"
          class="text-black p-1 rounded shadow w-full"
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
          class="text-black p-1 rounded shadow w-full"
        />
      </div>
    </div>
    <a class="button is-danger mt-4" @click="remove">
      <TrashCan />
      Remove
    </a>
    <a class="button is-accent float-right mt-4" @click="apply">
      <Check />
      Apply
    </a>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import Multiselect from "vue-multiselect";
import Check from "vue-material-design-icons/Check.vue";
import TrashCan from "vue-material-design-icons/TrashCan.vue";

export default {
  components: {
    TrashCan,
    Check,
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
    if (this.type == 'multiselect') {
      this.newValue = this.initialValue;
    } else {
      this.newMin = this.initialValue.min;
      this.newMax = this.initialValue.max;
    }
  },
  data() {
    return {
      newValue: null,
      newMin: null,
      newMax: null
    };
  },
  methods: {
    apply() {
      if (this.newMax == 0) {
        return this.remove();
      }
      var newVal = this.type == 'multiselect' ? this.newValue : {min: this.newMin, max: this.newMax};
      this.$store.dispatch(this.mutation, newVal);
      this.$emit("close");
    },
    remove() {
      this.newVal = [];
      this.newMin = null;
      this.newMax = null;
      var newVal = this.type == 'multiselect' ? [] : {min: null, max: null};
      this.$store.dispatch(this.mutation, newVal);
      this.$emit("close");
    }
  }
};
</script>
