import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Award, ArrowRight, RefreshCcw } from 'lucide-react';

const SimplePresent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = [
    {
      questionText: "When do we use the Simple Present tense?",
      options: [
        "To talk about temporary actions",
        "To describe habits and routines",
        "To talk about past events",
        "To describe future plans"
      ],
      correctAnswer: 1
    },
    {
      questionText: "She _____ to work every morning.",
      options: [
        "walk",
        "walks",
        "walking",
        "walked"
      ],
      correctAnswer: 1
    },
    {
      questionText: "They _____ in London.",
      options: [
        "lives",
        "living",
        "live",
        "lived"
      ],
      correctAnswer: 2
    },
    {
      questionText: "What is the correct negative form? 'I play tennis.'",
      options: [
        "I not play tennis",
        "I don't plays tennis",
        "I doesn't play tennis",
        "I don't play tennis"
      ],
      correctAnswer: 3
    },
    {
      questionText: "_____ he speak English?",
      options: [
        "Do",
        "Does",
        "Is",
        "Are"
      ],
      correctAnswer: 1
    }
  ];

  const handleOptionSelect = (index) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
      setIsAnswered(true);

      const isCorrect = index === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }

      setUserAnswers([...userAnswers, {
        question: currentQuestion,
        selected: index,
        correct: isCorrect
      }]);

      // Add delay before moving to next question
      setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          setShowScore(true);
        }
      }, 1500);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getOptionClass = (index) => {
    if (!isAnswered) {
      return 'border-gray-300 hover:bg-purple-50 hover:border-purple-300';
    }
    if (index === questions[currentQuestion].correctAnswer) {
      return 'border-green-500 bg-green-50';
    }
    if (index === selectedAnswer && index !== questions[currentQuestion].correctAnswer) {
      return 'border-red-500 bg-red-50';
    }
    return 'border-gray-300 opacity-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="bg-white rounded-xl shadow-lg">
          <CardContent className="p-8">
            {showScore ? (
              <div className="text-center">
                <div className="mb-6">
                  <Award className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                  <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                </div>
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <p className="text-xl mb-2">Your Score</p>
                  <p className={`text-4xl font-bold mb-2 ${getScoreColor(Math.round((score / questions.length) * 100))}`}>
                    {score} / {questions.length}
                  </p>
                  <p className="text-lg text-gray-600">
                    {Math.round((score / questions.length) * 100)}%
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center justify-center gap-2 mx-auto bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Question {currentQuestion + 1}/{questions.length}</h2>
                    <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                      <span className="text-purple-600 font-semibold">Score: {score}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mb-6">
                    <div 
                      className="h-2 bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-xl mb-6 font-medium text-gray-800">
                    {questions[currentQuestion].questionText}
                  </p>
                </div>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
                        ${getOptionClass(index)}
                        ${!isAnswered ? 'hover:shadow-md transform hover:-translate-y-1' : ''}
                      `}
                    >
                      <span className="text-lg">{option}</span>
                      {isAnswered && index === questions[currentQuestion].correctAnswer && (
                        <Check className="w-6 h-6 text-green-500" />
                      )}
                      {isAnswered && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                        <X className="w-6 h-6 text-red-500" />
                      )}
                    </button>
                  ))}
                </div>
                {isAnswered && (
                  <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                      <p className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Correct! Well done!
                      </p>
                    ) : (
                      <p className="flex items-center gap-2">
                        <X className="w-5 h-5" />
                        Incorrect. The right answer was: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                      </p>
                    )}
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
