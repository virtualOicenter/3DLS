import React, { useState, useRef, useEffect } from "react";
import { FetchExercises } from './fetchWixData';
import QuizPage from "./quiz";


/**
 * 
 * @param {{
    "model": {
        "additionalProps": {
            "cameraOrbit": "-162.7deg 73.76deg 0.4485m",
            "fieldOfView": "20.11deg"
        },
        "modelUrl": "https://skfb.ly/orwUK",
        "description": "Carrot Collection",
        "_id": "97cd052c-f194-4e16-a371-fd7abe0f0bb3",
        "_owner": "557f260a-7bca-4603-8714-27f769eb4c30",
        "_createdDate": "2023-06-06T08:01:43.646Z",
        "modelId": "carrot_crossSection",
        "_updatedDate": "2023-06-06T12:11:19.977Z",
        "attribution": "Carrot Collection by Adam.White on Sketchfab",
        "src": "https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels/carrot_collection.glb",
        "title": "Carrot Collection"
    },
    "_id": "df8f64a1-6ee7-412e-bc45-4fc146b50b42",
    "_owner": "a17adf2f-1512-4290-84a3-de271e2db02f",
    "_createdDate": "2023-06-08T10:18:22.320Z",
    "_updatedDate": "2023-06-13T12:54:24.116Z",
    "info": "זיהוי אברונים בגזר חתוך",
    "hotspotsFile": {
        "_id": "718a4d19-70b8-4a13-87f8-ab7da5d025fd",
        "_owner": "557f260a-7bca-4603-8714-27f769eb4c30",
        "_createdDate": "2023-06-06T09:38:56.947Z",
        "_updatedDate": "2023-06-14T12:49:33.003Z",
        "hotspots": [...],
        "title": "yael_carrot"
    },
    "title": "זיהוי אברונים בשורש",
    "type": "DND"
}} param0 
 * @returns 
 */
export default function ExerciseViewer({exerciseID}) {
    const [exercise, setExercise] = useState(null)
    const [isLoaded,setIslLoaded] = useState(false)

    useEffect(() => {
        // let isMounted = true;

        const fetchExercises = async () => {
            try {
                const exercisesArr = await FetchExercises();
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
    return (exercise && <QuizPage exercise={exercise}/>)
}
