<template>
  <div class="router">
    <header>hello world !</header>
    <button v-for="item in pages" :key="item.id">
      <router-link :to=item.url >{{ item.name }}</router-link>
    </button>

  </div>
</template>
<script>
export default {
  name: 'helloworld',
  data () {
    return {
      pages: [
        {name: '简单的拖拽', url: 'simple'},
        {name: '相互拖拽', url: 'interaction'},
        {name: '动画效果', url: 'transition'},
        {name: '一键排序', url: 'sort'}
      ]
    }
  }
}
</script>
<style lang="less" scoped>
 .router {
   header {
     font-size: 24px;
     margin-bottom: 15px;
   }
   button {
     height: 36px;
     line-height: 36px;
     outline: none;
     border: none;
     cursor: pointer;
     color: #fff;
     border-radius: 4px;
     background-color: gray;
     margin-right: 10px;
     &:hover {
       background-color: gainsboro;
     }
   }
 }
</style>
