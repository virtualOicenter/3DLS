export const Fetch3DModelsArr = async () => {
  return fetch('https://yonivas0.editorx.io/etil3ls/_functions-dev/getModelsArr', { method: 'GET' })
        .then(response => response.json())
        .then(data => data.message)
        .catch(error => {
            console.error('Error fetching data', error);
            return null;
        });
};
export const FetchHotspotsArrToModel = async (modelId) => {
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions-dev/getHotspotsArrToModel/${modelId}`, { method: 'GET' })
        .then(response => response.json())
        .then(data =>{console.log(data.message); return data.message})
        .catch(error => {
            console.error('Error fetching data', error);
            return null;
        });
};
/**
import React, { useEffect, useState } from 'react';
export const Fetch3DModelsArr = async () => {
  return fetch('https://yonivas0.editorx.io/etil3ls/_functions-dev/getModelsArr', { method: 'GET' })
        .then(response => response.json())
        .then(data => data.message)
        .catch(error => {
            console.error('Error fetching data', error);
            return null;
        });
};
 

 */