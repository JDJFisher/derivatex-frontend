<template>
  <div>
    <div v-for="reportDate in allDates" :key="reportDate">
      <p class="subtitle is-5 has-text-accent">
        {{ reportDate | formatDate }}
      </p>
      <div class="flex flex-row flex-wrap">
        <ReportThumbnail
          v-for="report in reports[reportDate]"
          :key="report.report_id"
          :report="report"
          class="w-1/6 m-2 mt-0 mb-8"
          @view="viewReport(report)"
        />
        <ReportThumbnailPlaceholder
            v-if="pendingReports.includes(reportDate) || !reports[reportDate]"
            :date="reportDate"
            :other-reports="reports[reportDate]"
            :no-derivatives="!reports[reportDate] && !pendingReports.includes(reportDate)"
            @refresh="refresh"
            class="w-1/6 m-2 mt-0 mb-8"
        />
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { mapGetters } from "vuex";

import ReportModal from "@/components/reports/ReportModal";
import ReportThumbnail from "@/components/reports/ReportThumbnail";
import ReportThumbnailPlaceholder from "@/components/reports/ReportThumbnailPlaceholder";


export default {
  components: {
    ReportThumbnail,
    ReportThumbnailPlaceholder
  },
  data() {
    return {
      reports: [],
      loading: false,
      modalReport: null,
      pendingReports: []
    };
  },
  computed: {
    ...mapGetters(["filters"]),
    allDates() {
        var result = [];
        var date = this.filters.dateFrom.clone();
        while (date <= this.filters.dateTo) {
            result.push(date.clone().format('YYYY-MM-DD'));
            date = date.add(1, 'day');
        }
        return result;
    }
  },
  mounted() {
    this.indexReports();
    this.indexPendingReports();
  },
  methods: {
    indexPendingReports() {
        axios
          .get(
            `${process.env.VUE_APP_API_BASE}/reporting/index-pending-reports`
          )
          .then(response => {
            this.pendingReports = response.data.dates;
          });
    },
    refresh() {
        this.indexReports();
        this.indexPendingReports();
    },
    indexReports() {
      var dateTo = this.$options.filters.formatDateJson(this.filters.dateTo);
      var dateFrom = this.$options.filters.formatDateJson(this.filters.dateFrom);
      this.getReports(dateFrom, dateTo);
    },
    viewReport(report) {
      this.$store.dispatch('set_report', report);
      this.$buefy.modal.open({
          parent: this,
          component: ReportModal,
          hasModalCard: true,
          trapFocus: true,
          fullScreen: true
      });
    },
    getReports(dateFrom, dateTo) {
      this.reports = [];
      this.loading = true;
      axios
        .get(
          `${process.env.VUE_APP_API_BASE}/reporting/index-reports?from_date=${dateFrom}&to_date=${dateTo}`
        )
        .then(response => {
          this.reports = {};
          response.data.reports.forEach(report => {
            report.status = "REDACTED";
            if (this.reports[report.target_date]) {
              this.reports[report.target_date].push(report)
            } else {
              this.reports[report.target_date] = [report]
            }
          });
          Object.keys(this.reports).forEach(reportDate => {
            this.reports[reportDate][this.reports[reportDate].length - 1].status = "ACTIVE"
          })
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Failed to fetch Reports.<br>" + error,
            type: "is-warning",
            position: "is-top",
            actionText: "Retry",
            indefinite: false,
            onAction: () => {
              this.getReports(dateFrom, dateTo);
            }
          });
        });
    }
  }
};
</script>
