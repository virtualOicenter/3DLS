
import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function UnitCard(title, subtitle,isPublished) {
    const bgColor = isPublished ? 'white' : 'surface-300'
    const header = (
        <div></div>
    );
    const footer = (
        <div className="flex flex-wrap justify-content-start gap-2">
            <Button label="עריכה" icon="pi pi-external-link" iconPos='right'
            className="p-button-outlined p-button-secondary gap-2 " />
        </div>
    );
    return (
        <div className='unitCard ' >
            <Card className={`bg-${bgColor}`} title="Title" subTitle="Subtitle" footer={footer} header={header}>
            </Card>
        </div>
    );
}

export default UnitCard;
