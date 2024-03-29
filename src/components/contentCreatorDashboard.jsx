import React, { useState, useEffect, useRef } from "react";
import ExerciseCard from "./exerciseCard";
import ExcerciseDefinition from "./exerciseDefinition";
import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import {
  PublishExerciseOnWix,
  DeleteExerciseOnWix,
  FetchExercises,
} from "./fetchWixData";

const emptyExercise = {
  model: { _id: "new" },
  info: "",
  hotspotsFile: undefined,
  title: "",
  tags: null,
  isPublished: false,
  lecturer: "",
};

function ContentCreatorDashBoard() {
  const [newExerciseDialogVisible, setNewExerciseDialogVisible] =
    useState(false);
  const [exercisesArr, setExercisesArr] = useState(null);
  const [filterString, setFilterString] = useState("");
  const [isLoaded, setIslLoaded] = useState(false);
  const toast = useRef(null);

  const fetchExercises = async () => {
    try {
      const fetchedExercisesArr = await FetchExercises();
      setExercisesArr(fetchedExercisesArr);
      setIslLoaded(true);
      {
        console.log("exerciseData", fetchedExercisesArr);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [newExerciseDialogVisible]);

  const publishExercise = async (exerciseId) => {
    await PublishExerciseOnWix(exerciseId)
      .then((res) => {
        fetchExercises();
        toast.current.show({
          severity: "success",
          summary: "פעילות פורסמה בהצלחה",
        });
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: "שגיאה בפרסום הפעילות",
        });
      });
  };
  const deleteExercise = async (exerciseId) => {
    await DeleteExerciseOnWix(exerciseId)
      .then((res) => {
        fetchExercises();
        toast.current.show({
          severity: "success",
          summary: "פעילות נמחקה בהצלחה",
        });
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: "שגיאה במחיקת הפעילות",
        });
      });
  };
  return (
    <div
      className="contentCreatorDashboard flex flex-column align-items-center w-12"
      style={{ direction: "rtl" }}
    >
      <Toast ref={toast} />
      <span className="flex flex-column vertical-align-baseline w-11">
        <h3>שלום יוני וסילבסקי</h3>
        <div className="flex flex-row justify-content-center align-items-center w-auto gap-3 mx-5">
          <label className="w-3">חפש פעילות</label>
          <InputText
            className="w-full h-2rem"
            value={filterString}
            onChange={(e) => {
              setFilterString(e.target.value);
            }}
          />
          <Button
            className="w-3 h-2rem"
            label="פעילות חדשה"
            onClick={() => {
              setNewExerciseDialogVisible(true);
              setIslLoaded(false);
            }}
          />
          <Dialog
            id={`newExercise`}
            key={"newExercise"}
            header="הגדרת פעילות"
            visible={newExerciseDialogVisible}
            onHide={() => setNewExerciseDialogVisible(false)}
            headerStyle={{ direction: "rtl" }}
            className="w-9"
          >
            {ExcerciseDefinition(emptyExercise)}
          </Dialog>
        </div>
      </span>
      <Card className="min-w-7 w-11 min-h-3 p-3 m-3 flex-wrap">
        <Fieldset
          legend="פעילויות מוכנות לפרסום"
          toggleable
          key="published exercises"
        >
          <div className="min-h-1 p-1 flex flex-wrap gap-3 ">
            {exercisesArr &&
              exercisesArr
                .filter(
                  (f) =>
                    f.isPublished &&
                    f.title.toLowerCase().includes(filterString)
                )
                .map((exercise, index) => {
                  return (
                    <ExerciseCard
                      id={exercise._id}
                      key={`published${exercise._id}`}
                      exerciseData={exercise}
                      publishExercise={publishExercise}
                      deleteExercise={deleteExercise}
                    />
                  );
                })}
          </div>
        </Fieldset>
        <Fieldset
          legend="פעילויות בהכנה"
          toggleable
          keyy="unpublished exercises"
        >
          <div className="min-h-1 p-1 flex flex-wrap gap-3">
            {exercisesArr &&
              exercisesArr
                .filter(
                  (f) =>
                    !f.isPublished &&
                    f.title.toLowerCase().includes(filterString)
                )
                .map((exercise, index) => {
                  return (
                    <ExerciseCard
                      id={exercise._id}
                      key={`published${exercise._id}`}
                      exerciseData={exercise}
                      publishExercise={publishExercise}
                      deleteExercise={deleteExercise}
                    />
                  );
                })}
          </div>
        </Fieldset>
      </Card>
    </div>
  );
}

export default ContentCreatorDashBoard;
