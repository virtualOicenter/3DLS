import React, { useEffect, useState } from "react"
export default function getInitialHotspotsArr(hotspotsArrID) {
  return initialHotspotsArr[hotspotsArrID];
}
const initialHotspotsArr = []

initialHotspotsArr["osnat_digestiveSystem"] =[
  {
      "id": "hotspot-1",
      "title": 1,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "esophagus",
      "dataSurface": "5 0 205 206 203 0.399 0.522 0.079",
      "userAnswer": ""
  },
  {
      "id": "hotspot-2",
      "title": 2,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "liver",
      "dataSurface": "1 0 62 64 65 0.046 0.639 0.314",
      "userAnswer": ""
  },
  {
      "id": "hotspot-3",
      "title": 3,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "stomach",
      "dataSurface": "5 0 11 10 9 0.682 0.249 0.069",
      "userAnswer": ""
  },
  {
      "id": "hotspot-4",
      "title": 4,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "gallbladder",
      "dataSurface": "7 0 134 131 132 0.690 0.174 0.135",
      "userAnswer": ""
  },
  {
      "id": "hotspot-5",
      "title": 5,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "ascending colon",
      "dataSurface": "0 0 1052 1117 1106 0.105 0.327 0.569",
      "userAnswer": ""
  },
  {
      "id": "hotspot-6",
      "title": 6,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "transverse colon",
      "dataSurface": "0 0 3855 3790 3789 0.528 0.223 0.249",
      "userAnswer": ""
  },
  {
      "id": "hotspot-7",
      "title": 7,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "descending colon",
      "dataSurface": "0 0 7114 7116 7101 0.284 0.215 0.502",
      "userAnswer": ""
  },
  {
      "id": "hotspot-8",
      "title": 8,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "sigmoid colon",
      "dataSurface": "0 0 9309 9245 9244 0.743 0.003 0.254",
      "userAnswer": ""
  },
  {
      "id": "hotspot-9",
      "title": 9,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "rectum",
      "dataSurface": "0 0 10395 10383 557 0.670 0.272 0.058",
      "userAnswer": ""
  },
  {
      "id": "hotspot-10",
      "title": 10,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "anus",
      "dataSurface": "0 0 10490 10508 10506 0.864 0.003 0.133",
      "userAnswer": ""
  },
  {
      "id": "hotspot-11",
      "title": 11,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "small intestine",
      "dataSurface": "4 0 2167 2168 2169 0.335 0.308 0.356",
      "userAnswer": ""
  },
  {
      "id": "hotspot-12",
      "title": 12,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "pharynx",
      "dataSurface": "2 0 270 271 272 0.625 0.304 0.072",
      "userAnswer": ""
  },
  {
      "id": "hotspot-13",
      "title": 13,
      "question": "נקודה זו היא:",
      "options": [],
      "answer": "larynx",
      "dataSurface": "2 0 231 228 229 0.610 0.253 0.137",
      "userAnswer": ""
  }
]
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
