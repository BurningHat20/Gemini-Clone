const sideNavigation = document.querySelector(".sideNavigation"),
  sideBarToggle = document.querySelector(".ri-side-bar-line"),
  startContentUl = document.querySelector(".startContent ul"),
  inputArea = document.querySelector(".inputArea input"),
  sendRequest = document.querySelector(".ri-send-plane-line"),
  chatHistory = document.querySelector(".chatHistory ul"),
  startContent = document.querySelector(".startContent"),
  chatContent = document.querySelector(".chatContent"),
  results = document.querySelector(".results");

promptQuestion = [
  {
    question: "write a thank you note to my subscribers",
    icon: "ri-edit-line",
  },
  {
    question: "write a sample code to learn javascript",
    icon: "ri-code-s-slash-line",
  },
  {
    question: "How to became a Full Stack Developer ?",
    icon: "ri-macbook-line",
  },
  {
    question: "How to became a Fronte-end Developer",
    icon: "ri-stack-line",
  },
];

window.addEventListener("load", () => {
  promptQuestion.forEach((data) => {
    let item = document.createElement("li");
    item.innerHTML = `<div class="promptSuggetion">
    <p>${data.question}</p>
    <div class="icon">
    <i class="${data.icon}"></i>
    </div>
    </div>`;
    startContentUl.append(item);
  });
});

sideBarToggle.addEventListener("click", () => {
  sideNavigation.classList.toggle("expandClose");
});
