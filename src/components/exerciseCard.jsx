import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import ExcerciseDefinition from './exerciseDefinition';
import { PublishExerciseOnWix } from './fetchWixData';
function ExerciseCard({ exerciseData,setExercisesArr }) {
    const toast = useRef(null);

    const copyLink = () => {
        navigator.clipboard.writeText(linkString)
        toast.current.show({ severity: 'success', summary: 'קישור הועתק בהצלחה', detail: 'ניתן לפתוח לשונית חדשה ולהכנס לקישור שהועתק' });
    };
    const publishExercise = async () => {
        await PublishExerciseOnWix(exerciseData._id).then(res => {
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'פעילות פורסמה בהצלחה' });
        }).catch(error=>{
        toast.current.show({ severity: 'error', summary: 'Info', detail: 'שגיאה בפרסום הפעילות' });
        })
    }
    const [dialogVisible, setDialogVisible] = useState(false)
    const bgColor = exerciseData.isPublished ? 'white' : 'surface-300'
    const header = (
        <div></div>
    );
    const linkString = `https://virtualoicenter.github.io/3DLS/?mode=exerciseViewer&exerciseID=${exerciseData._id}`
    const footer = (
        <div className="flex flex-row justify-content-start gap-2 w-full">
            <Button label="צפייה" icon="pi pi-external-link" iconPos='right'
                className="p-button-secondary gap-2 " outlined onClick={() => setDialogVisible(true)} />
            {!exerciseData.isPublished ? <Button label="פרסום" icon="pi pi-verified" iconPos='right' outlined
                className="gap-2 " severity='success' onClick={publishExercise} />
                : <Button label="קישור" icon="pi pi-link" iconPos='right' outlined
                    className="gap-2 " onClick={copyLink} />}
        </div>
    );
    const subTitle = (
        <div>
            <p className='line-height-1'>{exerciseData.lecturer}</p>
            <p className='line-height-1'>{exerciseData.info}</p>
        </div>
    )
    return (
        <div className='unitCard' >
            <Toast ref={toast} />
            <Card className='h-full' style={{ backgroundColor: { bgColor } }}
                title={exerciseData.title} subTitle={subTitle} footer={footer} header={header}>
            </Card>
            <Dialog header="הגדרת פעילות" visible={dialogVisible} onHide={() => setDialogVisible(false)}
                headerStyle={{ direction: 'rtl' }} className='w-9' >
                {ExcerciseDefinition(exerciseData)}
            </Dialog>
        </div>
    );
}

export default ExerciseCard;
