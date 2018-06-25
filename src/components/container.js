import React from 'react';

import GuessSection from './guess-section';
import StatusSection from './status-section';

export default class Container extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	guesses: [],
	    	feedback: 'Make your guess!',
	    	auralStatus: '',
	    	correctAnswer: Math.round(Math.random() * 100) + 1
	    };
  	}

  	makeGuess(guess) {
	    guess = parseInt(guess, 10);
	    if (isNaN(guess)) {
	    	this.setState({ feedback: 'Please enter a valid number' });
	    	return;
    	}

	    const difference = Math.abs(guess - this.state.correctAnswer);

	    let feedback;
	    if (difference >= 50) {
	      feedback = 'You\'re Ice Cold...';
	    } else if (difference >= 30) {
	      feedback = 'You\'re Cold...';
	    } else if (difference >= 10) {
	      feedback = 'You\'re Warm.';
	    } else if (difference >= 1) {
	      feedback = 'You\'re Hot!';
	    } else {
	      feedback = 'You got it!';
	    }

	    this.setState({
	      feedback,
	      guesses: [...this.state.guesses, guess]
	    });
	}

	render() {

		const { feedback, guesses } = this.state;
	    const guessCount = guesses.length;

		return (
		<main role="main">
	        <GuessSection
		        feedback={feedback}
		        guessCount={guessCount}
		        onMakeGuess={guess => this.makeGuess(guess)}
	        />
	        <StatusSection 
		        guesses={guesses} 
	        />
        </main>
		);
	};
};