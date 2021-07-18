import {overallData} from '../../main.js';
import {handleDataTransfer} from "../data/data.js";
import {
    disableQuestionsAndShowPercentage,
    generateButtonForNextQuestion,
    generateQuestion
} from "../questions/question.js";

/**
 * Event Listener for CLicking on Questions
 * @param question
 */
function createEventListenerForQuestion(question) {
    question.addEventListener('click', function (event) {
        let id = question.getAttribute('data-id');
        let selectedQuestion = question.getAttribute('id');

        const chosenDataObject = overallData.filter(dataObject => {
            if (dataObject.id === parseInt(id)) {
                return dataObject;
            }
        });

        if (selectedQuestion === 'firstQuestion') {
            chosenDataObject[0]['firstAnswerSelected'] = chosenDataObject[0]['firstAnswerSelected'] + 1;
        }

        if (selectedQuestion === 'secondQuestion') {
            chosenDataObject[0]['secondAnswerSelected'] = chosenDataObject[0]['secondAnswerSelected'] + 1;
        }

        handleDataTransfer(chosenDataObject, id);
        disableQuestionsAndShowPercentage();
        generateButtonForNextQuestion(id);
    });
}

function createEventListenerForCreatingNewQuestion(button, id) {
    let intId = parseInt(id);
    let nextQuestion;
    button.addEventListener('click', function (event) {
        overallData.forEach((questionObject, key) => {
            if (questionObject.id === intId) {
                nextQuestion = intId + 1;
            }
        });

        let appWrapper = document.getElementById('app');
        appWrapper.innerHTML = '';
        button.remove();

        if (typeof overallData[nextQuestion] === 'undefined') {
            generateQuestion(overallData[0]);
        } else {
            generateQuestion(overallData[nextQuestion]);
        }

    });
}


export {createEventListenerForQuestion, createEventListenerForCreatingNewQuestion}
