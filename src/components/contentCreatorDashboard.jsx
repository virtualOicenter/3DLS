
import React, { useState, useRef } from 'react';
import UnitCard from './unitCard';
import UnitDefinition from './unitDefinition';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';

function ContentCreatorDashBoard() {
    const [newUnitDialogVisible, setNewUnitDialogVisible] = useState(false)
    const legendTemplate = (
        <div className="flex align-items-center">
            <span>יחידות מוכנות לפרסום</span>
        </div>
    );


    return (
        <div className='contentCreatorDashboard flex flex-column align-items-center' >
            <span className='flex flex-row justify-content-between vertical-align-baseline w-10 gap-4'>
                <h3>שלום יוני וסילבסקי</h3>
                <AutoComplete className='w-full h-3rem' />

                <Button className='w-2 h-2rem  align-self-start' label='יחידה חדשה' onClick={() => setNewUnitDialogVisible(true)} />
                <Dialog header="הגדרת תרגיל" visible={newUnitDialogVisible} style={{ width: '50vw' }} onHide={() => setNewUnitDialogVisible(false)}
                headerStyle={{direction:'rtl'}} className='w-9'>
                    {<UnitDefinition/>}
                </Dialog>
            </span>

            <Card className='w-9 '>
                <Fieldset legend={legendTemplate} toggleable>
                    <div className='unitCardsGrid'>
                        <UnitCard isPublished={true} />
                        <UnitCard isPublished={true} />
                    </div>
                </Fieldset>
                <Fieldset legend='יחידות בהכנה' toggleable>
                    <div className='unitCardsGrid'>
                        <UnitCard isPublished={false} />
                        <UnitCard isPublished={false} />
                    </div>
                </Fieldset>
            </Card>
        </div>
    );
}

export default ContentCreatorDashBoard;
