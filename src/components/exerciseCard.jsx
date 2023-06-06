import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function ExerciseCard({ titleProp, subtitleProp, isPublished }) {
    const bgColor = isPublished ? 'white' : 'surface-300'
    const header = (
        <div></div>
    );
    const footer = (
        <div className="flex flex-row justify-content-start gap-2 w-full">
            <Button label="עריכה" icon="pi pi-external-link" iconPos='right'
                className="p-button-secondary gap-2 " outlined />
            {!isPublished && <Button label="פרסום" icon="pi pi-verified" iconPos='right' outlined
                className="gap-2 " severity='success' />}
        </div>
    );
    return (
        <div className='unitCard ' >
            <Card style={{ backgroundColor: { bgColor } }}
                title={titleProp} subTitle={subtitleProp} footer={footer} header={header}>
            </Card>
        </div>
    );
}

export default ExerciseCard;
