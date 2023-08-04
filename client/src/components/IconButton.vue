<template>
  <button
    :id="id"
    class="icon-button"
    @mouseover="showTooltip"
    @mouseleave="hideTooltip"
    @click="handleClick"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    helper: {
      type: String,
      required: true,
    }, 
    onClick: {
      type: Function,
      required: true,
    },
  },
  methods: {
    showTooltip() {
      tippy(this.$el, {
        content: this.helper,
        placement: 'bottom', // Defina o posicionamento do tooltip (top, bottom, left, right)
        theme: 'light', // Defina o tema do tooltip (dark, light)
      });
    },
    hideTooltip() {
      // Destruir o tooltip ao remover o mouse
      tippy(this.$el).destroy();
    },
    handleClick() {
      this.onClick();
    },
  },
};
</script>

<style>
/* Estilos opcionais para posicionar o ícone no meio do botão */
button.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #fff;
  outline: none;
  border: 3px solid #333;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  width: 36px;
  height: 36px;
  margin: 0 4px;
}

/* Estilos opcionais para o ícone */
button.icon-button i {
  color: #333;
}
</style>
