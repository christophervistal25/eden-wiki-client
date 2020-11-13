<template>
  <search-modal :display="open"></search-modal>
  <navbar @keyup="keyboardEvent"></navbar>
  <sidebar></sidebar>
  <div class="flex flex-col ml-auto mr-auto mt-12">
    <div class="p-5" v-if="!isLoading">
      <div
        v-for="sub_category in data.sub_category"
        :key="sub_category.id"
        class="mb-5"
      >
        <div v-for="(item, i) in sub_category.items" :key="i">
          <p class="text-sm text-gray-600">
            <button
              class="button-small bg-green-500 cursor-default focus:outline-none text-white font-body py-2 px-4 capitalize rounded-t"
            >
              <span class="capitalize"
                >{{ data.name }} / {{ sub_category.name.toLowerCase() }}</span
              >
            </button>
          </p>
          <div class="bg-white rounded p-4 mb-5" style="width: 50vw">
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
    </div>
    <div v-else>
      <p
        class="mt-12 bg-green-500 focus:outline-none text-white font-body py-2 px-4 capitalize"
      >
        Loading Data...
      </p>
    </div>
  </div>
</template>
  
<script>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import SearchModal from "../components/SearchModal.vue";
import axios from "axios";

export default {
  components: {
    Sidebar,
    Navbar,
    SearchModal,
  },
  data() {
    return {
      open: false,
      isLoading: true,
      data: [],
    };
  },
  methods: {
    keyboardEvent(e) {
      if (e.which === 191) {
        this.open = !this.open;
      } else if (e.type === "click") {
        this.open = !this.open;
      }
    },
    getData() {
      this.items = [];
      this.isLoading = true;
      axios
        .get(`user/category/${this.$route.params.id}/items`)
        .then((response) => {
          this.data = response.data;
          this.isLoading = false;
        });
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.id != from.params.id) {
        this.getData();
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>