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
      <div class="columns">
        <input class="column input" v-model="editedDescription" v-if="isSelected (item)">
        <p v-else class="column">
          <span class="tag is-primary">
            {{ i + 1 }}
          </span>
            {{ item.description }}
        </p>
          <div class="column is-narrow">
            <span class="icon has-text-info" @click="isSelected (item) ? unSelect (item) : select(item)">
              <i class="material-icons">{{isSelected(item) ? 'close':'edit'}}</i>
            </span>
            <span class="icon has-text-info" @click="isSelected (item) ? saveChanges (item, i) : removeItem (item, i)">
              <i class="material-icons">{{isSelected(item) ? 'save':'delete'}}</i>
            </span>
          </div>
      </div>
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
      description: '',
      editedDescription: '',
      selected: {}
    }
  },
  async mounted () {
    const response = await axios.get('/api/bucketListItems/')
    this.items = response.data
  },
  methods: {
    async addItem () {
      const response = await axios.post('/api/bucketListItems/',
        { description: this.description })
      this.items.push(response.data)
      this.description = ''
    },
    async removeItem (item, i) {
      await axios.delete('/api/bucketListItems/' + item._id)
      this.items.splice(i, 1)
    },
    select (item) {
      this.selected = item
      this.editedDescription = item.description
    },
    isSelected (item) {
      return item._id === this.selected._id
    },
    unSelect () {
      this.selected = {}
      this.editedDescription = ''
    },
    async saveChanges (item, i) {
      const response = await axios.put('/api/bucketListItems/' + item._id,
        { description: this.editedDescription })
      this.items[i] = response.data
      this.unSelect()
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
.icon{
  cursor: pointer
}

</style>
