import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import ExcerciseDefinition from "./exerciseDefinition";
function ExerciseCard({ exerciseData, publishExercise,deleteExercise }) {
  const toast = useRef(null);

  const copyLink = () => {
    navigator.clipboard.writeText(embedString);
    toast.current.show({ severity: "success", summary: "קישור הועתק בהצלחה" });
  };
  const [dialogVisible, setDialogVisible] = useState(false);
  const bgColor = exerciseData.isPublished ? "white" : "surface-300";
  const header = <div></div>;
  const linkString = `https://virtualoicenter.github.io/3DLS/?mode=exerciseViewer&exerciseID=${exerciseData._id}`;
  const embedString = `<iframe src="${linkString}" style="border:0px #ffffff none;" name="carrot-quiz" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="1200px" width="100%" allowfullscreen=""></iframe>`;
  const footer = (
    <div className="flex flex-row justify-content-start gap-2 w-full">
      {!exerciseData.isPublished ? (
        <>
          <Button
            label="עריכה"
            icon="pi pi-pencil"
            iconPos="right"
            className="p-button-secondary gap-2 "
            outlined
            onClick={() => setDialogVisible(true)}
          />
          <Button
            label="פרסום"
            icon="pi pi-verified"
            iconPos="right"
            outlined
            className="gap-2 "
            severity="success"
            onClick={() => publishExercise(exerciseData._id)}
          />
          <Button
            text
            icon="pi pi-trash"
            severity="danger"
            onClick={() => deleteExercise(exerciseData._id)}
          />
        </>
      ) : (
        <>
          <Button
            label="הפעל"
            icon="pi pi-external-link"
            iconPos="right"
            outlined
            className="p-button-secondary gap-2 "
            onClick={() => {
              window.open(linkString, "_blank");
            }}
          />
          <Button
            label="הטמעה"
            icon="pi pi-link"
            iconPos="right"
            outlined
            className="gap-2 "
            onClick={copyLink}
          />
        </>
      )}
    </div>
  );
  const subTitle = (
    <div className="h-4rem">
      <p className="line-height-1">מרצה: {exerciseData.lecturer}</p>
      <p className="line-height-1">תיאור: {exerciseData.info}</p>
    </div>
  );
  return (
    <div className="unitCard w-20rem">
      <Toast ref={toast} />
      <Card
        className="h-full"
        style={{ backgroundColor: { bgColor } }}
        title={exerciseData.title}
        subTitle={subTitle}
        footer={footer}
        header={header}
      ></Card>
      <Dialog
        header="הגדרת פעילות"
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        id={`exerciseDefinition${exerciseData._id}`}
        headerStyle={{ direction: "rtl" }}
        className="w-9"
        key={`exerciseDefinition${exerciseData._id}`}
      >
        {ExcerciseDefinition(exerciseData)}
      </Dialog>
    </div>
  );
}

export default ExerciseCard;
