import { arrCaculator, dateCounter } from "./common";

describe("array caculator", () => {
  test("Non-equal，Non-equal point situation", () => {
    const arrA = ["sam", "otis", "otis", "otis", "sam", "sam", "chris"];

    expect(arrCaculator(arrA)).toEqual({ userID: "sam", point: 3 });
  });

  test("same score situation，if same score then take the lastest to be winner", () => {
    const arrB = ["sam", "otis", "otis", "otis", "sam", "sam", "chris"];

    expect(arrCaculator(arrB)).toEqual({ userID: "sam", point: 3 });
  });
});

describe("dateCounter", () => {
  test("dateCounter，from todat to goal date is left by", () => {
    const date1 = "2021/11/30";
    expect(dateCounter(date1)).toEqual(1);
  });

  test("dateCounter，if goal date is expired", () => {
    const date2 = "2021/11/27";
    expect(dateCounter(date2)).toEqual("今");
  });
});
