<template>
  <div class="home">
    <div v-if="isSearchTabActive">
      <div>
        <p>Search for synonyms:</p>
        <input v-model="searchSynonymInputValue" placeholder="Enter some word" />
        <button v-on:click="searchSynonyms">Search</button>
      </div>

      <div>
        <hr />
        <span v-on:click="goToAddNewSynonymsTab(true)">Add new synonyms</span>
      </div>
    </div>

    <div v-else>
      <p>Add new synonyms:</p>
      <div>
        <p>Add new origin word</p>
        <input v-model="newSynonymOriginWord" placeholder="Enter origin word" />
      </div>

      <div>
        <p>Add synonyms</p>
        <input v-model="newSynonymValue" placeholder="Enter some word" />
        <button v-on:click="addSynonym">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      isSearchTabActive: true,
      //search tab state
      searchSynonymInputValue: "",
      synonymsResults: [],
      //add new synonyms tab state
      newSynonymValue: "",
      newSynonymOriginWord: "",
      newSynonymsDataToSave: []
    };
  },
  methods: {
    searchSynonyms: function() {
      console.log("search");
      // call axios here
    },
    goToAddNewSynonymsTab: function(value) {
      this.isSearchTabActive = !value;
    },
    addSynonym: function(event) {
      this.newSynonymsDataToSave.push(event.target.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
