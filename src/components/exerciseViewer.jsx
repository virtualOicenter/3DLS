import React, { useState, useEffect } from "react";
import { FetchExercises } from './fetchWixData';
import DNDQuizPage from "./dndquiz";
import ActivityPage from "./activity";

export default function ExerciseViewer({exerciseID}) {
    const [exercise, setExercise] = useState(null)
    const [isLoaded,setIslLoaded] = useState(false)

    useEffect(() => {
        // let isMounted = true;

        const fetchExercises = async () => {
            try {
                const exercisesArr = await FetchExercises();
                console.log('exercisesArr',exercisesArr);
                if (!isLoaded) {
                    setExercise(exercisesArr.find(f=>f._id==exerciseID));
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
     if (exercise) {
    return exercise.type === 'DND' ? (
      <DNDQuizPage exercise={exercise} />
    ) : (
      <ActivityPage exercise={exercise} />
    );
  }

  return null;
}
