<template>
  <div class="create-main-container">
    <BackButton />
    <h1 class="create-main-title">
      Criar cavalheiro
    </h1>
    <div class="create-box-container">
      <div class="create-list-container">
        <h1 class="create-list-title">
          Criar novo cavalheiro
        </h1>
        <ul v-if="knightInfo">
          <li>
            <strong>Name:</strong>
            <input
              v-model="knightInfo.name"
              placeholder="Digite o Nome do Cavalheiro"
            />
          </li>
          <li>
            <strong>Attributes:</strong>
            <ul v-if="knightInfo.attributes">
              <li>
                <strong>Força:</strong>
                <input
                  v-model="knightInfo.attributes.strength"
                  placeholder="Digite a força do cavalheiro"
                  type="number"
                />
              </li>
              <li>
                <strong>Destreza:</strong>
                <input
                  v-model="knightInfo.attributes.dexterity"
                  placeholder="Digite a destreza do cavalheiro"
                  type="number"
                />
              </li>
              <li>
                <strong>Vigor:</strong>
                <input
                  v-model="knightInfo.attributes.constitution"
                  placeholder="Digite o vigor do cavalheiro"
                  type="number"
                />
              </li>
              <li>
                <strong>Inteligência:</strong>
                <input
                  v-model="knightInfo.attributes.intelligence"
                  placeholder="Digite a inteligência do cavalheiro"
                  type="number"
                />
              </li>
              <li>
                <strong>Sabedoria:</strong>
                <input
                  v-model="knightInfo.attributes.wisdom"
                  placeholder="Digite a sabedoria do cavalheiro"
                  type="number"
                />
              </li>
              <li>
                <strong>Carisma:</strong>
                <input
                  v-model="knightInfo.attributes.charisma"
                  placeholder="Digite o carisma do cavalheiro"
                  type="number"
                />
              </li>
            </ul>
          </li>
          <li>
            <strong>Nickname:</strong>
            <input
              v-model="knightInfo.nickname"
              placeholder="Digite o Apelido do Cavalheiro"
            />
          </li>
          <li>
            <strong>Data de nascimento:</strong>
            <input
              id="dateInput"
              v-model="knightInfo.birthday"
              type="date"
              :max="maxDate"
            />
          </li>
          <li>
            <strong>Atributo Chave:</strong>
            <select
              id="attrSelect"
              v-model="knightInfo.keyAttribute"
            >
              <option value="">
                -- Selecione um atributo --
              </option>
              <option
                v-for="item in attrOptions"
                :key="item"
                :value="item"
              >
                {{ translateAttribute(item) }}
              </option>
            </select>
          </li>
        </ul>
        <CustomButton
          label="Salvar cavaleiro"
          :on-click="creatNewKnight"
        />
      </div>
      <div class="create-weapons-container">
        <h1 class="create-weapons-title">
          Adicionar armas
        </h1>
        <div class="create-weapons-input-container">
          <ul>
            <li>
              <strong>Nome:</strong>
              <input
                v-model="currentWeapon.name"
                placeholder="Nome da arma"
              />
            </li>
            <li>
              <strong>Modificador:</strong>
              <input
                v-model="currentWeapon.mod"
                placeholder="Modificador"
                type="number"
              />
            </li>
            <li>
              <strong>Atributo:</strong>
              <select
                id="attrSelectWeapon"
                v-model="currentWeapon.attr"
              >
                <option value="">
                  -- Selecione um atributo --
                </option>
                <option
                  v-for="item in attrOptions"
                  :key="item"
                  :value="item"
                >
                  {{ translateAttribute(item) }}
                </option>
              </select>
            </li>
            <li>
              <input
                id="checkbox"
                v-model="currentWeapon.equipped"
                type="checkbox"
              />
              <label for="checkbox">Equipado</label>
            </li>
          </ul>
          <CustomButton
            label="Adicionar Arma"
            :on-click="handleAddWeapon"
          />
        </div>
        <div class="create-weapons-list-container">
          <h1 class="create-weapons-title">
            Lista de armas
          </h1>
          <ul v-if="knightInfo.weapons && knightInfo.weapons.length > 0">
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
  </div>
</template>

<script>
import BackButton from "../components/BackButton.vue";
import CustomButton from "../components/CustomButton.vue";
import WeaponCard from "../components/WeaponCard.vue";
import { createKnight } from "../api/knights.api";
import {useToast} from 'vue-toast-notification';

const $toast = useToast();

export default {
  name: "CreateView",
  components: {
    BackButton,
    WeaponCard,
    CustomButton
  },
  data() {
    return {
      maxDate: new Date().toISOString().split('T')[0],
      knightInfo: {
        name: "",
        nickname: "",
        birthday: "",
        keyAttribute: "",
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        weapons: [],
      },
      attrOptions: [
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ],
      currentWeapon: {
        name: "",
        mod: 0,
        attr: "",
        equipped: false,
      },
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push({
        name: "home",
        key: "$route.fullPath",
      });
    },
    async creatNewKnight() {
      if(this.knightInfo.name === "" || this.knightInfo.keyAttribute === "" || this.knightInfo.birthday === ""){
        $toast.open({message: 'É necessário preencher ao menos o nome,data de nascimento e atributo chave para criar o cavalheiro', type: 'error' ,duration: 2000,position: 'top-right'});
        return;
      }
      await createKnight(this.knightInfo);
      $toast.open({message: 'Cavalheiro adicionado com sucesso',duration: 2000,position: 'top-right'});
      this.redirectToHome();
    },
    handleAddWeapon() {
      if (this.currentWeapon.name !== "" && this.currentWeapon.attr !== "") {
        this.knightInfo.weapons = [
          ...this.knightInfo.weapons,
          this.currentWeapon,
        ];
        this.currentWeapon = {
          name: "",
          mod: 0,
          attr: "",
          equipped: false,
        };
      }else{
        $toast.open({message: 'É necessário preencher o nome e atributo da arma', type: 'error' ,duration: 2000,position: 'top-right'});
      }
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
  },
};
</script>

<style>
.create-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}

.create-list-container,
.create-weapons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px;
  height: 85vh;
  border: 3px solid #333;
  background: #fff8e5;
  border-radius: 8px;
}

.create-list-container {
  width: 50vw;
}

.create-list-title,
.create-weapons-title {
  font-size: 32px;
  margin: 16px 0;
}

.create-list-container {
  margin-right: 50px;
}

.create-weapons-container {
  width: 30vw;
}

.create-list-container li {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 12px 0;
  line-height: 24px;
}

.create-list-container li strong {
  font-size: 24px;
  line-height: 24px;
}
.create-list-container li p {
  font-size: 18px;
  line-height: 24px;
}

.create-weapons-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 3px solid #333;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
}

.create-weapons-input-container ul li {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 16px;
}

.create-weapons-list-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: auto;
}

.create-weapons-list-container ul {
  overflow: auto;
}

.create-main-title {
  font-size: 54px;
  margin: 16px 0;
  height: 64px;
}

.create-box-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}
</style>
