<template>
  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          VIEW ALL DERIVATIVES
        </p>
      </div>
      <div class="level-item italic text-sm has-text-grey">
        {{ this.$store.getters["filterCount"] }} Filters Applied
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  components: {},
  computed: {}
};
</script>
