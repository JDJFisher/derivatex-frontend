<template>
  <div class="relative">
    <b-table
      v-if="actions.length > 0"
      :columns="columns"
      :data="tableData"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    actions: Array
  },
  computed: {
    tableData() {
      return this.actions.map(action => {
        var result = {...action, ...action.update_log};
        result.timestamp = this.$options.filters.formatDateTime(result.timestamp);
        return result;
      });
    }
  },
  data() {
    return {
      columns: [
        {
          field: "derivative_id",
          label: "Derivative ID",
          renderHtml: true
        },
        {
          field: "timestamp",
          label: "Timestamp",
          renderHtml: true
        },
        {
          field: "attribute",
          label: "Attribute",
          renderHtml: true
        },
        {
          field: "old_value",
          label: "Previous Value",
          renderHtml: true
        },
        {
          field: "new_value",
          label: "New Value",
          renderHtml: true
        },
        {
          field: "user_id",
          label: "Supervising User",
          renderHtml: true
        }
      ]
    };
  }
};
</script>
