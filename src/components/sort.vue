<template>
  <div class="sort">
    <div class="back">
      <router-link to="/">indexPage</router-link>
    </div>
    <div class="handels">
      <label>一键排序，添加项：</label>
      <button @click="sortList1">sortList1</button>
      <button @click="sortList2">sortList2</button>
      <button @click="addToList1">addToList1</button>
      <button @click="addToList2">addToList2</button>
    </div>
    <div class="sort-wrap">
      <draggable class="dragWrap" v-model="list1" element='div' :options='dragoption' :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group class="transition-wrap" type="transition" tag="div" :name="'transition'">
          <div class="dragElement" v-for="item in list1" :key="item.id">
            <span>{{ item.name }}</span>
            <span>{{item.order}}</span>
          </div>
        </transition-group>
      </draggable>
      <draggable class="dragWrap" v-model="list2" element='div' :options='dragoption' :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group class="transition-wrap" type="transition" tag="div" :name="'transition'">
          <div class="dragElement" v-for="item in list2" :key="item.id">
            <span>{{ item.name }}</span>
            <span>{{item.order}}</span>
          </div>
        </transition-group>
      </draggable>
      <div class="showlist">
        <pre>{{stringList1}}</pre>
      </div>
      <div class="showlist">
        <pre>{{stringList2}}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
const {uuid} = require('../assets/javascript/common')
export default {
  name: 'sort',
  data () {
    return {
      list1: ['深圳', '广州', '桂林'].map((name, index) => { return {name, order: index + 1, id: uuid()} }),
      list2: ['香港', '澳门', '台湾'].map((name, index) => { return {name, order: index + 1, id: uuid()} }),
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
    },
    sortList1 () {
      this.list1 = this.list1.sort((x, y) => x.order - y.order)
    },
    sortList2 () {
      this.list2 = this.list2.sort((x, y) => x.order - y.order)
    },
    addToList1 () {
      this.list1.push({name: `list1_add`, order: this.list1.length + 1, id: uuid()})
    },
    addToList2 () {
      this.list2.push({name: `list2_add`, order: this.list2.length + 1, id: uuid()})
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
    },
    stringList1 () {
      return JSON.stringify(this.list1, '', 2)
    },
    stringList2 () {
      return JSON.stringify(this.list2, '', 2)
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
  .handels {
    margin-bottom: 10px;
    button {
      height: 36px;
      line-height: 36px;
      min-width: 80px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        color: #ffffff;
      }
    }
  }
  .sort-wrap {
    width: 85%;
    padding: 10px;
    margin: 0 auto;
    display: flex;
    min-height: 400px;
    overflow-y: scroll;
    border: 1px solid grey;
    .dragWrap {
      width: 110px;
      border: 1px solid gray;
      border-radius: 4px;
      margin-right: 10px;
      padding: 4px;
      position: relative;
      overflow: auto;
      .transition-move {
        transition: 0.5s;
      }
      .transition-wrap {
        min-height: 36px;
      }
      .dragElement {
        background-color: gray;
        height: 30px;
        line-height: 30px;
        margin-bottom: 5px;
        width: 100px;
        cursor: move;
        &:hover {
          color: #fff;
        }
      }
      .ghost {
        background: goldenrod;
      }
    }
    .showlist {
      border: 1px solid gray;
      margin-right: 5px;
      text-align: left;
      position: relative;
      overflow: auto;
    }
  }
</style>
