import { Component } from 'react';

import Play from '../Play';
import Result from '../Result';

import './App.scss';

const QUESTION_TYPES = ['capital', 'flag'];

class App extends Component  {
  constructor() {
    super();
    this.state = {
      points: 0,
      questionType: QUESTION_TYPES[0],
      isGameOver: false,
      currentCountry: null,
      hiddenNextButton: true,
      templateName: 'Play',
      countries: [],
      responses: []
    }
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;flag;')
    .then(response => response.json())
    .then((json) => {
      const countries = json;
      this.onNewGame(countries);
    })
  }

  onNewGame(countries = this.state.countries) {
    const currentCountry = this.getRandCountry(countries);
    let responses = this.getResponses(currentCountry, countries);
    this.shuffle(responses);
    const questionType = QUESTION_TYPES[Math.round(Math.random())];

    this.setState({ countries, responses, currentCountry, templateName: "Play", hiddenNextButton: true, questionType, points: 0});
  }

  onNext() {
    const { isGameOver } = this.state;
   
    if(isGameOver) {
      const templateName = "Result";
      this.setState({templateName});
      return;
    }

    this.nextQuestion();
  }

  nextQuestion() {
    const { countries } = this.state;
    const currentCountry = this.getRandCountry(countries);
    let responses = this.getResponses(currentCountry, countries);
    this.shuffle(responses);
    const questionType = QUESTION_TYPES[Math.round(Math.random())];

    this.setState({ countries, responses, currentCountry, hiddenNextButton: true, questionType});
  }

  onSendReply(index) {
    let { responses, points } = this.state;
    let isGameOver = false;

    // checkIfGameOverOrAddPoint
    if(responses[index].isGoodAnswer) {
      points++;
    } else {
      isGameOver = true;
    }

    // Reveal the answers
    responses[index].isReveal = true;
    responses = responses.map(response => {
      if(response.isGoodAnswer) {
        response.isReveal = true;
      }
      response.disabled = true;
      return response;
    });

    this.setState({ responses, hiddenNextButton:false, isGameOver, points });
  }

  shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  getResponses(currentCountry, countries) {
    const firstAnswer = {
      position: '',
      title: currentCountry.name,
      isGoodAnswer: true,
      isReveal: false,
      disabled: false
    }
    const answers = [firstAnswer];
    
    return function process(answers, countries, getRandCountry, isIncludeInAnswers) {
      const randCountry = getRandCountry(countries);
      const answer = {
        position: '',
        title: randCountry.name,
        isGoodAnswer: false,
        isReveal: false,
        disabled: false
      };

      if(isIncludeInAnswers(randCountry, answers)) {
        return process(answers, countries, getRandCountry, isIncludeInAnswers);
      }

      answers.push(answer);

      if(answers.length < 4) {
        return process(answers, countries, getRandCountry, isIncludeInAnswers);  
      }

      return answers;
    }(answers, countries, this.getRandCountry.bind(this), this.isIncludeInAnswers);
  }

  isIncludeInAnswers(answer, answers) {
    for(let i = 0; i < answers.length; i++) {
      if(answer.name === answers[i].name) {
        return true;
      }
    }

    return false;
  }

  getRandCountry(countries) {
    const numberRand = this.getRandomInt(0, countries.length);

    return countries[numberRand];
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  render() {
    const { currentCountry, responses, hiddenNextButton, points, templateName, questionType } = this.state;    
    let template = < Result onNewGame={() => this.onNewGame()} points={ points } />;

    if(templateName === "Play") {
      template = <Play
        currentCountry={currentCountry}
        responses={responses}
        questionType={questionType}
        hiddenNextButton={hiddenNextButton}
        onSendReply={(index) => this.onSendReply(index)}
        onNext={() => this.onNext()}
      />
    }

    return (
      <div className="App">
        { template }
      </div>
    );
  }
}

export default App;
