const quizData = [
    {
      question: 'who is the founder of naruto?',
      options: ['Akira', 'Kishimoto', 'Haru', 'Madara'],
      answer: 'Kishimoto',
    },
    {
      question: 'Who is the master of Uchiha clan?',
      options: ['itachi', 'Fugaku Uchiha', 'indra', 'obito'],
      answer: 'Fugaku Uchiha',
    },
    {
      question: 'Who is the god of genjutsu?',
      options: ['Umi Uchiha', 'minato', 'hashirama senju', 'Kaguya Otsutsuki'],
      answer: 'Kaguya Otsutsuki',
    },
    {
      question: 'Who is the god in Naruto?',
      options: ['Shiro Uchiha', 'Tobirama Senju', 'Kaguya Otsutsuki', 'Hagoromo Otsutsuki'],
      answer: 'Shiro Uchiha',
    },
    {
      question: 'Who is the fastest jutsu user?',
      options: [
        ' Minato Namikaze',
        'Jiraiya',
        'Isshiki Otsutsuki',
        'Black Zetsu',
      ],
      answer: ' Minato Namikaze',
    },
    {
      question: 'Who trained Jiraiya?',
      options: [' Hashirama Senju', 'Black Zetsu', 'Tobirama Senju', 'Hiruzen Sarutobi'],
      answer: 'Hiruzen Sarutobi',
    },
    {
      question: 'Who is stronger than Naruto?',
      options: [
        'Hashirama Senju',
        'Hiruzen Sarutobi',
        'Minato Namikaze',
        'Shibai Otsutsuki',
      ],
      answer: 'Shibai Otsutsuki',
    },
    {
      question: 'Who can defeat Kakashi?',
      options: ['Minato Namikaze', 'itachi', 'Might Guy', 'Madara Uchiha'],
      answer: 'Madara Uchiha',
    },
    {
      question: 'Who killed obito?',
      options: [
        'Kaguya Otsutsuki',
        'Naruto Uzumaki',
        'Madara Uchiha',
        'itachi',
      ],
      answer: 'Kaguya Otsutsuki',
    },
    {
      question: 'Who is the yellow flash in Naruto Shippuden?',
      options: ['Minato Namikaze', 'Kakashi', 'Sasuke Uchiha', 'Naruto Uzumaki'],
      answer: 'Minato Namikaze',
    },
  ];
    
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retry');
    const showAnswerButton = document.getElementById('showAnswer');
    
    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];
    
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    
    }
    
    function displayQuestion() {
    const questionData = quizData[currentQuestion];
    
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
    
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
    
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
    
    for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];
    
    const optionText = document.createTextNode(shuffledOptions[i]);
    
    option.appendChild(radio);
    option.appendChild(optionText);
    
    optionsElement.appendChild(option);
    }
    
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
    }
    
    function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
    score++;
    } else {
    incorrectAnswers.push({
    question: quizData[currentQuestion].question,
    incorrectAnswer: answer,
    correctAnswer: quizData[currentQuestion].answer,
    });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
    displayQuestion();
    } else {
    displayResult();
    }
    
    }
    }
    
    function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    }
    
    function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
    }
    
    function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
    
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
    <p>
    <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
    <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
    <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
    </p>
    `;
    }
    
    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
    `;
    }
    
    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);
    
    displayQuestion();