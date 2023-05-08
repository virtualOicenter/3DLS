export default function getInitialHotspotsArr(questionTitle) {
  return initialHotspotsArr;
}
const editorData = [
  <button class="Hotspot" slot="hotspot-1" data-surface="5 0 861 866 862 0.589 0.213 0.198" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">גרעין התא</div>
  </button>, <button class="Hotspot" slot="hotspot-2" data-surface="0 0 3878 3828 3849 0.763 0.157 0.079" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">דנ"א (חומצות גרעין)</div>
  </button>, <button class="Hotspot" slot="hotspot-3" data-surface="2 0 10605 10598 10601 0.043 0.024 0.934" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">קרום התא (בנוי משתי שכבות של פוספוליפידים)</div>
  </button>, <button class="Hotspot" slot="hotspot-6" data-surface="6 0 730 732 733 0.566 0.002 0.432" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">מיטוכונדריה</div>
  </button>, <button class="Hotspot" slot="hotspot-8" data-surface="11 0 4214 4215 4216 0.223 0.341 0.436" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">מערכת גולג'י</div>
  </button>, <button class="Hotspot" slot="hotspot-9" data-surface="15 0 4173 4174 4151 0.127 0.400 0.473" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">רשת תוך פלזמתית (אנדורטיקולום) חלקה</div>
  </button>, <button class="Hotspot" slot="hotspot-10" data-surface="18 0 799 30571 30572 0.273 0.537 0.190" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">רשת תוך פלזמתית (אנדורטיקולום) מחוספסת</div>
  </button>, <button class="Hotspot" slot="hotspot-11" data-surface="14 0 1230 1228 1229 0.270 0.553 0.178" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">ליזוזים</div>
  </button>]
/*    <div class="progress-bar hide" slot="progress-bar">
        <div class="update-bar"></div>
    </div>
    <button slot="ar-button" id="ar-button">
        View in your space
    </button>
*/
const HotspotsData = () => {
  // Create an empty array to store the JSON objects
  const data = editorData;
  const hotspotArray = [];

  // Loop through the data props and convert each hotspot to a JSON object
  data.forEach((hotspot, index) => {
    const { slot, dataSurface, visibilityAttribute } = hotspot;
    const annotation = hotspot.children.props.children;

    // Create a JSON object for each hotspot
    const hotspotObj = {
      id: slot, // You can use a unique identifier for id, such as the index + 1
      title: (index + 1).toString(),
      dataSurface: dataSurface,
      answer: annotation,
      question: "נקודה זו היא:",
      userAnswer: "",
      options: []
    };

    // Push the hotspotObj to the hotspotArray
    hotspotArray.push(hotspotObj);
  });

  // Return the array of JSON objects
  return hotspotArray;
};

const initialHotspotsArr = [
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
