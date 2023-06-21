import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import ExcerciseDefinition from './exerciseDefinition';
function ExerciseCard({ exerciseData }) {
    const toast = useRef(null);

    const copyLink = () => {
        navigator.clipboard.writeText(linkString)
        toast.current.show({ severity: 'success', summary: 'Info', detail: 'קישור הועתק בהצלחה' });
    };

    const [dialogVisible, setDialogVisible] = useState(false)
    const bgColor = exerciseData.isPublished ? 'white' : 'surface-300'
    const header = (
        <div></div>
    );
    const linkString=`https://virtualoicenter.github.io/3DLS/?mode=exerciseViewer&exerciseID=${exerciseData._id}`
    const footer = (
        <div className="flex flex-row justify-content-start gap-2 w-full">
            <Button label="צפייה" icon="pi pi-external-link" iconPos='right'
                className="p-button-secondary gap-2 " outlined onClick={() => setDialogVisible(true)} />
            {!exerciseData.isPublished?  <Button label="פרסום" icon="pi pi-verified" iconPos='right' outlined
                className="gap-2 " severity='success' />
                :<Button label="קישור" icon="pi pi-link" iconPos='right' outlined
                className="gap-2 " onClick={copyLink} />}
        </div>
    );
    return (
        <div className='unitCard ' >
            <Toast ref={toast} />
            <Card style={{ backgroundColor: { bgColor } }}
                title={exerciseData.title} subTitle={exerciseData.info} footer={footer} header={header}>
            </Card>
            <Dialog header="הגדרת תרגיל" visible={dialogVisible} onHide={() => setDialogVisible(false)}
                headerStyle={{ direction: 'rtl' }} className='w-9' >
                {ExcerciseDefinition(exerciseData)}
            </Dialog>
        </div>
    );
}

export default ExerciseCard;
