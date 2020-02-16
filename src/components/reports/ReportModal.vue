<template>
  <div class="modal-card">
      <header class="modal-card-head">
          <p class="modal-card-title">View Report</p>
      </header>
      <section class="modal-card-body">
          {{ report }}
      </section>
      <footer class="modal-card-foot">
          <button class="button is-primary" type="button" @click="$parent.close()">Close</button>
      </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    report: Object
  },
  computed: {
    ...mapGetters(["report"]),
  }
};
</script>
