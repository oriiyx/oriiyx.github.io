import {overallData} from "../../main.js";

/**
 * Gets JSON file from URL
 * @param file
 * @returns {Promise<string>}
 */
async function getJsonData(file) {
    let x = await fetch(file);
    return await x.text();
}

/**
 * Sets new JSON file with new Data
 * @param newJsonData
 */
function setJsonDataAndSendItBackend(newJsonData) {
    let data = new FormData();
    data.append('data', newJsonData);
    let xhr = new XMLHttpRequest();
    xhr.open('post', './php/dataProcessor.php', true);
    xhr.send(data);
}

/**
 * Transforms array to json string
 * @param mappedJsonObject
 * @returns {string}
 */
function prepareJsonForBackend(mappedJsonObject) {
    return JSON.stringify(mappedJsonObject);
}

/**
 * Mapping new Json Data to existing Array of data
 * @param newJsonDataObject
 * @param id
 * @param {string} id
 */
function mapAndAssignNewValuesToJson(newJsonDataObject, id) {
    overallData.forEach((questionObject, key) => {
        if (questionObject.id === parseInt(id)) {
            overallData[key] = newJsonDataObject[0];
        }
    });

    return overallData;
}

/**
 *
 * @param chosenDataObject
 * @param id
 */
function handleDataTransfer(chosenDataObject, id) {
    let mappedJsonObject = mapAndAssignNewValuesToJson(chosenDataObject, id);

    let cleanedJsonString = prepareJsonForBackend(mappedJsonObject);

    setJsonDataAndSendItBackend(cleanedJsonString);
}

export {getJsonData, prepareJsonForBackend, handleDataTransfer}
