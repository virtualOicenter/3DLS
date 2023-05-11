export default function getModel(searchId) {
    const models=
    [
        {
            id: 'animal_cell',
            src:'https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels@15a8c378fe92860478ee9142e68e7aadb8241169/animal_cell.glb',
            title:'Animal Cell',
            description:'Human Cell',
            attribution:'Human Cell by markdragan on Sketchfab',
            url:'https://skfb.ly/6ZVHJ',
            linkedHotspotsFiles:['liora_animalCell'],
            additionalProps:[{
                cameraOrbit:"208.2deg 76.17deg 0.4071m",
                fieldOfView:"24.31deg"
            }]
        },
        {
            id: 'digestive_system',
            src:'https://cdn.jsdelivr.net/gh/virtualOicenter/3dModels@15a8c378fe92860478ee9142e68e7aadb8241169/disgestive_system.glb',
            title:'Digestive System',
            description:'Digestive System',
            attribution:'Disgestive system by Enas on Sketchfab',
            url:'https://skfb.ly/6ZPZx',
            linkedHotspotsFiles:['osnat_digestiveSystem'],
            additionalProps:[{
                cameraOrbit:"0deg 75deg 4.148m",
                fieldOfView:"30deg"
            }]
        }
    ]
    return models.find(f=>f.id===searchId)?models.find(f=>f.id===searchId):false
}