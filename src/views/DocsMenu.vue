<template>
  <!--Container-->

  <!--Section container-->
  <section class="w-full lg:w-4/5">
    <!--Title-->
    <h1
      class="flex items-center font-semibold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl capitalize"
    >
      {{ menu }}
    </h1>

    <!--divider-->
    <hr class="my-2" />
    <div>
      <div v-for="item in categoryItems.items" :key="item.id">
        <div class="flex flex-row">
          <h2
            class="break-normal text-gray-700 rounded px-2 py-2 text-xl transition duration-200 ease-in-out capitalize"
          >
            <span class="inline-block">
              <img
                class="object-scale-down mr-2 align-middle animate-pulse p-1"
                :src="'/images/' + item.icon"
                alt=""
              />
            </span>
            {{ item.name.toLowerCase() }}
          </h2>
        </div>

        <!--Card-->
        <div class="lg:mt-0 leading-normal rounded shadow bg-white mb-5">
          <div class="p-8">
            <p v-if="item.description != 'N/A'" class="text-gray-700 py-2 px-2">
              {{ item.description }}
            </p>
            <p
              v-else-if="item.description == 'N/A'"
              class="text-red-700 py-2 px-2"
            >
              No available description
            </p>
            <p v-else class="text-red-700 py-2 px-2">
              No available description
            </p>
            <table class="table-fixed mt-2 ml-auto mr-auto">
              <thead>
                <tr class="text-center">
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    Gender
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    Job
                  </td>
                  <td class="w-64 border border-gray-300 px-4 py-2 text-sm">
                    Level
                  </td>
                  <td class="w-64 border border-gray-300 px-4 py-2 text-sm">
                    Effects
                  </td>
                  <!-- <td class="w-64 border border-gray-300 px-4 py-2 text-sm">
                    Attack / Def
                  </td> -->
                  <td class="w-64 border border-gray-300 px-4 py-2 text-sm">
                    Handed
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm capitalize"
                  >
                    {{
                      item.gender === "=" ? "Any" : item.gender.toLowerCase()
                    }}
                  </td>
                  <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm capitalize"
                  >
                    {{
                      item.job === "="
                        ? "Any"
                        : item.job.replace("_", " ").toLowerCase()
                    }}
                  </td>
                  <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm"
                  >
                    {{ item.level == 0 ? 1 : item.level }}
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 text-sm align-middle"
                  >
                    {{ item.effect_1 == "= : =" ? "" : item.effect_1 }} <br />
                    {{ item.effect_2 == "= : =" ? "" : item.effect_2 }} <br />
                    {{ item.effect_3 == "= : =" ? "" : item.effect_3 }}
                  </td>
                  <!-- <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm"
                  >
                    {{ item.ability_min }} - {{ item.ability_max }}
                  </td> -->
                  <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm"
                  >
                    <span v-if="item.handed === 'HD ONE'">One-Handed</span>
                    <span v-else-if="item.handed === 'HD TWO'">Two-Handed</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr class="mt-2" />
          </div>

          <router-link
            :to="`/docs/${menu}/${item.sub_category.name.toLowerCase()}/1`"
          >
            <small>
              <span
                class="bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 py-2 shadow hover:shadow-lg outline-none focus:outline-none mt-5"
                style="transition: all 0.15s ease"
              >
                {{ menu }} / {{ item.sub_category.name }}
              </span>
            </small>
          </router-link>
        </div>
        <!--/Card-->
      </div>
    </div>
    <pagination
      :no_of_items="paginationData.pagination_total"
      :total_items="paginationData.total_items"
      :page="pageDefault"
      :main="menu"
      :next_link="paginationData.next"
      :previous_link="paginationData.previous"
    ></pagination>
  </section>
</template>
  
<script>
import Pagination from "../components/DocsMenuPagination.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      data: [],
      item_data: [],
      menu: "",
      pageDefault: 1,
    };
  },
  methods: {
    ...mapActions(["FETCH_CATEGORIES", "FETCH_CATEGORY_ITEMS"]),
    keyboardEvent(e) {
      if (e.which === 191) {
        this.open = !this.open;
      } else if (e.type === "click") {
        this.open = !this.open;
      }
    },
  },
  watch: {
    $route(to) {
      if (!to.params.type) {
        this.menu = to.params.menu;
        this.pageDefault = to.params.page;
        this.FETCH_CATEGORY_ITEMS({
          name: to.params.menu,
          page: this.pageDefault,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["allCategories", "categoryItems", "paginationData"]),
  },
  created() {
    this.menu = this.$route.params.menu;

    this.FETCH_CATEGORIES();

    this.FETCH_CATEGORY_ITEMS({
      name: this.menu,
      page: this.pageDefault,
    });
  },
};
</script>