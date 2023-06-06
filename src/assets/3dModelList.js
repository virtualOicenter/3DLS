// const modelUrl = `https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels/${modelIDParam}.glb`;
import React, { useEffect, useState } from 'react';
const cdnPrefix = 'https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels/'


export default function getModel(searchId) {
    return modelsList.find(f => f.id === searchId) ? modelsList.find(f => f.id === searchId) : false
}
export const modelsList = [
    {
        id: 'animal_cell',
        src: `${cdnPrefix}animal_cell.glb`,
        title: 'Animal Cell',
        description: 'Human Cell',
        attribution: 'Human Cell by markdragan on Sketchfab',
        url: 'https://skfb.ly/6ZVHJ',
        linkedHotspotsFiles: ['liora_animalCell'],
        additionalProps: [{
            "cameraOrbit": "208.2deg 76.17deg 0.4071m",
            "fieldOfView": "24.31deg"
        }]
    },
    {
        id: 'digestive_system',
        src: 'https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels@15a8c378fe92860478ee9142e68e7aadb8241169/disgestive_system.glb',
        title: 'Digestive System',
        description: 'Digestive System',
        attribution: 'Disgestive system by Enas on Sketchfab',
        url: 'https://skfb.ly/6ZPZx',
        linkedHotspotsFiles: ['osnat_digestiveSystem'],
        additionalProps: [{
            "cameraOrbit": "0deg 75deg 4.148m",
            "fieldOfView": "30deg"
        }]
    },
    {
        id: 'carrot_crossSection',
        src: 'https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels@c8363e829b4dda325393499e7d9cf1b7b47faadd/carrot_collection.glb',
        title: 'Carrot Collection',
        description: 'Carrot Collection',
        attribution: 'Carrot Collection by Adam.White on Sketchfab',
        url: 'https://skfb.ly/orwUK',
        linkedHotspotsFiles: ['yael_carrot'],
        additionalProps: [{
            "cameraOrbit": "-162.7deg 73.76deg 0.4485m",
            "fieldOfView": "20.11deg"
        }]
    }
]