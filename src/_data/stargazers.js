require('dotenv').config()
const fetch = require("node-fetch");
const links = require('./links');
module.exports = async function() {
  console.log( "Fetching new github stargazers count…" );
  if(process.env.dev){
    return "9000+"
  } else {//if not in dev mode make call
  // GitHub API: https://developer.github.com/v3/repos/#get
  console.log( "Fetching new github stargazers count…", links.github.stargazersApi );
  return fetch(links.github.stargazersApi)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      // prune the data to return only what we want
      return json?.stargazers_count || 0;
    });
  }
};