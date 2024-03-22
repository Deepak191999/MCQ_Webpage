const questions= [
    {
        question:'What does the "DOM" stand for in web development?',
        answer:[
            {text: 'Document Object Model',correct:true},
            {text: 'Dynamic Object Model',correct:false},
            {text: 'Data Object Model',correct:false},
            {text: 'Document Oriented Model?',correct:false}
        ]
    },
    {
        question:'What does the term "NaN" stand for in JavaScript?',
        answer:[
            {text: 'Negative And Null',correct:false},
            {text: 'Not a Number',correct:true},
            {text: 'Null and None',correct:false},
            {text: 'Numeric Argument Needed',correct:false}
        ]
    },
    {
        question:'What does JSON stand for in JavaScript?',
        answer:[
            {text: ' Java Serialized Object Notation',correct:false},
            {text: 'JavaScript Oriented Notation',correct:false},
            {text: 'JavaScript Object Notation',correct:true},
            {text: ' JavaScript Online Notation',correct:false}
        ]
    },
    {
        question:'Which of the following is not a JavaScript data type?',
        answer:[
            {text: 'Integer',correct:true},
            {text: 'String',correct:false},
            {text: 'Boolean',correct:false},
            {text: 'Undefined',correct:false}
        ]
    },
    {
        question:'What is the purpose of the "querySelectorAll" method in JavaScript?',
        answer:[
            {text: 'To select and manipulate all elements with a given class name',correct:false},
            {text: 'To select and manipulate the first element with a given tag name',correct:false},
            {text: 'To select and manipulate all elements with a given ID',correct:false},
            {text: ' To select and manipulate all elements matching a specified CSS selector',correct:true}
        ]
    },

]

let question= document.querySelector('#question')
let answer= document.querySelector('#answerButton')
let next= document.querySelector('.next')

let currentQuestionIndex=0;
let score=0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() {
    let currQues = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    question.innerHTML = questionNum + '. ' + currQues.question;

    // Clear previous options
    answer.innerHTML = '';

    currQues.answer.forEach((e, index) => {
        const div = document.createElement('div');
        div.className = 'option';

        const button = document.createElement('input');
        button.type = 'radio';
        button.name = 'option';
        button.className = 'option';
        button.id = 'option' + (index + 1);
        button.value = 'option' + (index + 1);
        button.dataset.correct = e.correct;

        const label = document.createElement('label');
        label.htmlFor = 'option' + (index + 1);
        label.textContent = e.text;

        div.appendChild(button);
        div.appendChild(label);

        answer.appendChild(div);

        // Add event listener to each radio button
        button.addEventListener('click', () => {
            selectAnswer(button, e.correct);
        });
    });
}

function selectAnswer(input, isCorrect) {
    // Remove background color from all options
    document.querySelectorAll('.form-group').forEach(option => {
      option.style.backgroundColor = '';
    });
  
    // Add background color to the selected option based on correctness
    if (isCorrect) {
      input.parentElement.style.backgroundColor = 'lightgreen'; // Change to your desired correct color
      score++; // Increment score if correct
    } else {
      input.parentElement.style.backgroundColor = 'lightcoral'; // Change to your desired incorrect color
    }
  
    // Disable all radio buttons after one has been selected
    document.querySelectorAll('input[name="option"]').forEach(input => {
      input.disabled = true;
    });
  
    next.style.display = 'block';
  }

  next.addEventListener('click',()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    }
    else
    {
        startQuiz()
    }
  })

  function handleNextButton()
  {
    currentQuestionIndex++;
    if (currentQuestionIndex <questions.length) {
        showQuestion()
    }else
    {
        showScore()
    }
  }

  function showScore(){
    resetState();
    question.innerHTML=`You scored ${score} out of ${questions.length}`
    next.innerHTML= 'Play Again'
    next.style.display='block'
    score=0;
  }




  function resetState() {
    // Clear the question display
    question.innerHTML = '';
    answer.innerHTML=''
    
    // Reset the score
    // score = 0;

    // Enable all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.disabled = false;
    });

    // Reset the background color of options
    document.querySelectorAll('.form-group').forEach(option => {
        option.style.backgroundColor = '';
    });
}

startQuiz();
