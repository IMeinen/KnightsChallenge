<template>
  <router-link :to="{ name: 'create' }">
    <button
      class="create-button"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
    >
      <font-awesome-icon icon="plus" />
      <p>Criar novo cavalheiro</p>
    </button>
  </router-link>
</template>

<script>
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default {
  methods: {
    showTooltip() {
      tippy(this.$el, {
        content: "Criar novo cavalheiro",
        placement: "bottom",
        theme: "light",
      });
    },
    hideTooltip() {
      tippy(this.$el).destroy();
    },
    handleClick() {
      this.onClick();
    },
  },
};
</script>

<style>
button.create-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  background: #fff;
  outline: none;
  border: 4px solid #333;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  width: auto;
  height: 64px;
  
}

.create-button p {
  margin-left: 8px;
}
</style>
