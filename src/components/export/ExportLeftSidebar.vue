<template>
  <b-menu>
    <b-menu-list label="Filters">
      <b-menu-item class="text-white" :expanded="true">
        <template slot="label">
          Export Filter 1
          <ChevronRight class="float-right" /><br />
          <div
            class="pl-4 w-11/12 truncate ... italic text-sm has-text-grey-light"
          >
            Value Here long value lots of text to see here
          </div>
        </template>
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

export default {
  components: {
    ChevronRight
  },
  computed: {},
  data() {
    return {
      isActive: true
    };
  }
};
</script>
