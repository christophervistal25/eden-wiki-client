<template>
  <div class="login">
    <div class="w-screen flex flex-wrap">
      <!-- Login Section -->
      <div class="w-screen md:w-1/2 flex flex-col">
        <div
          class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24"
        >
          <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
        </div>

        <div
          class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32"
        >
          <p class="text-center text-3xl">Welcome Administrator</p>

          <form @submit.prevent="login" class="flex flex-col pt-3 md:pt-8">
            <div
              v-if="displayErrorMessage"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">Opps! </strong>
              <span class="block sm:inline">Invalid Username / Password.</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  @click="display = false"
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  />
                </svg>
              </span>
            </div>
            <div class="flex flex-col pt-4">
              <label for="username" class="text-lg">Username</label>
              <input
                type="text"
                id="username"
                v-model="username"
                placeholder="Your username"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div class="flex flex-col pt-4">
              <label for="password" class="text-lg">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="***************"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <input
              type="submit"
              value="Log In"
              class="cursor-pointer bg-gray-700 text-white font-bold text-lg hover:bg-gray-500 p-2 mt-8"
            />
          </form>
          <div class="text-center pt-12 pb-12">
            <!-- <p>
              Don't have an account?
              <a href="register.html" class="underline font-semibold"
                >Register here.</a
              >
            </p> -->
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img
          class="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "chris@yahoo.com",
      password: "1234",
      displayErrorMessage: false,
    };
  },
  components: {},
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.displayErrorMessage = true;
      }

      if (!this.displayErrorMessage) {
        axios
          .post(`login`, {
            email: this.username,
            password: this.password,
          })
          .then((response) => {
            console.log("store data in local storage");
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("token", response.data.token);
            this.$router.push("/admin");
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
