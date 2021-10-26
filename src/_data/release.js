require('dotenv').config()
const fetch = require("node-fetch");
const links = require('./links');
module.exports = async function() {
  console.log( "Fetching new github release and link");
  if(process.env.dev){
    return {
      name: "v.0.99.9+",
      url: "/"
    }
  } else {//if not in dev mode make call
  // GitHub API: https://developer.github.com/v3/repos/#get
  return fetch(links.github.releasesApi)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      // prune the data to return only what we want
      // github public api is limited to 60 calls per hour
      // if a bunch of builds are happening at once, this will fail
      return {
        name: json[0]?.name || "v0.0",
        html_url: json[0]?.html_url || links.github.allReleases
      }
    });
  }
};