import {generateQuestion} from "./module/questions/question.js";
import {getRandomInt} from "./module/helper/helper.js";
import {getJsonData} from "./module/data/data.js";

let overallData;

createDataOnPageLoad();

/**
 * Init function
 */
function createDataOnPageLoad() {
    getJsonData('./data/questions.json').then(data => {
        overallData = JSON.parse(data);
        let randomFirstQuestion = overallData[getRandomInt(overallData.length)];
        generateQuestion(randomFirstQuestion);
    });
}

export {overallData}
