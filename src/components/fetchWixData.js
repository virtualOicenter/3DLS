export const FetchExercises = async () => {
  return fetch('https://yonivas0.editorx.io/etil3ls/_functions/getExercises', { method: 'GET' })
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const Fetch3DModelsArr = async () => {
  return fetch('https://yonivas0.editorx.io/etil3ls/_functions/getModelsArr', { method: 'GET' })
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const FetchHotspotsArrToModel = async (modelId) => {
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/getHotspotsArrToModel/${modelId}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const FetchTagsOptions = async () => {
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/getTagsOptions`, { method: 'GET' })
    .then(response => response.json())
    .then(data => { return data.message })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const CreateExercise = async (exerciseJSON) => {
  console.log('exerciseJSON before post', exerciseJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/createExercise`, {
    method: 'POST',
    body: JSON.stringify({ exerciseJSON })
  })
    .then(response => {
      // console.log('response', response);
      return response.json();
    })
    .then(data => {
      // console.log('data', data);
      return data.inserted;
    })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const UpdateExercise = async (exerciseJSON) => {
  console.log('excersiceJSON before post', exerciseJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/updateExercise`,
    {
      method: 'POST',
      body: JSON.stringify({ exerciseJSON })
    })
    .then(response => response.json())
    .then(data => { return data.updated })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const CreateHotspotsFile = async (hotspotsFile) => {
  console.log('hotspotsFile before post', hotspotsFile);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/createHotspotsFile`, {
    method: 'POST',
    body: JSON.stringify({ hotspotsFile })
  })
    .then(response => {
      // console.log('response', response);
      return response.json();
    })
    .then(data => {
      // console.log('data', data);
      return data.inserted;
    })
    .catch(error => {
      console.error('Error fetching data', error);
      return null;
    });
};
export const UpdateHotspotsFile = async (hotspotsFileJSON) => {
  console.log('excersiceJSON before post', hotspotsFileJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/updateHotspotsFile`,
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
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/create3DModel`,
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