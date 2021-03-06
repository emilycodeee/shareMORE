import { errorAlert } from "./alert";

const generateText = (contentObj, commentsArr) => {
  let html = `<h3>留言串主文：${contentObj.content}</h3><h3>留言回覆列表</h3>`;

  commentsArr.forEach((item) => {
    html += `<p>${item.content}</p>`;
  });

  return html;
};

const dateCounter = (date1) => {
  const goalDate = new Date(date1);
  const today = new Date();
  let iDays = parseInt(Math.abs(today - goalDate) / 1000 / 60 / 60 / 24);
  if (today > goalDate) iDays = "今";
  return iDays;
};

const initText = `<p>-目標建立tips-</p><p>SMART 原則</p><p>S- Specific (具體的)</p><p>M- Measurable (可衡量的)</p><p>A- Attainable (可實現的)</p><p>R- Relevant（息息相關的）</p><p>T- Timely (有時限的)</p>`;

const convertTime = (creationTime) => {
  const time = new Date(creationTime?.toDate()).toLocaleString("zh-TW");
  return time;
};

const arrCaculator = (arr) => {
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

const webRegex = new RegExp(
  "^" +
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    "(?:" +
    "(?:" +
    "[a-z0-9\\u00a1-\\uffff]" +
    "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
    ")?" +
    "[a-z0-9\\u00a1-\\uffff]\\." +
    ")+" +
    "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    "(?::\\d{2,5})?" +
    "(?:[/?#]\\S*)?" +
    "$",
  "i"
);

const uploadPicture = (e, setFunction) => {
  if (e.target.files[0]) {
    if (!e.target.files[0].type.includes("image")) {
      errorAlert("圖片格式怪怪的");
      return;
    }
  }
  setFunction(e.target.files[0]);
};

export {
  generateText,
  dateCounter,
  initText,
  convertTime,
  arrCaculator,
  webRegex,
  uploadPicture,
};
