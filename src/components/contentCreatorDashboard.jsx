
import React, { useState, useEffect } from 'react';
import ExerciseCard from './exerciseCard';
import ExcerciseDefinition from './exerciseDefinition';
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Dialog } from 'primereact/dialog';
import { FetchExercises } from './fetchWixData';

const emptyExercise =
{
    "model": "",
    "info": "",
    "hotspotsFile": "",
    "title": "",
    "tags": null,
    "isPublished": false
}


function ContentCreatorDashBoard() {
    const [newExerciseDialogVisible, setNewExerciseDialogVisible] = useState(false)
    const [exercisesArr, setExercisesArr] = useState(null)
    const [isLoaded,setIslLoaded] = useState(false)
    const legendTemplate = (
        <div className="flex align-items-center">
            <span>יחידות מוכנות לפרסום</span>
        </div>
    )
    useEffect(() => {
        // let isMounted = true;

        const fetchExercises = async () => {
            try {
                const exercisesArr = await FetchExercises();
                console.log('exercises arr', exercisesArr);
                if (!isLoaded) {
                    setExercisesArr(exercisesArr);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchExercises();

        return () => {
            setIslLoaded(true)
        };
    }, []);


    return (
        <div className='contentCreatorDashboard flex flex-column align-items-center w-15' >
            <span className='flex flex-column vertical-align-baseline w-9'>
                <h3>שלום יוני וסילבסקי</h3>
                <div className='flex flex-row justify-content-center align-items-center w-auto gap-3 mx-5'>
                    <label className='w-3'>חפש תרגיל</label>
                    <AutoComplete className='w-full h-3rem' />
                    <Button className='w-3 h-2rem' label='תרגיל חדש' onClick={() => setNewExerciseDialogVisible(true)} />
                    <Dialog header="הגדרת תרגיל" visible={newExerciseDialogVisible} onHide={() => setNewExerciseDialogVisible(false)}
                        headerStyle={{ direction: 'rtl' }} className='w-9' >
                        {ExcerciseDefinition(emptyExercise)}
                    </Dialog>
                </div>
            </span>

            <Card className='w-9 m-3 '>
                <Fieldset legend='תרגילים מוכנים לפרסום' toggleable>
                    <div className='unitCardsGrid'>
                        {exercisesArr && exercisesArr.filter(f => f.isPublished).map((exercise, index) => {
                            return <ExerciseCard key={index} exerciseData={exercise} />
                        })}
                    </div>
                </Fieldset>
                <Fieldset legend='תרגילים בהכנה' toggleable>
                    <div className='unitCardsGrid'>
                        {exercisesArr && exercisesArr.filter(f => !f.isPublished).map((exercise, index) => {
                            return <ExerciseCard key={index} exerciseData={exercise} />
                        })}
                    </div>
                </Fieldset>
            </Card>
        </div>
    );
}

export default ContentCreatorDashBoard;
