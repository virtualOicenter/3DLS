import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { BlockUI } from "primereact/blockui";
import HotspotsArrFileEditor from "./hotspotsArrFileEditor";
import ExerciseViewer from "./exerciseViewer";
import ModelFileUpload from "./uploadFile";
import {
  Fetch3DModelsArr,
  FetchHotspotsArrToModel,
  CreateExercise,
  CreateHotspotsFile,
  FetchTagsOptions,
  UpdateExercise,
  UpdateHotspotsFile,
} from "./fetchWixData";

const getModelOptions = (tempArr) => {
  let arr = Array.isArray(tempArr) ? tempArr : [];
  if (Array.isArray(arr)) {
    let toReturn = [...arr];
    toReturn.unshift({ title: "חדש", _id: "new" });
    return toReturn;
  }

  // If tempArr is a Promise, return an empty array
  return [];
};
const getHotspotsArrOptions = async (modelId) => {
  try {
    const hotspotsArr = await FetchHotspotsArrToModel(modelId);
    let tempArr = JSON.parse(JSON.stringify(hotspotsArr));
    tempArr.unshift({ title: "חדש", _id: "new" });
    return tempArr;
  } catch (error) {
    console.error("Error fetching hotspots array options", error);
    return [];
  }
};

function ExcerciseDefinition(dataProps) {
  const [exerciseData, setExerciseData] = useState(dataProps);
  const [selectedModel, setSelectedModel] = useState(exerciseData.model);
  const [selectedHotspotsFile, setSelectedHotspotsFile] = useState(
    exerciseData.hotspotsFile?._id
  );
  const [selectModelOptions, setModelSelectOptions] = useState([]);
  const [selectHotspotsArrOptions, setHotspotsArrOptions] = useState([]);
  const [selectTagsOptions, setSelectTags] = useState([]);
  const [isHotspotsEditorVisible, setIsHotspotsEditorVisible] = useState(false);
  const [unsavedData, setUnsavedData] = useState(false);
  const viewerRef = useRef(null);
  const toast = useRef(null);

  const exerciseTypeOptions = [
    { label: "בוחן גרירה", value: "DND" },
    { label: "פעילות למידה", value: "OTHER" },
  ];
  useEffect(() => {
    if (JSON.stringify(dataProps) !== JSON.stringify(exerciseData) && exerciseData.title!="" && exerciseData.info!="" && exerciseData.lecturer!="")
      setUnsavedData(true);
  }, [exerciseData]);

  useEffect(() => {
    let isMounted = true;

    const fetchModels = async () => {
      try {
        const modelsArr = await Fetch3DModelsArr();
        if (isMounted) {
          setModelSelectOptions(getModelOptions(modelsArr));
        }
      } catch (error) {
        console.error("Error fetching 3d models data", error);
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: "error fetching 3d models",
        });
      }
    };
    const fetchTags = async () => {
      try {
        let tagsArr = await FetchTagsOptions();
        tagsArr = tagsArr.map((m) => ({ title: m.title, _id: m._id }));
        if (isMounted) {
          setSelectTags(tagsArr);
        }
      } catch (error) {
        console.error("Error fetching tags data", error);
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: "error fetching tags",
        });
      }
    };

    fetchModels();
    fetchTags();

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    if (selectedModel && selectedModel._id != "new") {
      getHotspotsArrOptions(selectedModel._id)
        .then((hotspotsArrOptions) => {
          setHotspotsArrOptions(hotspotsArrOptions);
          setSelectedHotspotsFile(
            hotspotsArrOptions.find(
              (f) => f._id == exerciseData.hotspotsFile?._id
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching hotspots array options", error);
        });
    }
  }, [selectedModel]);

  const ModelViewer = () => {
    if (selectedModel && selectedModel.src) {
      return (
        <div style={{ height: "auto" }}>
          <model-viewer
            ref={viewerRef}
            src={selectedModel.src}
            alt="Model Preview"
            ar-modes="webxr scene-viewer quick-look"
            loading="eager"
            poster="../assets/Cube-1.5s-200px.svg"
            camera-controls
            interaction-prompt="none"
            shadow-intensity="1"
            ar
            autoplay
            // ios-src={URL.createObjectURL(previewFile)}
            style={{
              direction: "ltr",
              width: "100%",
              height: "100%",
              minHeight: "35rem",
            }}
          >
            {selectedHotspotsFile &&
              selectedHotspotsFile.hotspots &&
              selectedHotspotsFile.hotspots.map((hotspot, index) => {
                return (
                  <button
                    className={
                      hotspot.userAnswer == ""
                        ? "Hotspot w-full"
                        : "AnsweredHotspot w-full"
                    }
                    slot={hotspot.id}
                    data-surface={hotspot.dataSurface}
                    data-visibility-attribute="visible"
                    onClick={() => console.log(hotspot.id, "clicked")}
                    key={hotspot.id + index}
                  >
                    <div className="HotspotAnnotation w-full">
                      {hotspot.title}
                      <div className="hotspotDot">.</div>
                    </div>
                  </button>
                );
              })}
          </model-viewer>
        </div>
      );
    }
  };

  const hotspotsEditorFooter = () => {
    return (
      <div>
        <Toast ref={toast} />
        <Button
          label="שמור"
          icon="pi pi-check"
          iconPos="right"
          onClick={() => {
            UpdateHotspotsFile(selectedHotspotsFile)
              .then((res) => {
                setSelectedHotspotsFile(res);
                toast.current.show({
                  severity: "success",
                  summary: "success",
                  detail: "succefully updated hotspots file",
                });
              })
              .catch((e) =>
                toast.current.show({
                  severity: "error",
                  summary: "error",
                  detail: "error updated hotspots file",
                  e,
                })
              );
          }}
        />
        <Button
          label="בטל"
          icon="pi pi-times"
          iconPos="right"
          severity="danger"
          onClick={() => setIsHotspotsEditorVisible(false)}
        />
      </div>
    );
  };
  const handleSave = () => {
    // console.log('exerciseData',exerciseData);
    exerciseData._id
      ? UpdateExercise(exerciseData)
          .then((res) => {
            setUnsavedData(false);
            toast.current.show({
              severity: "success",
              summary: "success",
              detail: "succefully updated exercise file",
            });
          })
          .catch((e) =>
            toast.current.show({
              severity: "error",
              summary: "error",
              detail: "error updating exercise file",
              e,
            })
          )
      : CreateExercise(exerciseData)
          .then((res) => {
            setUnsavedData(false);
            setExerciseData(res);
            toast.current.show({
              severity: "success",
              summary: "success",
              detail: "succefully created exercise file",
            });
          })
          .catch((e) =>
            toast.current.show({
              severity: "error",
              summary: "error",
              detail: "error creating exercise file",
              e,
            })
          );
  };
  const createDuplicateHotspotsObj = (hotspotsObj) => {
    let duplicateObj = {
      _id: "new",
      hotspots: hotspotsObj.hotspots,
    };
    console.log("createDuplicateHotspotsObj", duplicateObj);

    setSelectedHotspotsFile(duplicateObj);
    return;
  };
  return (
    <div
      className="card flex flex-row column-gap-3"
      style={{ direction: "rtl" }} 
    >
      <Toast ref={toast} />
      <div className="card flex flex-column gap-3">
        <div className="p-inputgroup flex">
          <span className="p-inputgroup-addon ">
            <i className="pi pi-info-circle"></i>
          </span>
          <InputText
            placeholder="שם התרגיל"
            value={exerciseData.title}
            onChange={(e) => {
              let _exerciseData = { ...exerciseData, title: e.target.value };
              setExerciseData(_exerciseData);
            }}
          />
        </div>
        <div className="p-inputgroup flex">
          <span className="p-inputgroup-addon">
            <i className="pi pi-info-circle"></i>
          </span>
          <InputTextarea
            placeholder="תיאור קצר"
            value={exerciseData.info}
            onChange={(e) => {
              let _exerciseData = { ...exerciseData, info: e.target.value };
              setExerciseData(_exerciseData);
            }}
          />
        </div>
        <div className="p-inputgroup flex">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            placeholder="מרצה"
            value={exerciseData.lecturer}
            onChange={(e) => {
              let _exerciseData = { ...exerciseData, lecturer: e.target.value };
              setExerciseData(_exerciseData);
            }}
          />
        </div>
        <div className="p-inputgroup flex">
          <span className="p-inputgroup-addon">
            <i className="pi pi-tag"></i>
          </span>
          <Dropdown
            placeholder="סוג פעילות"
            value={exerciseData.type}
            options={exerciseTypeOptions}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => {
              let _exerciseData = { ...exerciseData, type: e.value };
              setExerciseData(_exerciseData);
            }}
          />
        </div>

        <Button
          label="שמור"
          icon="pi pi-check"
          iconPos="right"
          onClick={handleSave}
          disabled={!unsavedData}
        />
        {/* <Button label='בטל' icon="pi pi-times" iconPos='right' severity='danger' /> */}
      </div>
      <TabView className="w-full h-auto shadow-2">
        <TabPanel header="בחירת מודל" disabled={exerciseData._id == undefined}>
          <BlockUI
            blocked={exerciseData._id == undefined}
            template={
              <div
                style={{
                  opacity: "0.6",
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            }
          >
            <Dropdown
              value={selectModelOptions.find(
                (f) => f._id == exerciseData.model?._id
              )}
              onChange={(e) => {
                setSelectedModel(e.value);
                if (e.value !== "new") {
                  let _exerciseData = {
                    ...exerciseData,
                    model: e.target.value,
                  };
                  setExerciseData(_exerciseData);
                }
                console.log("exerciseData", exerciseData);
              }}
              placeholder="בחר מודל"
              className="w-full"
              options={selectModelOptions}
              optionLabel="title"
              panelStyle={{ direction: "rtl" }}
            />
            {selectedModel && selectedModel._id == "new" ? (
              <ModelFileUpload />
            ) : (
              <ModelViewer />
            )}
          </BlockUI>
        </TabPanel>
        <TabPanel
          header="בחירת קובץ נקודות"
          disabled={
            !selectedModel || selectedModel._id == "new" || !exerciseData.type
          }
        >
          <Dropdown
            value={selectedHotspotsFile}
            onChange={(e) => {
              setSelectedHotspotsFile(e.target.value, selectedHotspotsFile);
              if (e.value !== "new") {
                let _exerciseData = {
                  ...exerciseData,
                  hotspotsFile: e.target.value,
                };
                console.log("updated exercise data", exerciseData);
                setExerciseData(_exerciseData);
              }
            }}
            placeholder="בחר קובץ נקודות"
            className="w-full"
            options={selectHotspotsArrOptions}
            optionLabel="title"
            panelStyle={{ direction: "rtl" }}
          />
          {selectedHotspotsFile && selectedHotspotsFile._id == "new" ? (
            <div className="card flex flex-column gap-2 mt-2 align-items-start">
              <div className="flex flex-row gap-3 w-full">
                <div className="p-inputgroup flex">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-tag"></i>
                  </span>
                  <InputText
                    placeholder="שם הקובץ"
                    value={exerciseData.hotspotsFile?.title || ""}
                    onChange={(e) => {
                      let _hotspotsFile = {
                        ...selectedHotspotsFile,
                        title: e.target.value,
                      }; // Make a copy of the object
                      setExerciseData({
                        ...exerciseData,
                        hotspotsFile: _hotspotsFile,
                      });
                    }}
                  />
                </div>
                <Button
                  className="w-5 gap-3"
                  severity="secondary"
                  label="צור קובץ נקודות חדש"
                  icon="pi pi-plus"
                  iconPos="right"
                  onClick={async () => {
                    let _updatedHotspotsFile = {
                      title: exerciseData.hotspotsFile.title,
                      "3DModels": exerciseData.model._id,
                      exercise: exerciseData._id,
                      hotspots: selectedHotspotsFile.hotspots,
                    };
                    await CreateHotspotsFile(_updatedHotspotsFile)
                      .then((res) => {
                        setExerciseData({ ...exerciseData, hotspotsFile: res });
                        setSelectedHotspotsFile(res);
                      })
                      .then((res) => {
                        toast.current.show({
                          severity: "success",
                          summary: "success",
                          detail: "succefully updated hotspots file",
                        });
                      })
                      .catch((e) =>
                        toast.current.show({
                          severity: "error",
                          summary: "error",
                          detail: "error updating hotspots file",
                          e,
                        })
                      );
                    await getHotspotsArrOptions(selectedModel._id)
                      .then((hotspotsArrOptions) => {
                        setHotspotsArrOptions(hotspotsArrOptions);
                      })
                      .catch((error) => {
                        console.error(
                          "Error fetching hotspots array options",
                          error
                        );
                      });
                  }}
                />
              </div>
            </div>
          ) : (
            selectedHotspotsFile && (
              <div className="gap-3">
                {selectedHotspotsFile.exercise == exerciseData._id ? (
                  <div className="flex justify-content-between ">
                    <Button
                      className="w-max gap-3 gap-2 mt-2"
                      severity="secondary"
                      label="ערוך נקודות"
                      icon="pi pi-plus"
                      iconPos="right"
                      onClick={() => setIsHotspotsEditorVisible(true)}
                    />
                  </div>
                ) : (
                  <div className="flex justify-content-between ">
                    <Button
                      className="w-max gap-3 gap-2 mt-2"
                      severity="secondary"
                      label="שכפל קובץ נקודות"
                      icon="pi pi-copy"
                      iconPos="right"
                      onClick={() =>
                        createDuplicateHotspotsObj(selectedHotspotsFile)
                      }
                    />
                  </div>
                )}
                <ModelViewer />
                {selectedHotspotsFile && (
                  <Dialog
                    header={`עריכת נקודות בקובץ ${selectedHotspotsFile.title}`}
                    footer={hotspotsEditorFooter()}
                    visible={isHotspotsEditorVisible}
                    onHide={() => setIsHotspotsEditorVisible(false)}
                    headerStyle={{ direction: "rtl" }}
                    className="w-8"
                  >
                    <HotspotsArrFileEditor
                      exerciseData={exerciseData}
                      selectedHotspotsFile={selectedHotspotsFile}
                      setSelectedHotspotsFile={setSelectedHotspotsFile}
                    />
                  </Dialog>
                )}
              </div>
            )
          )}
        </TabPanel>
        <TabPanel
          header="תצוגה מקדימה לפעילות"
          disabled={
            !selectedModel ||
            !selectedHotspotsFile ||
            exerciseData.hotspotsFile?._id == "new"
          }
        >
          <ExerciseViewer exerciseID={exerciseData._id} />
        </TabPanel>
      </TabView>
    </div>
  );
}

export default ExcerciseDefinition;
