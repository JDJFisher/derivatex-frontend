<template>
  <transition name="slide-fade" mode="out-in">
    <b-menu v-if="activeFilter == null">
      <b-menu-list label="Filters">
        <FilterHeader
          filter-name="Date From"
          :filter-string="$options.filters.formatDate(filters.dateFrom)"
          @click="activeFilter = 'dateFrom'"
        />
        <FilterHeader
          filter-name="Date To"
          :filter-string="$options.filters.formatDate(filters.dateTo)"
          @click="activeFilter = 'dateTo'"
        />
      </b-menu-list>
    </b-menu>

    <FilterBody
      filter-string="Date From"
      :initialValue="filters.dateFrom"
      mutation="set_date_from_filter"
      type="date"
      v-else-if="activeFilter == 'dateFrom'"
      @close="activeFilter = null"
    />

    <FilterBody
      filter-string="Date To"
      :initialValue="filters.dateTo"
      mutation="set_date_to_filter"
      type="date"
      v-else-if="activeFilter == 'dateTo'"
      @close="activeFilter = null"
    />
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import FilterBody from "@/components/ui/FilterBody";
import FilterHeader from "@/components/ui/FilterHeader";

export default {
  components: {
    FilterBody,
    FilterHeader
  },
  computed: {
    ...mapGetters(["filters"])
  },
  data() {
    return {
      isActive: true,
      activeFilter: null
    };
  }
};
</script>
