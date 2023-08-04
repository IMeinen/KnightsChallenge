<template>
  <div class="home-container">
    <h1 class="home-main-title">
      Lista de Cavalheiros
    </h1>
    <div class="home-main-controlls-container">
      <CreateButton />
      <input
        id="show-heroes-checkbox"
        v-model="showHeroes"
        type="checkbox"
      />
      <label for="show-heroes-checkbox">Mostrar Heróis</label>
    </div>
    <ItemListComponent
      v-if="currentKnights"
      :item-list="currentKnights"
    />
  </div>
</template>

<script>
import ItemListComponent from "../components/ItemListComponent.vue";
import CreateButton from "../components/CreateButton.vue";
import { getAllKnights,getAllHeroes} from "../api/knights.api";

export default {
  name: "HomeView",
  components: {
    ItemListComponent,
    CreateButton,
  },
  data() {
    return {
      currentKnights: [],
      showHeroes: false,
    };
  },
  watch: {
    $route: {
      handler: async function () {
        await this.setKnights();
      },
      deep: true,
      immediate: true,
    },
    showHeroes: {
      handler: async function () {
        if(this.showHeroes){
          await this.setHeroes();
        } else {
          await this.setKnights();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async setKnights() {
      this.currentKnights = await getAllKnights();
    },
    async setHeroes() {
      this.currentKnights = await getAllHeroes();
    },
  },
};
</script>

<style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-main-title {
  font-size: 54px;
  margin: 16px 0;
}

.home-main-controlls-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.home-main-controlls-container input {
  margin-left: 24px;
}

.home-main-controlls-container label {
  margin-left: 8px;
  font-size: 20px;
}
</style>
