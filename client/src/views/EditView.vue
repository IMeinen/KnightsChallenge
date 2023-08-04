<template>
  <div class="update-main-container">
    <BackButton />
    <h1 class="update-main-title">
      Atualizar cavalheiro
    </h1>
    <div class="update-dialog-box">
      <h1 class="update-dialog-box-text">
        {{ `Aqui você pode alterar o apelido do cavalheiro : ${currentName}` }}
      </h1>
      <input
        v-model="newNickname"
        placeholder="Escreva o novo apelido"
      />
      <div class="update-dialog-box-buttons">
        <CustomButton
          :secondary="true"
          label="Cancelar"
          :on-click="redirectToHome"
        />
        <CustomButton
          label="Salvar"
          :on-click="updateCurrentKnight"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "../components/BackButton.vue";
import CustomButton from "../components/CustomButton.vue";
import { updateKnight } from "../api/knights.api";
import {useToast} from 'vue-toast-notification';

const $toast = useToast();

export default {
  name: "EditView",
  components: {
    BackButton,
    CustomButton,
  },
  data() {
    return {
      currentId: 0,
      currentName: '',
      newNickname: ''
    }
  },
  created(){
    this.currentId= this.$route.params.id, 
    this.currentName= this.$route.params.name,
    this.newNickname = ''
  },
  methods: {
    redirectToHome() {
      this.$router.push({
        name: "home",
        key: "$route.fullPath",
      });
    },
    async updateCurrentKnight() {
      if(this.newNickname === ''){
        $toast.open({message: 'É necessário preencher o apelido', type: 'error' ,duration: 2000,position: 'top-right'});
        return;
      }
      await updateKnight(this.currentId,this.newNickname);
      $toast.open({message: 'Apelido alterado com sucesso',duration: 2000,position: 'top-right'});
      this.redirectToHome()
      
    },
  }
};
</script>

<style>
.update-dialog-box-text {
  font-size: 24px;
}

.update-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.update-dialog-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  background: #fff;
  border: 3px solid #333;
  border-radius: 8px;
  font-size: 24px;
  width: 300px;
  height: 300px;
  margin-bottom: auto;
  
}

.update-dialog-box input {
  margin-top: 24px;
}

.update-dialog-box-buttons {
  
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.update-main-title{
  font-size: 54px;
  margin: 16px 0;
  margin-bottom: auto;
}
</style>