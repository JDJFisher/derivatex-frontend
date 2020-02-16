<template>
  <div class="card">
    <div class="card-content clearfix">
      <div class="w-full flex flex-row flex-wrap">
        <div class="font-bold w-1/2">
          Derivatives
        </div>
        <div class="w-1/2 text-right">
          {{ report.report.derivatives.length }}
        </div>
        <div class="w-1/2 font-bold">
          Generated
        </div>
        <div class="w-1/2 text-right">
          {{ report.report.generated }}
        </div>
        <div class="w-1/2 font-bold">
          Status
        </div>
        <div class="w-1/2 text-right">
          {{ report.report.status }}
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" v-if="!download" @click="download=true">
        <Download class="mr-2"/>
        Download
      </a>
      <a
        class="card-footer-item"
        v-if="download"
        style="color:#e1574c;"
        @click="downloadFile('pdf')"
      >
        <FilePdf />
        PDF
      </a>
      <a
        class="card-footer-item"
        v-if="download"
        style="color:#4caf4f;"
        @click="downloadFile('csv')"
      >
        <FileDelimited />
        CSV
      </a>
      <a class="card-footer-item" @click="$emit('view')">
        <FileFind class="mr-2" />
        View
      </a>
    </footer>
  </div>
</template>

<script>
import FilePdf from "vue-material-design-icons/FilePdf.vue";
import Download from "vue-material-design-icons/Download.vue";
import FileFind from "vue-material-design-icons/FileFind.vue";
import FileDelimited from "vue-material-design-icons/FileDelimited.vue";

const axios = require("axios");

export default {
  components: {
    FilePdf,
    Download,
    FileFind,
    FileDelimited,
  },
  props: {
    report: Object
  },
  data() {
    return {
      isActive: true,
      download: false
    };
  },
  methods: {
    downloadFile(type) {
      axios({
        url: `${process.env.VUE_APP_API_BASE}/report-management/download-report/${type}/${this.report.report_id}`,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `report-${this.report.report_id}.${type}`);
        document.body.appendChild(link);
        link.click();
      }).catch(error => {
        this.$buefy.snackbar.open({
          message: "Failed to fetch Reports.<br>" + error,
          type: "is-warning",
          position: "is-top",
          actionText: "Retry",
          indefinite: false,
          onAction: () => {
            this.downloadFile(type);
          }
        });
      });
    }
  }
};
</script>
