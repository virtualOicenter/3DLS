export const FetchExercises = async () => {
  return fetch('https://yonivas0.editorx.io/etil3ls/_functions-dev/getExercises', { method: 'GET' })
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
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
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const FetchTagsOptions = async () => {
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions-dev/getTagsOptions`, { method: 'GET' })
    .then(response => response.json())
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const CreateExercise = async (exerciseJSON) => {
  console.log('excersiceJSON before post', exerciseJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions-dev/createExercise`,
    {
      method: 'POST',
      body: JSON.stringify({ exerciseJSON })
    })
    .then(response => response.json())
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const UpdateExercise = async (exerciseJSON) => {
  console.log('excersiceJSON before post', exerciseJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions-dev/updateExercise`,
    {
      method: 'POST',
      body: JSON.stringify({ exerciseJSON })
    })
    .then(response => response.json())
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const UpdateHotspotsFile = async (hotspotsFileJSON) => {
  console.log('excersiceJSON before post', hotspotsFileJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions-dev/updateHotspotsFile`,
    {
      method: 'POST',
      body: JSON.stringify({ hotspotsFileJSON })
    })
    .then(response => response.json())
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const Create3DModel = async (modelJSON) => {
  console.log('excersiceJSON before post', modelJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions-dev/create3DModel`,
    {
      method: 'POST',
      body: JSON.stringify({ modelJSON })
    })
    .then(response => response.json())
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};