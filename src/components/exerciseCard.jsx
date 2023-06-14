import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ExcerciseDefinition from './exerciseDefinition';
function ExerciseCard({ exerciseData }) {
    const [dialogVisible, setDialogVisible] = useState(false)
    const bgColor = exerciseData.isPublished ? 'white' : 'surface-300'
    const header = (
        <div></div>
    );
    const footer = (
        <div className="flex flex-row justify-content-start gap-2 w-full">
            <Button label="צפייה" icon="pi pi-external-link" iconPos='right'
                className="p-button-secondary gap-2 " outlined onClick={() => setDialogVisible(true)} />
            {!exerciseData.isPublished && <Button label="פרסום" icon="pi pi-verified" iconPos='right' outlined
                className="gap-2 " severity='success' />}
        </div>
    );
    return (
        <div className='unitCard ' >
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
