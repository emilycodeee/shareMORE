import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIASEARCH_API_KEY,
  process.env.REACT_APP_ALGOLIASEARCH_SEARCHONLY_API_KEY
);

const algolia = client.initIndex("sharemore");

export default algolia;
