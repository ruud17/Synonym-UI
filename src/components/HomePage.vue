<template>
  <div class="page-wrap">
    <section id="main">
      <section id="banner">
        <div class="inner" v-if="isSearchTabActive">
          <h1>Are you looking for synonyms?</h1>
          <p>Enter the desired word...</p>
          <div class="search-form">
            <div class="field half first input">
              <input
                class="search-field"
                name="name"
                id="name"
                type="text"
                placeholder="Origin word..."
                v-model="searchSynonymInputValue"
              />
            </div>
            <button class="button search-btn" v-on:click="searchSynonyms">Search</button>
          </div>
          <div>
            <div v-if="synonymsResults" id="results">
              <div class="synonyms-list">
                <span class="button alt" v-for="item in synonymsResults" :key="item">{{ item }}</span>
              </div>
            </div>
            <div v-else class="no-synonyms-found">
              <h5>{{synonymsSearchResponseMessage}}</h5>
            </div>
          </div>
          <div v-on:click="goToAddNewSynonymsTab(true)" class="link">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add New Synonyms
          </div>
        </div>

        <div class="inner" v-else>
          <div class="column">
            <h2>Add new synonyms</h2>
            <div class="field field-label synonyms-form">
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
          </div>
          <div v-on:click="goToAddNewSynonymsTab(false)" class="link">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            Back
          </div>
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
  mounted() {
    synonymsAPI
      .clearData()
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log("error", e);
      });
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
      this.resetDataWhenChangingTab();
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
          this.addNewSynonymsResponseMessage = response.data.message;
          this.newSynonymOriginWord = "";
          this.newSynonymValue = "";
          this.newSynonymsDataToSave = [];
        })
        .catch(e => {
          console.log("error", e);
        });
    },

    resetDataWhenChangingTab: function() {
      (this.searchSynonymInputValue = ""),
        (this.synonymsResults = []),
        (this.synonymsSearchResponseMessage = ""),
        (this.newSynonymOriginWord = ""),
        (this.newSynonymValue = ""),
        (this.newSynonymsDataToSave = []),
        (this.addNewSynonymsResponseMessage = "");
    }
  }
};
</script>

<style scoped>
@import "../assets/css/main.css";

.link {
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.05em;
  color: #75a2f3;
  margin-top: 40px;
  font-weight: bold;
}

.save-btn {
  margin-top: 30px;
  font-size: 16px;
}

.search-btn {
  font-size: 17px;
  border-top-left-radius: unset;
  border-bottom-left-radius: unset;
}

.field-label {
  display: flex;
  color: black;
}

.synonyms-list {
  margin-top: 20px;
}

.search-form {
  display: flex;
  justify-content: center;
}

.search-form .input {
  width: 60%;
  color: black;
}

.search-form .button {
  width: 20%;
}

.synonyms-form {
  margin-bottom: 10px;
}

.no-synonyms-found {
  color: red;
  margin-top: 15px;
}

.search-field {
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
}
</style>
