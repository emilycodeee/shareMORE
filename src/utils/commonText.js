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
  // console.log(iDays);
};

export const initText = `<p>-目標建立tips-</p><p>SMART 原則</p><p>S- Specific (具體的)</p><p>M- Measurable (可衡量的)</p><p>A- Attainable (可實現的)</p><p>R- Relevant（息息相關的）</p><p>T- Timely (有時限的)</p>`;

export const convertTime = (creationTime) => {
  const time = new Date(creationTime?.toDate()).toLocaleString("zh-TW");
  return time;
};

export const arrCaculator = (arr) => {
  console.log(arr);
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
