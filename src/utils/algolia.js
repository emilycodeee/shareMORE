import algoliasearch from "algoliasearch";
require("dotenv").config();
const client = algoliasearch("2O238OVP6V", "98e5601e3df5a3134b62e6aa1a08915d");

const algolia = client.initIndex("sharemore");

export default algolia;
