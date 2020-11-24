<template>
  <!--Container-->

  <!--Section container-->
  <section class="w-full lg:w-4/5">
    <!--Title-->
    <h1
      class="flex items-center font-semibold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl capitalize"
    >
      {{ main }} / {{ type }}
    </h1>

    <!--divider-->
    <hr class="my-2" />

    <div v-for="item in data" :key="item.id">
      <div class="flex flex-row">
        <h2
          class="break-normal text-gray-700 px-2 py-2 text-xl transition duration-200 ease-in-out hover:text-green-500 capitalize"
        >
          <span class="inline-block">
            <img
              class="object-scale-down mr-2 animate-pulse p-1"
              :src="'/images/' + item.icon"
              alt="" /></span
          >{{ item.name.toLowerCase() }}
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
          <p v-else class="text-red-700 py-2 px-2">No available description</p>
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
              <tr class="text-center">
                <td
                  class="text-center w-64 border border-gray-300 px-4 py-2 text-sm capitalize"
                >
                  {{ item.gender === "=" ? "Any" : item.gender.toLowerCase() }}
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

          <span v-if="item.set">
            <small class="float-right cursor-pointer" @click="viewSet(item)">
              <span
                class="bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 py-2 shadow hover:shadow-lg outline-none focus:outline-none mt-5"
                style="transition: all 0.15s ease"
              >
                View set
              </span>
            </small>
            <div class="clearfix"></div>
            <!-- <p class="tex-sm">{{ item.set.parts }}</p> -->
            <!-- <p class="tex-sm">{{ item.set.effects }}</p> -->
          </span>
          <!-- <hr /> -->
        </div>
        <!-- <small>
          <span
            class="bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 py-2 shadow hover:shadow-lg outline-none focus:outline-none mt-5"
            style="transition: all 0.15s ease"
          >
          </span>
        </small> -->
      </div>
      <!--/Card-->
    </div>
    <pagination
      :no_of_items="pagination_total"
      :total_items="total_items"
      :page="page"
      :main="main"
      :type="type"
      :next_link="next_link"
      :previous_link="previous_link"
    ></pagination>
  </section>

  <div>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <!-- <img
              class="object-scale-down mr-2"
              :src="'/images/' + set.icon"
              alt=""
            /> -->

            <h3 class="text-2xl font-semibold capitalize">
              {{ set.title.split(" ")[0] }} Set
            </h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModal()"
            >
              <span
                class="bg-transparent text-red-500 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative px-6 py-2 flex-auto">
            <span class="text-lg leading-relaxed">
              <p
                v-if="set.description != 'N/A'"
                class="text-gray-700 py-2 px-2"
              >
                {{ set.description }}
              </p>
              <p
                v-else-if="set.description == 'N/A'"
                class="text-red-700 py-2 px-2"
              >
                No available description
              </p>
            </span>
            <hr />

            <span class="font-semibold">Parts : </span>
            <div class="container mt-0">
              <div class="flex flex-row">
                <img
                  class="object-contain mr-2"
                  v-for="(icon, index) in getIcons(set.type, set.icon)"
                  :key="index"
                  :src="'/images/' + icon"
                  alt=""
                />
              </div>

              <span
                class="capitalize"
                v-for="(effect, index) in JSON.parse(set.parts)"
                :key="index"
              >
                <button
                  class="ml-2 bg-green-500 text-white active:bg-green-600 uppercase text-sm px-3 outline-none focus:outline-none mt-3"
                  style="transition: all 0.15s ease"
                >
                  {{
                    effect
                      .replace(/_/gi, " ")
                      .replace(/parts/gi, "")
                      .toLowerCase()
                  }}
                </button>
              </span>
            </div>

            <hr class="my-2" />
            <span class="font-semibold">Set Effect :</span>
            <table class="table-fixed mt-2 ml-auto mr-auto">
              <thead>
                <tr class="text-center font-semibold">
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    No of parts
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    Attributes
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 capitalize text-sm"
                  >
                    Attributes Value
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(effect, index) in JSON.parse(set.effects)"
                  :key="index"
                >
                  <td
                    class="text-center w-64 border border-gray-300 px-4 py-2 text-sm capitalize"
                  >
                    {{ index.split("_")[index.split("_").length - 1] }}/{{
                      set.no_of_parts
                    }}
                  </td>
                  <td
                    class="w-64 border border-gray-300 px-4 py-2 text-sm capitalize"
                  >
                    {{
                      index
                        .replace(/_/gi, " ")
                        .replace(/^DST/, "")
                        .replace(/\d+/gi, "")
                    }}
                  </td>
                  <td
                    class="w-64 text-center border border-gray-300 px-4 py-2 text-sm capitalize"
                  >
                    {{ effect }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>
  
<script>
import axios from "axios";
import Pagination from "../components/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { getIcons } from "../custom/helpers.js";
export default {
  data() {
    return {
      data: [],

      main: "",
      type: "",
      page: 1,

      next_link: "",
      previous_link: "",
      total_items: 0,
      pagination_total: 0,

      showModal: false,
      set: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    ...mapActions(["FETCH_CATEGORIES"]),
    getIcons,
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
    viewSet(item) {
      this.toggleModal();
      this.set.title = `${item.name.toLowerCase().replace("box", "")} Set`;
      this.set.type = item.set.type;
      this.set.description = item.description;
      this.set.parts = item.set.parts;
      this.set.effects = item.set.effects;
      this.set.icon = item.icon;
      this.set.no_of_parts = Object.keys(JSON.parse(item.set.parts)).length;
    },

    // getIcons(type, selectedIcon) {
    //   if (type.toLowerCase() === "armor") {
    //     if (selectedIcon.toLowerCase().includes("upper")) {
    //       // Process hand,cap,foot
    //       return [
    //         selectedIcon.replace("Upper", "Cap"),
    //         selectedIcon,
    //         selectedIcon.replace("Upper", "Hand"),
    //         selectedIcon.replace("Upper", "Foot"),
    //       ];
    //     } else if (selectedIcon.toLowerCase().includes("foot")) {
    //       // Process upper,cap,hand
    //       return [
    //         selectedIcon.replace("Foot", "Cap"),
    //         selectedIcon.replace("Foot", "Upper"),
    //         selectedIcon,
    //         selectedIcon.replace("Foot", "Hand"),
    //       ];
    //     } else if (selectedIcon.toLowerCase().includes("hand")) {
    //       // Process upper,cap,foot
    //       return [
    //         selectedIcon.replace("Hand", "Cap"),
    //         selectedIcon.replace("Hand", "Upper"),
    //         selectedIcon.selectedIcon.replace("Hand", "Foot"),
    //       ];
    //     } else if (selectedIcon.toLowerCase().includes("cap")) {
    //       return [
    //         selectedIcon,
    //         selectedIcon.replace("Cap", "Upper"),
    //         selectedIcon.replace("Cap", "Hand"),
    //         selectedIcon.replace("Cap", "Foot"),
    //       ];
    //     }
    //   } else if (type.toLowerCase() === "accesories") {
    //     if (selectedIcon.toLowerCase().includes("rinnorrin")) {
    //       // Process necklace and earring.
    //       return [
    //         selectedIcon, // for two rings
    //         selectedIcon, // for two rings
    //         selectedIcon.replace("RinNorRin", "EarNorEar"),
    //         selectedIcon.replace("RinNorRin", "EarNorEar"),
    //         selectedIcon.replace("RinNorRin", "NecNorNec"),
    //       ];
    //     } else if (selectedIcon.toLowerCase().includes("earnorear")) {
    //       // Process ring and necklace.
    //       return [
    //         selectedIcon, // for two earrings
    //         selectedIcon, // for two earrings
    //         selectedIcon.replace("EarNorEar", "RinNorRin"),
    //         selectedIcon.replace("EarNorEar", "RinNorRin"),
    //         selectedIcon.replace("RinNorRin", "NecNorNec"),
    //       ];
    //     } else if (selectedIcon.toLowerCase().includes("necnornec")) {
    //       // Process ring and earring.
    //       return [
    //         selectedIcon, // for one necklace
    //         selectedIcon.replace("NecNorNec", "RinNorRin"),
    //         selectedIcon.replace("NecNorNec", "RinNorRin"),
    //         selectedIcon.replace("NecNorNec", "EarNorEar"),
    //         selectedIcon.replace("NecNorNec", "EarNorEar"),
    //       ];
    //     }
    //   }
    // },
    toggleModal: function () {
      this.showModal = !this.showModal;
    },
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
  computed: mapGetters(["allCategories"]),
  created() {
    this.main = this.$route.params.main;
    this.type = this.$route.params.type;
    this.page = this.$route.params.page;

    this.FETCH_CATEGORIES();
    if (this.main && this.type && this.page) {
      this.getData();
    }
  },
};
</script>