<template>
  <div class="home">
    <div v-if="isSearchTabActive">
      <div>
        <p>Search for synonyms:</p>
        <input v-model="searchSynonymInputValue" placeholder="Enter some word" />
        <button v-on:click="searchSynonyms">Search</button>
      </div>

      <div>
        <div v-if="synonymsResults">
          <ul>
            <li v-for="item in synonymsResults" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div v-else>{{synonymsSearchResponseMessage}}</div>
      </div>

      <div>
        <hr />
        <span v-on:click="goToAddNewSynonymsTab(true)">Add new synonyms</span>
      </div>
    </div>

    <div v-else>
      <div>
        <p>Add new origin word</p>
        <input v-model="newSynonymOriginWord" placeholder="Enter origin word" />
      </div>

      <div>
        <p>Add synonyms</p>
        <input v-model="newSynonymValue" placeholder="Enter some word" />
        <button v-on:click="addSynonym">Add</button>
        <div v-if="newSynonymsDataToSave.length>0">
          <span>Added synonyms</span>
          <ul>
            <li v-for="item in newSynonymsDataToSave" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
      <div>
        <button v-on:click="saveSynonyms">Save</button>
      </div>
      <div>
        <hr />
        <span v-on:click="goToAddNewSynonymsTab(false)">BACK</span>
      </div>
    </div>
  </div>
</template>

<script>
import synonymsAPI from "../api/synonymsAPI";

export default {
  name: "HomePage",
  data() {
    return {
      isSearchTabActive: true,
      //search tab state
      searchSynonymInputValue: "",
      synonymsResults: [],
      synonymsSearchResponseMessage: "",
      //add new synonyms tab state
      newSynonymOriginWord: "",
      newSynonymValue: "",
      newSynonymsDataToSave: [],
      addNewSynonymsResponseMessage: ""
    };
  },
  methods: {
    searchSynonyms: function() {
      synonymsAPI
        .searchSynonyms(this.searchSynonymInputValue)
        .then(response => {
          this.synonymsResults = response.data.response;
          this.synonymsSearchResponseMessage = response.data.message;
        })
        .catch(e => {
          console.log("error", e);
        });
    },

    goToAddNewSynonymsTab: function(value) {
      this.isSearchTabActive = !value;
    },

    addSynonym: function() {
      this.newSynonymsDataToSave.push(this.newSynonymValue);
      this.newSynonymValue = "";
    },

    saveSynonyms: function() {
      this.newSynonymsDataToSave.push(this.newSynonymOriginWord);
      synonymsAPI
        .addSynonyms({ data: this.newSynonymsDataToSave })
        .then(response => {
          console.log("response", response.data);
          this.addNewSynonymsResponseMessage = response.data.message;
          this.newSynonymOriginWord = "";
          this.newSynonymValue = "";
          this.newSynonymsDataToSave = [];
        })
        .catch(e => {
          console.log("error", e);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
