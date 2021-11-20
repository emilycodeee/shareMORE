export const generateText = (contentObj, commentsArr) => {
  let html = `<h3>留言串主文：${contentObj.content}</h3><h3>留言回覆列表</h3>`;

  commentsArr.forEach((item) => {
    html += `<p>${item.content}</p>`;
  });

  return html;
};

export default generateText;

export const dateCounter = (date1) => {
  const goalDate = new Date(date1);
  const today = new Date();

  const iDays = parseInt(Math.abs(today - goalDate) / 1000 / 60 / 60 / 24);
  return iDays;
};

export const initText = `<p>-目標建立tips-</p><p>SMART 原則</p><p>S- Specific (具體的)</p><p>M- Measurable (可衡量的)</p><p>A- Attainable (可實現的)</p><p>R- Relevant（息息相關的）</p><p>T- Timely (有時限的)</p>`;

export const convertTime = (creationTime) => {
  const time = new Date(creationTime?.toDate()).toLocaleString("zh-TW");
  return time;
};

export const arrCaculator = (arr) => {
  const planObj = arr.reduce((obj, k) => {
    if (k in obj) {
      obj[k]++;
    } else {
      obj[k] = 1;
    }
    return obj;
  }, {});

  let max = 0;
  let curUid = "";
  for (let k in planObj) {
    if (planObj[k] > max) {
      max = planObj[k];
      curUid = k;
    }
  }
  return { userID: curUid, point: max };
};

export const webRegex = new RegExp(
  "^" +
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    "(?:" +
    "(?:" +
    "[a-z0-9\\u00a1-\\uffff]" +
    "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
    ")?" +
    "[a-z0-9\\u00a1-\\uffff]\\." +
    ")+" +
    // TLD identifier name, may end with dot
    "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
    "$",
  "i"
);
