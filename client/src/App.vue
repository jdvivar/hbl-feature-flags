<template>
  <div id="app">
    <header>
      <h1>HBL<br />Feature<br />Flags</h1>
      <div class="zava-icon">Z</div>
    </header>
    <router-view/>
    <footer>
      <h4>Made with <i class="nes-icon heart"></i> by D.&nbsp;Vivar & M.&nbsp;García</h4>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import 'styles/app';

.heart {
  top: 8px;
}

h1 {
  @media (max-width: $breakpoint - 1) {
    font-size: 26px;
    line-height: 1.85;
  }
}

</style>
