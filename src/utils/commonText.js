export const generateText = (contentObj, commentsArr) => {
  let html = `<h3>貼文內容：${contentObj.content}</h3><h3>留言列表</h3>`;

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
