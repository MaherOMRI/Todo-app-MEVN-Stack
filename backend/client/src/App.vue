<template>
  <div id="app">
    <h1 class="app-title">Todo List</h1>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" class="input" v-model="description" placeholder="Add new task here ..">
      </div>
      <div class="control">
        <a class="button is-info" @click="addItem" :disabled="!description">Add</a>
      </div>
    </div>
    <!--display buckets list-->
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <p>
      <span class="tag is-primary">{{i + 1}}</span>
      {{item.description}}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      items: [],
      description: ''
    }
  },
  async mounted () {
    const response = await axios.get('http://localhost:5000/api/bucketListItems/')
    this.items = response.data
  },
  methods: {
    async addItem () {
      const response = await axios.post('http://localhost:5000/api/bucketListItems/',
        { description: this.description })
      this.items.push(response.data)
      this.description = ''
    }
  }

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
