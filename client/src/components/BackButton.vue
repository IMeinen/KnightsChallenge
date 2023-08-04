<template>
  <router-link :to="{ name: 'home' }">
    <button
      class="back-button"
    >
      <font-awesome-icon icon="left-long" />
    </button>
  </router-link>
</template>

<style>
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #fff;
  outline: none;
  cursor: pointer;
  border: 3px solid #333;
  border-radius: 50%;
  position: absolute;
  top: 3em;
  left: 3em;
}
</style>
