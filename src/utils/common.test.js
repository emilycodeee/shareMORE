import { arrCaculator } from "./common";

const arrA = ["apple", "banana", "banana", "banana", "apple", "apple", "grape"];

it("array caculator，Non-equal point situation", () => {
  expect(arrCaculator(arrA)).toEqual({ userID: "apple", point: 3 });
});

const arrB = ["apple", "banana", "banana", "banana", "apple", "apple", "grape"];

it("array caculator，if Same score situation，then take the lastest to be winner", () => {
  expect(arrCaculator(arrB)).toEqual({ userID: "apple", point: 3 });
});
