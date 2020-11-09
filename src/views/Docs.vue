<template>
  <search-modal :display="open"></search-modal>
  <navbar @keyup="keyboardEvent"></navbar>
  <sidebar></sidebar>
  <div class="docs w-64">
    <!-- <h1>This is the docs is for {{ main }} with sub {{ type }}.</h1> -->
    <div class="w-64">
      <div
        v-for="(item, index) in data"
        v-bind:key="index"
        class="ml-64 p-5"
        style="width: 50vw"
      >
        <!-- <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('../assets/logo.png')" title="Woman holding a mug">
        </div> -->
        <div
          class="shadow-lg bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src="../assets/logo.png"
              alt="Avatar of Jonathan Reinink"
            />
            <div class="text-sm">
              <!-- <p class="text-gray-900 leading-none">Jonathan Reinink</p>
              <p class="text-gray-600">Aug 18</p> -->
            </div>
          </div>

          <div class="mb-5">
            <p class="text-sm text-gray-600 flex items-center">
              <span class="text-capitalize">{{ main }} - {{ type }}</span>
            </p>
            <div
              class="text-gray-900 w-full font-bold text-xl mb-3 text-capitalize"
            >
              {{ item.name }}
            </div>
            <p class="text-gray-700 text-base">{{ item.description }}</p>

            <table class="table-auto" style="width: 45vw">
              <thead>
                <tr>
                  <th class="border px-4 py-2">Gender</th>
                  <th class="border px-4 py-2">Level</th>
                  <th class="border px-4 py-2">Job</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border text-center px-4 py-2 text-capitalize">
                    {{ item.gender.replace("SEX_", "").toLowerCase() }}
                  </td>
                  <td class="border text-center px-4 py-2">{{ item.level }}</td>
                  <td class="border text-center px-4 py-2 text-capitalize">
                    {{
                      item.job
                        .replace("JOB_", "")
                        .replace("_", " ")
                        .toLowerCase()
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <pagination
        :no_of_items="pagination"
        :total_items="total_items"
        :page="page"
        :main="main"
        :type="type"
        :next_link="next_link"
        :previous_link="previous_link"
        @on-data-changed="processNewData"
      ></pagination> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import Pagination from "../components/Pagination.vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import SearchModal from "../components/SearchModal.vue";

export default {
  data() {
    return {
      main: "",
      type: "",
      page: 1,
      next_link: "",
      previous_link: "",
      total_items: 0,
      data: [],
      pagination: 0,
      open: false,
    };
  },
  components: {
    // Pagination,
    Sidebar,
    Navbar,
    SearchModal,
  },
  methods: {
    getData() {
      axios
        .get(`item/${this.main}/${this.type}/${this.page}`)
        .then((response) => {
          this.pagination = response.data.pagination_total;
          this.total_items = response.data.total_items;
          this.next_link = response.data.next_link;
          this.previous_link = response.data.previous_link;
          this.data = response.data.items;
        });
    },
    keyboardEvent(e) {
      if (e.which === 191) {
        this.open = !this.open;
      } else if (e.type === "click") {
        this.open = !this.open;
      }
    },
    processNewData(data) {
      this.data = data.items;
    },
  },
  watch: {
    $route(to) {
      this.main = to.params.main;
      this.type = to.params.type;
      this.page = to.params.page;
      this.getData();
    },
  },
  created() {
    this.main = this.$route.params.main;
    this.type = this.$route.params.type;
    this.page = this.$route.params.page;

    if (this.main && this.type && this.page) {
      this.getData();
    }
  },
};
</script>
<style scoped>
.text-capitalize {
  text-transform: capitalize;
}
</style>