<template>
  <svg
    v-if="alt"
    :aria-labelledby="`title-${altText}`"
    role="img"
    :class="className"
  >
    <title :id="`title-${altText}`">{{ altText }}</title>
    <use
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :xlink:href="'/img/sprite.svg#' + symbolName"
    ></use>
  </svg>

  <svg v-else role="presentation" :class="className">
    <use
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :xlink:href="'/img/sprite.svg#' + symbolName"
    ></use>
  </svg>
</template>

<script>
export default {
  name: "SVG",
  props: {
    symbol: String,
    alt: String,
    class: String
  },
  data() {
    return {
      symbolName: this.symbol,
      altText: this.alt,
      className: this.class
    };
  }
};
</script>

<style scoped lang="scss">
@use "@/style/common.scss" as *;
</style>
