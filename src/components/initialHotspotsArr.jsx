import React, { useEffect, useState } from "react"
export default function getInitialHotspotsArr(hotspotsArrID) {
  return initialHotspotsArr[hotspotsArrID];
}
const initialHotspotsArr = []
initialHotspotsArr["osnat_digestiveSystem"] = [{"id":"hotspot-1","title":1,"question":"נקודה זו היא:","options":[],"answer":"ghffghghf","dataSurface":"3 0 155 152 153 0.361 0.109 0.530","userAnswer":""},{"id":"hotspot-7","title":7,"question":"נקודה זו היא:","options":[],"answer":"54654","dataSurface":"1 0 36 35 56 0.390 0.553 0.057","userAnswer":""},{"id":"hotspot-3","title":3,"question":"נקודה זו היא:","options":[],"answer":"!@##","dataSurface":"1 0 89 88 86 0.020 0.337 0.644","userAnswer":""}]
initialHotspotsArr["liora_animalCell"] = [
  {
    id: "hotspot-1",
    title: "1",
    question: "נקודה זו היא:",
    options: [],
    answer: "גרעין התא",
    dataSurface: "5 0 861 866 862 0.589 0.213 0.198",
    userAnswer: "",
  },
  {
    id: "hotspot-2",
    title: "2",
    question: "נקודה זו היא:",
    options: [],
    answer: "דנ'א (חומצות גרעין)",
    dataSurface: "0 0 3878 3828 3849 0.763 0.157 0.079",
    userAnswer: "",
  },
  {
    id: "hotspot-3",
    title: "3",
    question: "נקודה זו היא:",
    options: [],
    answer: "קרום התא (בנוי משתי שכבות של פוספוליפידים)",
    dataSurface: "2 0 10605 10598 10601 0.043 0.024 0.934",
    userAnswer: "",
  },
  {
    id: "hotspot-4",
    title: "4",
    question: "נקודה זו היא:",
    options: [],
    answer: "מיטוכונדריה",
    dataSurface: "6 0 730 732 733 0.566 0.002 0.432",
    userAnswer: "",
  },
  {
    id: "hotspot-5",
    title: "5",
    question: "נקודה זו היא:",
    options: [],
    answer: "מערכת גולג'",
    dataSurface: "11 0 4214 4215 4216 0.223 0.341 0.436",
    userAnswer: "",
  },
  {
    id: "hotspot-6",
    title: "6",
    question: "נקודה זו היא:",
    options: [],
    answer: "רשת תוך פלזמתית (אנדורטיקולום) חלקה",
    dataSurface: "15 0 4173 4174 4151 0.127 0.400 0.473",
    userAnswer: "",
  },
  {
    id: "hotspot-7",
    title: "7",
    question: "נקודה זו היא:",
    options: [],
    answer: "רשת תוך פלזמתית (אנדורטיקולום) מחוספסת",
    dataSurface: "18 0 799 30571 30572 0.273 0.537 0.190",
    userAnswer: "",
  },
  {
    id: "hotspot-8",
    title: "8",
    question: "נקודה זו היא:",
    options: [],
    answer: "ליזוזים",
    dataSurface: "14 0 1230 1228 1229 0.270 0.553 0.178",
    userAnswer: "",
  },
];
