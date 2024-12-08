import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Award, ArrowRight, RefreshCcw } from 'lucide-react';

const SimplePresent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      questionText: "When do we use the Simple Present tense?",
      options: [
        "To talk about temporary actions",
        "To describe habits and routines",
        "To talk about past events",
        "To describe future plans"
      ],
      correctAnswer: 1,
      explanation: "We use Simple Present for habits, routines, and general truths."
    },
    {
      questionText: "She _____ to work every morning.",
      options: [
        "walk",
        "walks",
        "walking",
        "walked"
      ],
      correctAnswer: 1,
      explanation: "With third person singular (she/he/it), we add -s to the verb."
    },
    {
      questionText: "They _____ in London.",
      options: [
        "lives",
        "living",
        "live",
        "lived"
      ],
      correctAnswer: 2,
      explanation: "For plural subjects (they), we use the base form of the verb."
    },
    {
      questionText: "What is the correct negative form? 'I play tennis.'",
      options: [
        "I not play tennis",
        "I don't plays tennis",
        "I doesn't play tennis",
        "I don't play tennis"
      ],
      correctAnswer: 3,
      explanation: "For I/you/we/they, we use 'don't' + base form of the verb."
    },
    {
      questionText: "_____ he speak English?",
      options: [
        "Do",
        "Does",
        "Is",
        "Are"
      ],
      correctAnswer: 1,
      explanation: "For questions with he/she/it, we use 'Does' at the beginning."
    }
  ];

  const handleAnswerClick = (selectedOption) => {
    if (showFeedback) return; // Prevent selecting while showing feedback
    setSelectedAnswer(selectedOption);
    setShowFeedback(true);
    
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, {
      question: currentQuestion,
      selected: selectedOption,
      correct: isCorrect
    }]);

    // Move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect Score! Excellent work!";
    if (percentage >= 80) return "Great job! Keep it up!";
    if (percentage >= 60) return "Good effort! Room for improvement.";
    return "Keep practicing! You'll get better.";
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "text-green-500";
    if (percentage >= 80) return "text-blue-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="bg-white rounded-xl shadow-lg">
          <CardContent className="p-6">
            {showScore ? (
              <div className="text-center">
                <div className="mb-6">
                  <Award className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                  <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                  <div className={`text-3xl font-bold mb-2 ${getScoreColor()}`}>
                    {score} / {questions.length}
                  </div>
                  <p className="text-lg mb-4">{getScoreMessage()}</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div 
                      className="bg-purple-600 rounded-full h-4 transition-all duration-1000"
                      style={{ width: `${(score / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  <RefreshCcw className="w-5 h-5 mr-2" />
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-purple-600">Question {currentQuestion + 1}</span>
                      <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                      <span className="text-gray-400">{questions.length}</span>
                    </div>
                    <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                      <Award className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="font-medium">{score}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className="bg-purple-600 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xl font-medium mb-6">{questions[currentQuestion].questionText}</p>
                </div>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === questions[currentQuestion].correctAnswer;
                    const showCorrect = showFeedback && isCorrect;
                    const showIncorrect = showFeedback && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex justify-between items-center
                          ${!showFeedback ? 'hover:bg-purple-50 hover:border-purple-300 border-gray-200' : ''}
                          ${showCorrect ? 'bg-green-50 border-green-500' : ''}
                          ${showIncorrect ? 'bg-red-50 border-red-500' : ''}
                          ${isSelected && !showFeedback ? 'border-purple-500 bg-purple-50' : ''}
                        `}
                      >
                        <span className="flex-grow">{option}</span>
                        {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />}
                        {showIncorrect && <XCircle className="w-5 h-5 text-red-500 ml-2" />}
                      </button>
                    );
                  })}
                </div>
                {showFeedback && (
                  <div className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-sm">{questions[currentQuestion].explanation}</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimplePresent;
