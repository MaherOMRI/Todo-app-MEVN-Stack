<template>
  <div id="app">
    <h1 class="app-title">Todo List</h1>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" class="input" placeholder="Add new task here ..">
      </div>
      <div class="control">
        <a class="button is-info" >Add</a>
      </div>
    </div>
    <!--display buckets list-->
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <p>
      <span class="tag is-primary">{{i + 1}}</span>

      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {}
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.tag{
  margin-right: 1.5rem;
}
.app-title{
  margin-bottom: 4rem;
  font-weight: bold;
  font-size: 34px;
}

</style>
