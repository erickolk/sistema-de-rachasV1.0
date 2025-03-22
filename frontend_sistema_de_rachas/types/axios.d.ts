import { AxiosInstance } from "axios";

declare module '#app' {
  interface NuxtApp {
    $api: AxiosInstance;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}
