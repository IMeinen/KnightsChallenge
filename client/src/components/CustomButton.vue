<template>
  <button 
    :class="buttonClasses" 
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  computed: {
    buttonClasses() {
      return {
        "primary-button": !this.secondary,
        "secondary-button": this.secondary,
      };
    },
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
};
</script>

<style>
.primary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #333;
  padding: 10px;
  color: white;
  background-color: #333;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  font-size: 18px;
  margin-left: 5px;
}

.secondary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #333;
  padding: 10px;
  color: #333;
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
  width: 100%;
  font-size: 18px;
  margin-right: 5px;
}
</style>
