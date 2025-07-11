let quizData = [
    {
      question: 'What is 2 + 2?',
      options: ['2', '3', '4', '5'],
      answer: '4'
    },
    {
      question: 'Which is the largest planet?',
      options: ['Earth', 'Venus', 'Saturn', 'Jupiter'],
      answer: 'Jupiter'
    },
    {
      question: 'What does CSS stand for?',
      options: [
        'Central Style Sheets',
        'Cascading Style Sheets',
        'Cascading Simple Sheets',
        'Cars SUVs Sailboats'
      ],
      answer: 'Cascading Style Sheets'
    },
    {
      question: 'Which language runs in a web browser?',
      options: ['Java', 'C', 'Python', 'JavaScript'],
      answer: 'JavaScript'
    },
    {
      question: 'What year was JavaScript launched?',
      options: ['1996', '1995', '1994', 'None of the above'],
      answer: '1995'
    }
  ];
  
  let currentQuiz = 0;
  let score = 0;
  let shuffledQuiz = [];
  let timerInterval;
  let timeLeft = 300; // 5 minutes in seconds
  
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const resultEl = document.getElementById('result');
  const timerEl = document.getElementById('timer');
  
  function shuffleArray(array) {
    return array
      .map(item => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }
  
  function startQuiz() {
    shuffledQuiz = shuffleArray(quizData);
    currentQuiz = 0;
    score = 0;
    timeLeft = 300;
    nextBtn.innerText = 'Next';
    startTimer();
    loadQuiz();
  }
  
  function loadQuiz() {
    resetState();
    const currentData = shuffledQuiz[currentQuiz];
    questionEl.innerText = `${currentQuiz + 1}. ${currentData.question}`;
  
    currentData.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('option-btn');
      button.addEventListener('click', selectAnswer);
      optionsEl.appendChild(button);
    });
  }
  
  function resetState() {
    nextBtn.style.display = 'none';
    resultEl.innerText = '';
    while (optionsEl.firstChild) {
      optionsEl.removeChild(optionsEl.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = shuffledQuiz[currentQuiz].answer;
  
    if (selectedBtn.innerText === correct) {
      selectedBtn.classList.add('correct');
      score++;
    } else {
      selectedBtn.classList.add('wrong');
      Array.from(optionsEl.children).forEach(btn => {
        if (btn.innerText === correct) {
          btn.classList.add('correct');
        }
      });
    }
  
    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
    nextBtn.style.display = 'block';
  }
  
  nextBtn.addEventListener('click', () => {
    currentQuiz++;
    if (currentQuiz < shuffledQuiz.length) {
      loadQuiz();
    } else {
      showResults();
    }
  });
  
  function showResults() {
    clearInterval(timerInterval);
    resetState();
    questionEl.innerText = `You scored ${score} out of ${shuffledQuiz.length}!`;
    nextBtn.innerText = 'Restart Quiz';
    nextBtn.style.display = 'block';
    nextBtn.addEventListener('click', startQuiz, { once: true });
  }
  
  function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showResults();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.innerText = `Time left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  // Start quiz on load
  startQuiz();
  
  
  
