const questions = [
  {
    question: "Who is known as the father of modern physics?",
    option: [
      { text: "A) Isaac Newton", correct: false },
      { text: "B) Albert Einstein", correct: true },
      { text: "C) Galileo Galilei", correct: false },
      { text: "D) Nikola Tesla", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    option: [
      { text: "A) H2O", correct: true },
      { text: "B) CO2", correct: false },
      { text: "C) NaCl", correct: false },
      { text: "D) O2", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    option: [
      { text: "A) Jupiter", correct: false },
      { text: "B) Mars", correct: true },
      { text: "C) Venus", correct: false },
      { text: "D) Saturn", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    option: [
      { text: "A) Leonardo da Vinci", correct: true },
      { text: "B) Vincent van Gogh", correct: false },
      { text: "C) Pablo Picasso", correct: false },
      { text: "D) Michelangelo", correct: false },
    ],
  },
  {
    question: "What is the capital city of France?",
    option: [
      { text: "A) Madrid", correct: false },
      { text: "B) Rome", correct: false },
      { text: "C) Paris", correct: true },
      { text: "D) Berlin", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const ansElement = document.querySelector(".answer_btn");
const nextButton = document.querySelector("#next-btn");
const scoreElement = document.querySelector("#score");

let currScore = 0;
let currIndex = 0;

function startQuiz() {
  currIndex = 0;
  currScore = 0;
  updateScore();
  nextButton.innerHTML = "Next";
  nextButton.addEventListener('click', handleNextButton);
  showQuestion();
}

function showQuestion() {
  resetState();
  let currQuestion = questions[currIndex];
  let QuestionNo = currIndex + 1;
  questionElement.innerHTML = QuestionNo + ". " + currQuestion.question;

  currQuestion.option.forEach((option) => {
    const button = document.createElement("button");
    button.innerHTML = option.text;
    button.classList.add('font-[poppins]', 'w-full', 'justify-center', 'font-light', 'border', 'border-black', 'p-1', 'rounded-md', 'mb-2', 'hover:bg-slate-700', 'hover:text-white', 'transition', 'duration-300', 'ease-in-out', 'text-start');
    
    button.addEventListener('click', () => checkAnswer(button, option.correct, currQuestion.option));

    ansElement.appendChild(button);
  });
}

function checkAnswer(selectedButton, isCorrect, options) {
  const allButtons = document.querySelectorAll('.answer_btn button');
  allButtons.forEach(button => button.disabled = true);
  
  if (isCorrect) {
    selectedButton.classList.add('bg-green-500', 'text-white');
    currScore++;
  } else {
    selectedButton.classList.add('bg-red-500', 'text-white');
    const correctOption = Array.from(allButtons).find(button => {
      return options.find(option => option.text === button.innerHTML && option.correct);
    });
    correctOption.classList.add('bg-green-500', 'text-white');
  }

  nextButton.disabled = false;
  updateScore();
}

function resetState() {
  while (ansElement.firstChild) {
    ansElement.removeChild(ansElement.firstChild);
  }
  nextButton.disabled = true;
}

function updateScore() {
  scoreElement.innerHTML = "Score: " + currScore;
}

function showFinalScore() {
  questionElement.innerHTML = `Quiz Completed! Your final score is ${currScore} out of ${questions.length}.`;
  ansElement.innerHTML = '';
  nextButton.innerHTML = 'Restart ';
  nextButton.removeEventListener('click', handleNextButton);
  nextButton.addEventListener('click', startQuiz);
}

function handleNextButton() {
  currIndex++;
  if (currIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
}

// Initialize the quiz
startQuiz();


// function highlightCorrectOption(opt) {
//   let i = -1;
//   opt.map((_, id) => {
//     console.log(_.correct, id);
//     if (_.correct) i = id;
//   });
//   return i;
// }

// function showQuestion() {
//   resetState();

//   let currQuestion = questions[currIndex];
//   let questionNo = currIndex + 1;
//   questionElement.innerHTML = questionNo + ". " + currQuestion.question;

//   currQuestion.option.forEach((answer, id) => {
//     console.log(`${id}`);
//     let listItem = document.createElement("li");
//     listItem.innerHTML = `<li id="${id}" class="font-poppins font-light border border-black p-1 rounded-md mb-2 hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out cursor-pointer option">${answer.text}</li>`;
//     listItem.classList.add("ans-btn");
//     ansElement.appendChild(listItem);

//     listItem.addEventListener("click", function (e) {
//       const selectedBtn = e.target; 
//       console.log(e.target.id);

//       // Check if the option has already been selected
//       if (
//         selectedBtn.classList.contains("bg-green-300") ||
//         selectedBtn.classList.contains("bg-red-300")
//       ) {
//         return;
//       }

//       // Check if the answer is correct
//       if (answer.correct) {
//         selectedBtn.classList.add("bg-green-300");
//       } else {
//         selectedBtn.classList.add("bg-red-300");
//         const correctOptID = highlightCorrectOption(currQuestion.option);
//         Array.from(ansElement.children).map((ans, id) => {
//             const li = ans.querySelector('li')
//             console.log(li.children.id);
//             if (li.children.id === correctOptID) {
//                 li.classList.add('bg-green-300');
//             }
//         });

//         // Array.from(document.querySelectorAll(".option").children).forEach(button =>{
//         //     console.log(ansElement.children);
//         //     console.log(button.dataset.correct);
//         // });
//         // Highlight selected (incorrect) answer
//       }

//       // Show next button
//       nextButton.classList.remove("hidden");

//       // Disable further clicks on options
//       // document.querySelectorAll('.option').forEach(button => {
//       //     button.removeEventListener("click", handleClick);
//       // });
//     });
//   });
// }



// function  showQuestion(){
//     resetState();

//     let currQuestion = questions[currIndex];
//     let questionNo = currIndex + 1;
//     questionElement.innerHTML = questionNo + ". "+ currQuestion.question;

// currQuestion.option.forEach(answer => {
//     let listItem = document.createElement("li");
//     listItem.innerHTML = `<li class=" font-[poppins] font-light border border-black p-1 rounded-md mb-2 hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out cursor-pointer">${answer.text}</li>` ;
//     listItem.classList.add("ans-btn");
//     ansElement.appendChild(listItem);

//     listItem.addEventListener("click",function (e){
//         const selectedBtn = e.target;

//         if(answer.correct)
//         {
//             selectedBtn.classList.add("bg-green-300");
//             // console.log(answer.correct)
//         }
//         else{
//             selectedBtn.classList.add("bg-red-300");
//             // console.log(answer.correct)
//         }

//         Array.from(ansElement.children).forEach(button =>{
//             // console.log(ansElement.children);
//             console.log(button.dataset.correct);

//             if(button.dataset.correct){

//                 button.classList.add("bg-green-300");

//             }
//             button.classList.add("disabled:click");

//         });
//     });
//     nextButton.classList.add("visible");
// });

// currQuestion.option.forEach(answer => {
//     let listItem = document.createElement("li");
//     listItem.innerHTML = `<li class="font-[poppins] font-light border border-black p-1 rounded-md mb-2 hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out cursor-pointer">${answer.text}</li>`;
//     listItem.classList.add("ans-btn");
//     ansElement.appendChild(listItem);

//     listItem.addEventListener("click", function (e) {
//         const selectedBtn = e.target;

//         if (answer.correct) {
//             selectedBtn.classList.add("bg-green-300");
//         } else {
//             selectedBtn.classList.add("bg-red-300");

//             // Display correct answer
//             Array.from(ansElement.children).forEach(button => {
//                 if (button.dataset.correct) {
//                     button.classList.add("bg-green-300");
//                 }
//                 button.classList.add("disabled:click");
//             });

//             // Show next button
//             nextButton.classList.add("visible");
//         }

//         // Disable further clicks on options
//         Array.from(ansElement.children).forEach(button => {
//             button.classList.add("disabled:click");
//         });
//     });
// });

//     currQuestion.option.forEach(answer => {
//         let listItem = document.createElement("li");
//         listItem.innerHTML = `<li class="font-[poppins] font-light border border-black p-1 rounded-md mb-2 hover:bg-slate-700 hover:text-white transition duration-300 ease-in-out cursor-pointer">${answer.text}</li>`;
//         listItem.classList.add("ans-btn");
//         ansElement.appendChild(listItem);

//         listItem.addEventListener("click", function (e) {
//             const selectedBtn = e.target;

//             // Check if the answer is correct
//             if (answer.correct) {
//                 selectedBtn.classList.add("bg-green-300");
//             } else {
//                 // Display correct answer
//                 currQuestion.option.forEach(button => {
//                     if (button.dataset.correct) {
//                         button.classList.add("bg-green-300");
//                     }
//                     button.classList.add("disabled:click");
//                 });

//                 // Highlight selected (incorrect) answer
//                 selectedBtn.classList.add("bg-red-300");

//                 // Show next button
//                 nextButton.classList.add("visible");
//             }

//             // Disable further clicks on options
//             Array.from(ansElement.children).forEach(button => {
//                 button.removeEventListener("click", handleClick);
//             });
//         });
//     });

//     function handleClick(e) {
//         const selectedBtn = e.target;
//         // Do whatever you want with the selected button here
//     }

//     // Add click event listener to each answer button
//     Array.from(ansElement.children).forEach(button => {
//         button.addEventListener("click", handleClick);
//     });

// }

// function resetState()
// {
//     while(ansElement.firstChild)
//         {
//             ansElement.removeChild(ansElement.firstChild);
//         }
// }
