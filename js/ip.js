'use strict';


async function getIpInfo(){
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
    }
}


async function getDepartmentFromCoordinates(latitude, longitude) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.features[0].properties.context.split(', ')[0];
    } catch (error) {
        console.error('Erreur lors de la récupération du département:', error);
        return null;
    }
}

export {
    getIpInfo,
    getDepartmentFromCoordinates
}