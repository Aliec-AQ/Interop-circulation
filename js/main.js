import * as covid from "./covid.js";
import { createGraph } from "./graph.js";
import { getIpInfo } from "./ip.js";
import { createVeloMap } from "./velo.js";
import { addAirQuality } from "./air.js";
import { addWeather } from "./meteo.js";


window.addEventListener('load', async function() {
    const ipInfo = await getIpInfo();

    addMaxevilleData();
    
    addSarsDataByIp(ipInfo);

    addVelosData(ipInfo);

    addAirQuality('Nancy');
    
    addWeather(ipInfo);
});

async function addMaxevilleData() {
    const maxevilleData = await covid.fetchAllMaxevilleData();
    createGraph('chartMaxeville', maxevilleData, 'SARSCov2 dans les eaux usées de Maxéville');
}

async function addSarsDataByIp(ipInfo) {
    const sarsDepatementData = await covid.fetchSarsDataByIp(ipInfo);
    const sarsDataByHospitalization = await covid.formatDataByHospitalization(sarsDepatementData.data);
    createGraph('chartHosp', sarsDataByHospitalization, 'Hospitalisations dues au Covid-19 dans le département '+sarsDepatementData.department);
    const sarsDataByPositiveCases = await covid.formatDataByPositiveCases(sarsDepatementData.data);
    createGraph('chartPos', sarsDataByPositiveCases, 'Cas positifs au Covid-19 dans le département '+sarsDepatementData.department);
}

async function addVelosData(ipInfo) {
    const coordonneeClient = [ipInfo.latitude, ipInfo.longitude];
    await createVeloMap(coordonneeClient);
}