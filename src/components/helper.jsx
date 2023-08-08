import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";

const getConterCreatorDashboardHelper = () => {
  return (
    <Accordion>
      <AccordionTab header="יצירת תרגיל חדש">
<iframe src="https://scribehow.com/embed/Creating_a_New_Activity_and_Saving_Files_in_3DLS__Ey1Nvw27SGavHSBl5_g1_g?as=scrollable&skipIntro=true" width="100%" height="640" allowFullScreen className="border-none"></iframe>
      </AccordionTab>
      <AccordionTab header="שכפול או יצירת קובץ נקודות">
      <iframe src="https://scribehow.com/embed/Create_Duplicate_and_Edit_Point_Files_in_3DLS_Content_Creator_Dashboard__UjnYp-iLRCWw7FDe9ZC6Fw?as=scrollable&skipIntro=true" width="100%" height="640" allowFullScreen className="border-none"></iframe>
      </AccordionTab>
      <AccordionTab header="סימון נקודות על מודל">
        <p className="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus.
        </p>
      </AccordionTab>
    </Accordion>
  );
};

export default function Helper({ modeId }) {
  const [visible, setVisible] = useState(false);
  const getHelper = () => {
    switch (modeId) {
      case "editor":
        return <div>editor</div>;
      case "quiz":
        return <div>quiz</div>;
      case "fileUpload":
        return <div>fileUpload</div>;
      case "contentCreatorDashBoard":
        return getConterCreatorDashboardHelper();
      case "exerciseViewer":
        return <div>exerciseViewer</div>;
      default:
        return <div>helper</div>;
    }
  };

  return (
    <div className="absolute w-3 align-self-end flex p-3 justify-content-end">
      <Button
        icon="pi pi-info"
        rounded
        severity="info"
        onClick={() => setVisible(true)}
        style={{top:"10vh"}}
      />
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        style={{ direction: "rtl" }}
        className="w-4 h-screen"
      >
        <h2>עזרה</h2>
        {getHelper()}
      </Sidebar>
    </div>
  );
}
