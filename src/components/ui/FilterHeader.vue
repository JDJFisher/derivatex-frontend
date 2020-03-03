<template>
  <b-menu-item class="text-white py-2" :expanded="true" @click="$emit('click')">
    <template slot="label">
      {{ filterName }}
      <ChevronRight class="float-right" /><br />
      <div class="pl-4 w-11/12 truncate ... italic text-sm has-text-grey-light">
        {{ filterString }}
      </div>
    </template>
  </b-menu-item>
</template>

<script>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

export default {
  components: {
    ChevronRight
  },
  props: {
    filterName: String,
    filterString: String
  }
};
</script>
