<template>
  <search-modal :display="open"></search-modal>
  <navbar @keyup="keyboardEvent"></navbar>
  <sidebar></sidebar>
  <div class="flex flex-col ml-auto mr-auto mt-12">
    <div
      class="bg-white rounded p-4 mt-5 w-screen"
      v-show="!main && !type && !page"
    >
      <div>
        <image-collage></image-collage>
      </div>
    </div>
    <div v-for="(item, index) in data" v-bind:key="index" class="p-5">
      <p class="text-sm text-gray-600">
        <button
          class="button-small bg-green-500 cursor-default focus:outline-none text-white font-body py-2 px-4 capitalize rounded-t"
        >
          <span class="capitalize">{{ main }} / {{ type }}</span>
        </button>
      </p>
      <div class="bg-white rounded p-4" style="width: 50vw">
        <div class="mb-5">
          <div class="text-gray-900 w-full font-bold text-xl mb-3 capitalize">
            {{ item.name }}
          </div>
          <p class="text-gray-700 text-base text-sm">
            {{ item.description }}
          </p>

          <table class="table-auto w-full mt-2">
            <thead>
              <tr>
                <th class="border px-4 py-2">Gender</th>
                <th class="border px-4 py-2">Level</th>
                <th class="border px-4 py-2">Job</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border text-center px-4 py-2 capitalize">
                  {{ item.gender.toLowerCase() }}
                </td>
                <td class="border text-center px-4 py-2">
                  {{ item.level == 0 ? "=" : item.level }}
                </td>
                <td class="border text-center px-4 py-2 capitalize">
                  {{
                    item.job.replace("JOB_", "").replace("_", " ").toLowerCase()
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <pagination
      v-show="page && main && type"
      :no_of_items="pagination_total"
      :total_items="total_items"
      :page="page"
      :main="main"
      :type="type"
      :next_link="next_link"
      :previous_link="previous_link"
    ></pagination>
  </div>
</template>
<script>
import axios from "axios";
import Pagination from "../components/Pagination.vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import SearchModal from "../components/SearchModal.vue";
import ImageCollage from "../components/ImageCollage.vue";

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
      pagination_total: 0,
      open: false,
    };
  },
  components: {
    Pagination,
    Sidebar,
    Navbar,
    SearchModal,
    ImageCollage,
  },
  methods: {
    getData() {
      axios
        .get(`user/item/${this.main}/${this.type}/${this.page}`)
        .then((response) => {
          this.pagination_total = response.data.pagination_total;
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
    // processNewData(data) {
    //   this.data = data.items;
    // },
  },
  watch: {
    $route(to) {
      if (to.params.main && to.params.type && to.params.page) {
        this.main = to.params.main;
        this.type = to.params.type;
        this.page = to.params.page;
        this.getData();
      }
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
