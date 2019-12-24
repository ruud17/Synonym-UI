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
                v-on:keyup="searchOnEnter"
              />
            </div>
            <button
              class="button search-btn"
              v-on:click="searchSynonyms"
              :disabled="!searchSynonymInputValue.length"
            >
              Search
            </button>
          </div>
          <div>
            <div v-if="synonymsResults" id="results">
              <div class="synonyms-list">
                <span
                  class="button alt item-list item"
                  v-for="item in synonymsResults"
                  :key="item"
                  >{{ item }}</span
                >
              </div>
            </div>
          </div>
          <div v-on:click="goToAddNewSynonymsTab(true)" class="link">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add New Synonyms
          </div>
        </div>

        <div class="inner" v-else>
          <h1>Add new synonyms</h1>
          <div class="group-input-btn">
            <div class="field field-label synonyms-form">
              <input
                class="custom-input"
                name="originWord"
                id="originWord"
                type="text"
                placeholder="Enter origin word"
                v-model="newSynonymOriginWord"
              />
            </div>
            <div class="field-label half first">
              <input
                class="custom-input search-field"
                name="synonym"
                id="name"
                type="text"
                placeholder="Enter synonym..."
                v-model="newSynonymValue"
              />
              <button
                class="button add-synonym-btn search-btn"
                v-on:click="addSynonym"
                :disabled="!newSynonymValue || !newSynonymOriginWord"
              >
                Add Synonym
              </button>
            </div>
          </div>
          <div class="synonyms-list" v-if="newSynonymsDataToSave.length > 0">
            <span
              class="button alt item-list item"
              v-for="item in newSynonymsDataToSave"
              :key="item"
            >
              {{ item }}
              <i class="fa fa-remove" v-on:click="deleteSynonym(item)"></i>
            </span>
          </div>

          <div
            v-if="
              newSynonymOriginWord != '' && newSynonymsDataToSave.length > 0
            "
          >
            <button class="button save-btn" v-on:click="saveSynonyms">
              Save Changes
            </button>
          </div>
          <div class="synonyms-form-btn">
            <div v-on:click="goToAddNewSynonymsTab(false)" class="link">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
              Back
            </div>
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
      //add new synonyms tab state
      newSynonymOriginWord: "",
      newSynonymValue: "",
      newSynonymsDataToSave: []
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
    searchOnEnter: function(e) {
      if (e.keyCode === 13) {
        this.searchSynonyms();
      }
    },
    searchSynonyms: function() {
      synonymsAPI
        .searchSynonyms(this.searchSynonymInputValue)
        .then(response => {
          this.synonymsResults = response.data.response;
          if (!this.synonymsResults) {
            this.$toastr("info", `${response.data.message}`);
          }
        })
        .catch(e => {
          this.$toastr("error", e);
          console.log("error", e);
        });
    },

    goToAddNewSynonymsTab: function(value) {
      this.isSearchTabActive = !value;
      this.resetDataWhenChangingTab();
    },

    addSynonym: function() {
      if (this.newSynonymsDataToSave.indexOf(this.newSynonymValue) != -1) {
        this.$toastr("info", "Synonym already exists");
        return;
      }
      this.newSynonymsDataToSave.push(this.newSynonymValue);
      this.newSynonymValue = "";
    },

    deleteSynonym: function(clicked) {
      const filteredSynonymsList = this.newSynonymsDataToSave.filter(
        item => item != clicked
      );
      this.newSynonymsDataToSave = filteredSynonymsList;
    },

    saveSynonyms: function() {
      this.newSynonymsDataToSave.push(this.newSynonymOriginWord);
      synonymsAPI
        .addSynonyms({ data: this.newSynonymsDataToSave })
        .then(response => {
          this.$toastr("success", `${response.data.message}`);
          this.resetDataWhenChangingTab();
        })
        .catch(e => {
          this.$toastr("error", `${e}`);
        });
    },

    resetDataWhenChangingTab: function() {
      (this.searchSynonymInputValue = ""),
        (this.synonymsResults = []),
        (this.newSynonymOriginWord = ""),
        (this.newSynonymValue = ""),
        (this.newSynonymsDataToSave = []);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/main.css";

.link {
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.05em;
  color: #4bb6fe;
  margin-top: 60px;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.synonyms-list .item {
  margin-right: 7px;
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

.add-synonym-btn {
  background-color: #805270;
  font-size: 12px;
  margin-top: 20px;
}
.custom-input {
  height: 2em;
  margin-top: 20px;
}

.synonyms-form-btn {
  display: flex;
  justify-content: center;
}

.item-list {
  height: 1.5em;
  line-height: 1.5em;
}
</style>
