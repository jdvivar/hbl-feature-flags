<template>
  <div class="flag">
    <div class="title">
      {{ flag.title}}
    </div>
    <div>
      id: {{ flag.id }}
    </div>
    <div>
      {{ flag.status }}
    </div>
    <div>
      {{ flag.tags }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flag',
  props: {
    flag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

.flag {
  border: 4px solid black;
  padding: 20px;
  margin: 40px 0;
  position: relative;
}

.title {
  position: absolute;
  top: -5px;
  background-color: white;
  padding: 0 10px;
  font-size: 20px;
}

</style>
