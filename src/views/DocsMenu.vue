<template>
  <!--Container-->

  <!--Section container-->
  <section class="w-full lg:w-4/5">
    <!--Title-->
    <h1
      class="flex items-center font-semibold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl"
    >
      {{ data.name }}
    </h1>

    <!--divider-->
    <hr class="my-2" />
    <div class="w-full px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-state"
      >
        Select
      </label>
      <div class="relative">
        <select
          @change="find"
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 capitalize"
        >
          <option
            v-for="(sub_category, index) in data.sub_category"
            :selected="index == 0 ? true : false"
            :key="sub_category.id"
            :value="index"
          >
            {{ sub_category.name.toLowerCase() }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
    <hr class="my-2" />
    <div v-for="item in item_data.items" :key="item.id">
      <h2
        class="break-normal text-gray-700 px-2 py-2 text-xl transition duration-200 ease-in-out hover:text-green-500 capitalize"
      >
        # {{ item.name.toLowerCase() }}
      </h2>

      <!--Card-->
      <div class="lg:mt-0 leading-normal rounded shadow bg-white mb-5">
        <div class="p-8">
          <p v-if="item.description" class="text-gray-700 py-2 px-2">
            {{ item.description }}
          </p>
          <p v-else class="text-red-700 py-2 px-2">No available description</p>
          <table class="table-fixed mt-2 ml-auto mr-auto">
            <thead>
              <tr class="text-center">
                <td class="w-64 px-4 py-2 capitalize">
                  Gender:
                  {{ item.gender === "=" ? "Any" : item.gender.toLowerCase() }}
                </td>
                <td class="w-64 px-4 py-2 capitalize">
                  Job:
                  {{
                    item.job === "="
                      ? "Any"
                      : item.job.replace("_", " ").toLowerCase()
                  }}
                </td>
                <td class="w-64 px-4 py-2">
                  Level: {{ item.level == 0 ? "1 - Max" : item.level }}
                </td>
              </tr>
            </thead>
          </table>
          <hr class="" />
        </div>
        <small>
          <span
            class="bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 py-2 shadow hover:shadow-lg outline-none focus:outline-none mt-5"
            style="transition: all 0.15s ease"
          >
            {{ data.name }} / {{ item_data.name }}
          </span>
        </small>
      </div>
      <!--/Card-->
    </div>
  </section>
</template>
  
<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      data: [],
      item_data: [],
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
      axios
        .get(`user/category/${this.$route.params.id}/items`)
        .then((response) => {
          this.data = response.data;
          this.item_data = this.data.sub_category[0];
          this.isLoading = false;
        });
    },
    find(e) {
      let index = e.target.value;
      this.item_data = this.data.sub_category[index];
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