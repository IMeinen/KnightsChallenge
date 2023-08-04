<template>
  <div class="info-main-container">
    <BackButton />
    <h1 class="info-main-title">
      Detalhes do cavalheiro
    </h1>
    <div class="info-box-container">
      <div class="info-list-container">
        <h1 class="info-list-title">
          Informações do cavalheiro
        </h1>
        <ul v-if="knightInfo">
          <li>
            <strong>Nome:</strong>
            <p>{{ knightInfo.name }}</p>
          </li>
          <li>
            <strong>Atributos:</strong>
            <ul
              v-if="knightInfo.attributes"
              class="infos-list-knight-attribute"
            >
              <li>Força: {{ knightInfo.attributes.strength }}</li>
              <li>Destreza: {{ knightInfo.attributes.dexterity }}</li>
              <li>Vigor: {{ knightInfo.attributes.constitution }}</li>
              <li>Inteligência: {{ knightInfo.attributes.intelligence }}</li>
              <li>Sabedoria: {{ knightInfo.attributes.wisdom }}</li>
              <li>Carisma: {{ knightInfo.attributes.charisma }}</li>
            </ul>
          </li>
          <li>
            <strong>Apelido:</strong>
            <p>{{ knightInfo.nickname }}</p>
          </li>
          <li>
            <strong>Data de nascimento:</strong>
            <p>{{ formatDate(knightInfo.birthday) }}</p>
          </li>
          <li>
            <strong>Atributo Chave:</strong>
            <p>{{ translateAttribute(knightInfo.keyAttribute) }}</p>
          </li>
        </ul>
      </div>
      <div class="info-weapons-container">
        <h1 class="info-weapons-title">
          Lista de armas
        </h1>
        <ul
          v-if="knightInfo.weapons && knightInfo.weapons.length > 0"
          class="info-weapons-list"
        >
          <WeaponCard
            v-for="item in knightInfo.weapons"
            :key="item.name"
            :name="item.name"
            :mod="item.mod"
            :attribute="item.attr"
            :is-equipped="item.equipped"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "../components/BackButton.vue";
import WeaponCard from "../components/WeaponCard.vue";

import { getKnightById } from "../api/knights.api";

export default {
  name: "InfoView",
  components: {
    BackButton,
    WeaponCard,
  },
  data() {
    return {
      currentId: 0,
      knightInfo: {},
    };
  },
  watch: {
    $route: {
      handler: async function () {
        this.currentId = this.$route.params.id;
        await this.getKnightInfoById();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.currentId = this.$route.params.id;
  },
  methods: {
    async getKnightInfoById() {
      this.knightInfo = await getKnightById(this.currentId);
    },
    translateAttribute(attributeKey) {
      const attributes = {
        strength: "Força",
        dexterity: "Destreza",
        constitution: "Vigor",
        intelligence: "Inteligência",
        wisdom: "Sabedoria",
        charisma: "Carisma",
      };

      return attributes[attributeKey] || "";
    },
    formatDate(inputDate) {
      const date = new Date(inputDate);

      const formattedDate = date.toLocaleDateString("pt-BR");

      return formattedDate;
    },
  },
};
</script>

<style>
.info-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.info-box-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}

.info-list-container,
.info-weapons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px;
  height: 80vh;
  border: 3px solid #333;
  border-radius: 8px;
  background: #fff8e5;
}

.info-list-container {
  width: 45vw;
  margin-right: 50px;
}

.info-list-title,
.info-weapons-title {
  font-size: 32px;
}

.info-weapons-container {
  width: 35vw;
}

.info-list-container li {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: 24px 0;
  line-height: 24px;
}

.infos-list-knight-attribute li {
  margin: 0;
  margin-bottom: 16px;
}

.info-list-container li strong {
  font-size: 24px;
  line-height: 24px;
  width: auto;
}
.info-list-container li p {
  font-size: 18px;
  line-height: 28px;
}

.info-main-title {
  font-size: 54px;
  margin: 16px 0;
  height: 64px;
}

.info-weapons-list {
  overflow: auto;
  width: 100%;
}

.info-weapons-title {
  margin-bottom: 16px;
}

</style>
