import {convertToPercentage} from '../helper/helper.js';
import {createEventListenerForQuestion, createEventListenerForCreatingNewQuestion} from '../listeners/listeners.js';

/**
 * Generates both Questions with EventListeners
 * @param question
 */
function generateQuestion(question) {
    generateHtml(question['firstQuestion'], question['secondQuestion'], question['firstAnswerSelected'], question['secondAnswerSelected'], question['id']);
}

/**
 * Handles all generating Questions logic and appending it to #app ID
 * @param firstQuestion
 * @param secondQuestion
 * @param firstAmountAnswered
 * @param secondAmountAnswered
 * @param jsonId
 */
function generateHtml(firstQuestion, secondQuestion, firstAmountAnswered, secondAmountAnswered, jsonId) {
    let totalAmountOfAnswers = firstAmountAnswered + secondAmountAnswered;
    let firstQuestionCard = generateQuestionCard(firstQuestion, firstAmountAnswered, totalAmountOfAnswers, 'firstQuestion', jsonId);
    let secondQuestionCard = generateQuestionCard(secondQuestion, secondAmountAnswered, totalAmountOfAnswers, 'secondQuestion', jsonId);

    let appWrapper = document.getElementById('app');
    appWrapper.appendChild(firstQuestionCard);
    appWrapper.appendChild(secondQuestionCard);
}

/**
 * Card HTML generation with Event Listener
 * @param question
 * @param answeredAmount
 * @param totalAmountOfAnswers
 * @param id
 * @param jsonId
 * @returns {HTMLDivElement}
 */
function generateQuestionCard(question, answeredAmount, totalAmountOfAnswers, id, jsonId) {
    let outerWrapper = document.createElement('div');
    outerWrapper.setAttribute('id', id);
    outerWrapper.setAttribute('class', 'questions__single');
    outerWrapper.setAttribute('data-id', jsonId);

    let paragraphElement = generateParagraphElement('questions__text', question);
    let statisticsElement = generateParagraphElement('questions__stats', convertToPercentage(answeredAmount, totalAmountOfAnswers) + '% have answered this question!');

    outerWrapper.appendChild(statisticsElement);
    outerWrapper.appendChild(paragraphElement);

    createEventListenerForQuestion(outerWrapper);

    return outerWrapper;
}

/**
 * Generates Paragraph Element
 * @param className
 * @param textNodeValue
 * @returns {HTMLParagraphElement}
 */
function generateParagraphElement(className, textNodeValue) {
    let paragraphElement = document.createElement('p');
    paragraphElement.setAttribute('class', className);
    let textNodeElement = document.createTextNode(textNodeValue);
    paragraphElement.appendChild(textNodeElement);

    return paragraphElement;
}

function disableQuestionsAndShowPercentage() {
    let questions = document.querySelectorAll('.questions__single');

    for (let i = 0; i < questions.length; i++) {
        questions[i].classList.add('show');
    }
}

function generateButtonForNextQuestion(id) {
    let outerWrapper = document.createElement('div');
    outerWrapper.setAttribute('id', id);
    outerWrapper.setAttribute('class', 'button button-generate-button');

    let questionParagraph = generateParagraphElement('button__text', 'Next Question');
    outerWrapper.appendChild(questionParagraph);

    let appWrapper = document.getElementById('app');
    appWrapper.after(outerWrapper);

    createEventListenerForCreatingNewQuestion(outerWrapper, id);
}

export {generateQuestion, disableQuestionsAndShowPercentage, generateButtonForNextQuestion};
