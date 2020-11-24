<template>
  <!--Container-->

  <!--Section container-->
  <section class="w-full lg:w-4/5">
    <!--Title-->
    <h1
      class="flex items-center font-semibold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl"
    >
      Welcome to Eden Flyff Wiki
    </h1>

    <!--divider-->
    <hr class="my-2" />

    <div class="menu__item" v-for="item in allCategories" :key="item.id">
      <!--Title-->

      <h2
        class="break-normal text-gray-700 px-2 py-2 text-xl transition duration-200 ease-in-out hover:text-green-500 capitalize"
      >
        <router-link
          :to="{
            name: 'DocsMenu',
            params: { menu: item.name.toLowerCase(), page: 1 },
          }"
        >
          # {{ item.name }}
        </router-link>
      </h2>

      <!--Card-->
      <!-- :class="
            index == 0 ? 'border-l-4 border-transparent border-green-600' : ''
          " -->
      <div class="p-8 lg:mt-0 leading-normal rounded shadow bg-white mb-5">
        <p class="text-sm text-gray-700 py-2 px-2 text-justify">
          <span class="ml-5"></span>{{ item.description }}
        </p>
        <hr class="mb-3" />
        <div
          class="inline-block"
          v-for="(sub_category, i) in item.sub_category"
          :key="i"
        >
          <sub-menu
            v-if="i < 3 && sub_category.status == 'active'"
            :category="item.name"
            :sub_category="sub_category"
          ></sub-menu>

          <div
            v-if="
              item.sub_category.length > 4 && i == item.sub_category.length - 1
            "
          >
            <small>
              <router-link
                :to="{
                  name: 'DocsMenu',
                  params: { menu: item.name.toLowerCase(), page: 1 },
                }"
              >
                <button
                  class="bg-green-600 text-white active:bg-green-800 text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 uppercase"
                  type="button"
                  style="transition: all 0.15s ease"
                >
                  More {{ item.name }}
                </button>
              </router-link>
            </small>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <!--/Card-->
    </div>
  </section>
  <!--/Section container-->
  <!--/container-->
</template>
<script>
// import Sidebar from "../components/Sidebar2.vue";
import SubMenu from "../components/SubMenu.vue";
// import ImageCollage from "../components/ImageCollage.vue";

// import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    SubMenu,
  },
  data() {
    return {
      menu: [],
      selected: "",
    };
  },
  methods: {
    ...mapActions(["FETCH_CATEGORIES"]),
  },
  computed: mapGetters(["allCategories"]),
  created() {
    this.FETCH_CATEGORIES();
  },
};
</script>