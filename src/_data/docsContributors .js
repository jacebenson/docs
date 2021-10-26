require('dotenv').config()
const fetch = require("node-fetch");
const links = require('./links');
module.exports = async function() {
  console.log( "Fetching new github redwood contributors" );
  if(process.env.dev){
    return [
      {
        login: 'lsimpson',
        id: 47246,
        node_id: 'MDQ6VXNlcjQ3MjQ2',
        avatar_url: 'https://avatars.githubusercontent.com/u/19196632?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/lsimpson',
        html_url: 'https://github.com/lsimpson',
        followers_url: 'https://api.github.com/users/lsimpson/followers',
        following_url: 'https://api.github.com/users/lsimpson/following{/other_user}',
        gists_url: 'https://api.github.com/users/lsimpson/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/lsimpson/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/lsimpson/subscriptions',
        organizations_url: 'https://api.github.com/users/lsimpson/orgs',
        repos_url: 'https://api.github.com/users/lsimpson/repos',
        events_url: 'https://api.github.com/users/lsimpson/events{/privacy}',
        received_events_url: 'https://api.github.com/users/lsimpson/received_events',
        type: 'User',
        site_admin: false,
        contributions: 1
      },
      {
        login: 'bsimpson',
        id: 3705660,
        node_id: 'MDQ6VXNlcjM3MDU2NjA=',
        avatar_url: 'https://avatars.githubusercontent.com/u/19196632?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/bsimpson',
        html_url: 'https://github.com/bsimpson',
        followers_url: 'https://api.github.com/users/bsimpson/followers',
        following_url: 'https://api.github.com/users/bsimpson/following{/other_user}',
        gists_url: 'https://api.github.com/users/bsimpson/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/bsimpson/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/bsimpson/subscriptions',
        organizations_url: 'https://api.github.com/users/bsimpson/orgs',
        repos_url: 'https://api.github.com/users/bsimpson/repos',
        events_url: 'https://api.github.com/users/bsimpson/events{/privacy}',
        received_events_url: 'https://api.github.com/users/bsimpson/received_events',
        type: 'User',
        site_admin: false,
        contributions: 14
      },
      {
        login: 'jacebenson',
        id: 99999999,
        node_id: 'MDQ6VXNlcjE2MDA1NTY3',
        avatar_url: 'https://avatars.githubusercontent.com/u/638764?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/jacebenson',
        html_url: 'https://github.com/jacebenson',
        followers_url: 'https://api.github.com/users/jacebenson/followers',
        following_url: 'https://api.github.com/users/jacebenson/following{/other_user}',
        gists_url: 'https://api.github.com/users/jacebenson/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/jacebenson/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/jacebenson/subscriptions',
        organizations_url: 'https://api.github.com/users/jacebenson/orgs',
        repos_url: 'https://api.github.com/users/jacebenson/repos',
        events_url: 'https://api.github.com/users/jacebenson/events{/privacy}',
        received_events_url: 'https://api.github.com/users/jacebenson/received_events',
        type: 'User',
        site_admin: false,
        contributions: 8
      }
    ];
  } else {//if not in dev mode make call
  // GitHub API: https://developer.github.com/v3/repos/#get
  return fetch(links.github.docsContributorsApi)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      // prune the data to return only what we want
      //github public api is limited to 60 calls per hour
      // if a bunch of builds are happening at once, this will fail
      console.log(json);
      return json;
    });
  }
};