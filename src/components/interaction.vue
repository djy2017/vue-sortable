<template>
  <div class="interaction">
    <div class="back">
      <router-link to="/">indexPage</router-link>
    </div>
    <div class="interaction-wrap">
      <draggable class="dragWrap" v-model="list1" element='div' :options='dragoption' :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <div class="dragElement" v-for="item in list1" :key="item.id">
          <span>{{ item.name }}</span>
          <span>{{item.order}}</span>
        </div>
      </draggable>
      <draggable class="dragWrap" v-model="list2" element='div' :options='dragoption' :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <div class="dragElement" v-for="item in list2" :key="item.id">
          <span>{{ item.name }}</span>
          <span>{{item.order}}</span>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'interaction',
  data () {
    return {
      list1: ['深圳', '广州', '桂林'].map((name, index) => { return {name, order: index + 1} }),
      list2: ['香港', '澳门', '台湾'].map((name, index) => { return {name, order: index + 1} }),
      editable: true,
      isDragging: false,
      delayedDragging: false
    }
  },
  components: {
    draggable
  },
  methods: {
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  computed: {
    dragoption () {
      return {
        animation: 0,
        group: 'string',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    }
  },
  watch: {
    isDragging (newValue, oldValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .back {
    width: 100%;
    margin-bottom: 20px;
    a {
      width: 70px;
      height: 36px;
      margin: 0 auto;
      background-color: green;
      border-radius: 4px;
      text-align: center;
      line-height: 36px;
      &:hover {
        color:#fff;
      }
    }
  }
  .interaction-wrap {
    width: 85%;
    padding: 10px;
    margin: 0 auto;
    display: flex;
    border: 1px solid grey;
    .dragWrap {
      width: 80px;
      border: 1px solid gray;
      border-radius: 4px;
      margin-right: 10px;
      padding: 4px;
      .dragElement {
        background-color: gray;
        height: 30px;
        line-height: 30px;
        margin-bottom: 5px;
        width: 70px;
        cursor: move;
        &:hover {
          color: #fff;
        }
      }
    }

  }
</style>
