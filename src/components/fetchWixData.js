export const FetchExercises = async () => {
  return fetch('https://yonivas0.editorx.io/etil3ls/_functions/getExercises', { method: 'GET' })
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching exercise data', error);
      return error;
    });
};
export const Fetch3DModelsArr = async () => {
  return fetch('https://yonivas0.editorx.io/etil3ls/_functions/getModelsArr', { method: 'GET' })
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching 3d model arr data', error);
      return error;
    });
};
export const FetchHotspotsArrToModel = async (modelId) => {
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/getHotspotsArrToModel/${modelId}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching HotspotsArrToModel data', error);
      return error;
    });
};
export const FetchTagsOptions = async () => {
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/getTagsOptions`, { method: 'GET' })
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching tags data', error);
      return error;
    });
};
export const CreateExercise = async (exerciseJSON) => {
  console.log('exerciseJSON before post', exerciseJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/createExercise`, {
    method: 'POST',
    body: JSON.stringify({ exerciseJSON })
  })
    .then(response => response.json())
    .then(data => data.inserted)
    .catch(error => {
      console.error('Error creating exercise', error);
      return error;
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
    .then(data => data.updated)
    .catch(error => {
      console.error('Error updating exercise', error);
      return error;
    });
};
export const CreateHotspotsFile = async (hotspotsFile) => {
  console.log('hotspotsFile before post', hotspotsFile);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/createHotspotsFile`, {
    method: 'POST',
    body: JSON.stringify({ hotspotsFile })
  })
  .then(response => response.json())
  .then(data => data.inserted)
    .catch(error => {
      console.error('Error creating hotspots file', error);
      return error;
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
    .then(data => data.updated)
    .catch(error => {
      console.error('Error updating hotspots file', error);
      return error;
    });
};
export const Create3DModel = async (modelJSON) => {
  console.log('modelJSON before post', modelJSON);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/create3DModel`,
    {
      method: 'POST',
      body: JSON.stringify({ modelJSON })
    })
    .then(response => response.json())
    .then(data => data.inserted)
    .catch(error => {
      console.error('Error creating 3d model', error);
      return error;
    });
};
export const PublishExerciseOnWix = async (exerciseId) => {
  console.log('excersiceJSON before post', exerciseId);
  return fetch(`https://yonivas0.editorx.io/etil3ls/_functions/publishExercise`,
  {
    method: 'POST',
    body: JSON.stringify({ exerciseId })
  })
  .then(response => response.json())
  .then(data => data.inserted)
  .catch(error => {
    console.error('Error publishing exercise', error);
    return error;
  });
};