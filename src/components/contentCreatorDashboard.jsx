
import React, { useState } from 'react';
import ExerciseCard from './exerciseCard';
import ExcerciseDefinition from './exerciseDefinition';
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
    const legendTemplate =(
        <div className="flex align-items-center">
            <span>יחידות מוכנות לפרסום</span>
        </div>
    )

    

    return (
        <div className='contentCreatorDashboard flex flex-column align-items-center' >
            <span className='flex flex-column vertical-align-baseline w-9'>
                <h3>שלום יוני וסילבסקי</h3>
                <div className='flex flex-row justify-content-center align-items-center w-auto gap-3 mx-5'>
                    <label className='w-3'>חפש תרגיל</label>
                    <AutoComplete className='w-full h-3rem' />
                    <Button className='w-3 h-2rem' label='תרגיל חדש' onClick={() => setNewUnitDialogVisible(true)} />
                    <Dialog header="הגדרת תרגיל" visible={newUnitDialogVisible} onHide={() => setNewUnitDialogVisible(false)}
                        headerStyle={{ direction: 'rtl' }} className='w-9' >
                        {<ExcerciseDefinition />}
                    </Dialog>
                </div>
            </span>

            <Card className='w-9 m-3 '>
                <Fieldset legend='תרגילים מוכנים לפרסום' toggleable>
                    <div className='unitCardsGrid'>
                        <ExerciseCard titleProp='Title' subtitleProp='subtitleProp' isPublished={true} />
                        <ExerciseCard titleProp='Title' subtitleProp='subtitleProp' isPublished={true} />
                    </div>
                </Fieldset>
                <Fieldset legend='תרגילים בהכנה' toggleable>
                    <div className='unitCardsGrid'>
                        <ExerciseCard titleProp='Title' subtitleProp='subtitleProp' isPublished={false} />
                        <ExerciseCard titleProp='Title' subtitleProp='subtitleProp' isPublished={false} />
                    </div>
                </Fieldset>
            </Card>
        </div>
    );
}

export default ContentCreatorDashBoard;
