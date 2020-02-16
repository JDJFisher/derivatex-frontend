<template>
  <div>
    <p class="subtitle is-5 pt-4 has-text-accent">
      Date here
    </p>
    <div class="flex flex-row flex-wrap">
      <ReportThumbnail
        v-for="report in reports"
        :key="report.report_id"
        :report="report"
        class="w-1/6 m-2"
        @view="viewReport(report)"
      />
    </div>
  </div>
</template>

<script>
import ReportModal from "@/components/reports/ReportModal";
import ReportThumbnail from "@/components/reports/ReportThumbnail";

const axios = require("axios");

export default {
  components: {
    ReportThumbnail
  },
  data() {
    return {
      reports: [],
      loading: false,
      modalReport: null
    };
  },
  mounted() {
    this.getReports("2020-01-01", "2019-01-01");
  },
  methods: {
    viewReport(report) {
      this.$store.dispatch('set_report', report);
      this.$buefy.modal.open({
          parent: this,
          component: ReportModal,
          hasModalCard: true,
          trapFocus: true
      })
    },
    getReports(dateFrom, dateTo) {
      this.reports = [];
      this.loading = true;
      var reportsLeftToLoad = 0;
      axios
        .get(
          `${process.env.VUE_APP_API_BASE}/report-management/index-reports/${dateFrom}/${dateTo}`
        )
        .then(response => {
          reportsLeftToLoad = response.data.report_ids.length;
          response.data.report_ids.forEach(reportId => {
            axios
              .get(
                `${process.env.VUE_APP_API_BASE}/report-management/get-report/${reportId}`
              )
              .then(response => {
                var newReport = response.data;
                this.reports.push(newReport);
                reportsLeftToLoad -= 1;
                if (reportsLeftToLoad == 0) {
                  this.loading = false;
                  this.reports.sort((a, b) => a.report_id - b.report_id);
                }
              });
          });
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
