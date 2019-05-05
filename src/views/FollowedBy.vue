<template>
  <div class="followedBy">
    <h2>Follow the Leader</h2>
    <p><router-link to="/">Rhymeasaurus
      </router-link>
    </p>
    <form v-on:submit.prevent="findWords">
      <p>
        Give us a word
        <input type="text" v-model="noun"> and we'll tell you the most common word to follow it.
        <button type="submit">Search</button>
      </p>
    </form>
    <ul class="results" v-if="results && results.length > 0">
      <li class="item" v-for="(item,index) of results" :key="index">
        <p>
          <strong>{{item.word}}</strong>
        </p>
        <p>{{item.score}}</p>
      </li>
    </ul>

    <div class="no-results" v-else-if="results && results.length === 0">
      <h2>No Words Found</h2>
      <p>Hmm... didn't work. Let's try that again.</p>
    </div>

    <ul class="errors" v-if="errors && errors.length > 0">
      <li v-for="(errors,index) of errors" :key="index">{{errors.message}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { error } from "util";

export default {
  name: "FollowedBy",
  data() {
    return {
      results: null,
      errors: [],
      noun: ""
    };
  },
  methods: {
    findWords: function() {
      axios
        .get("https://api.datamuse.com/words", {
          params: {
            rel_bga: this.noun
          }
        })
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.followedBy {
  font-size: 1.4rem;
}

input[type="text"] {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.02);
  padding: 0.5rem;
}
button {
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1,
h2 {
  font-weight: normal;
}

ul.results {
  list-style-type: none;
  padding: 0;
}

.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  min-height: 100px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}

a {
  color: #42b983;
}
</style>
