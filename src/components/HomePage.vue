<template>
  <div class="page-wrap">
    <section id="main">
      <section id="banner">
        <div class="inner" v-if="isSearchTabActive">
          <h1>Are you looking for synonyms?</h1>
          <p>Enter the desired word...</p>
          <div class="column">
            <form>
              <div class="field half first">
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Origin word..."
                  v-model="searchSynonymInputValue"
                />
              </div>
              <span class="button alt scrolly big" v-on:click="searchSynonyms">Search</span>
            </form>
          </div>
          <div>
            <div v-if="synonymsResults" id="results">
              <div>
                <span class="button alt" v-for="item in synonymsResults" :key="item">{{ item }}</span>
              </div>
            </div>
            <div v-else>
              <h5>{{synonymsSearchResponseMessage}}</h5>
            </div>
          </div>
          <span v-on:click="goToAddNewSynonymsTab(true)" class="link">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add new synonyms
          </span>
        </div>

        <div class="inner" v-else>
          <div class="column">
            <form>
              <h2>Add new synonyms</h2>
              <div class="field field-label">
                <input
                  name="originWord"
                  id="originWord"
                  type="text"
                  placeholder="Enter origin word"
                  v-model="newSynonymOriginWord"
                />
              </div>
              <div class="field-label half first">
                <input
                  name="synonym"
                  id="name"
                  type="text"
                  placeholder="Enter synonym..."
                  v-model="newSynonymValue"
                />
                <span class="button alt scrolly big" v-on:click="addSynonym">Add Synonym</span>
              </div>
              <div class="synonyms-list" v-if="newSynonymsDataToSave.length>0">
                Added synonyms:
                <span
                  class="button alt"
                  v-for="item in newSynonymsDataToSave"
                  :key="item"
                >{{ item }}</span>
              </div>
              <div>
                <button class="button save-btn" v-on:click="saveSynonyms">Save Synonyms</button>
              </div>
            </form>
          </div>
          <span v-on:click="goToAddNewSynonymsTab(false)" class="link">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            Back
          </span>
        </div>
      </section>
    </section>
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

<style scoped>
@import "../assets/css/main.css";
</style>
