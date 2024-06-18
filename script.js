const sideNavigation = document.querySelector(".sideNavigation");
const menuToggle = document.querySelector(".topBarAction i");
const suggestionGrid = document.querySelector(".suggestionGrid");
const inputArea = document.querySelector(".inputArea input");
const sendButton = document.querySelector(".ri-send-plane-fill");
const chatHistory = document.querySelector(".chatHistory ul");
const startContent = document.querySelector(".startContent");
const chatContent = document.querySelector(".chatContent");
const results = document.querySelector(".results");

const promptQuestions = [
  {
    question: "Write a thank you note to my subscribers",
    icon: "ri-edit-line",
  },
  {
    question: "Write a sample code to learn JavaScript",
    icon: "ri-code-s-slash-line",
  },
  {
    question: "How to become a Full Stack Developer?",
    icon: "ri-macbook-line",
  },
  {
    question: "How to become a Front-end Developer",
    icon: "ri-stack-line",
  },
];

function createSuggestionItem(data) {
  const item = document.createElement("div");
  item.innerHTML = `
    <div class="promptSuggestion">
      <p>${data.question}</p>
      <div class="icon">
        <i class="${data.icon}"></i>
      </div>
    </div>
  `;
  item.addEventListener("click", () => getGeminiResponse(data.question));
  return item;
}

function initializeSuggestions() {
  promptQuestions.forEach((data) => {
    const item = createSuggestionItem(data);
    suggestionGrid.appendChild(item);
  });
}

function toggleSideNavigation() {
  sideNavigation.classList.toggle("expandClose");
}

function updateSendButtonVisibility() {
  sendButton.style.display =
    inputArea.value.length > 0 ? "inline-block" : "none";
}

function addToChatHistory(question) {
  const historyItem = document.createElement("li");
  historyItem.innerHTML = `<i class="ri-chat-4-line"></i>${question}`;
  chatHistory.appendChild(historyItem);
}

async function getGeminiResponse(question) {
  addToChatHistory(question);

  startContent.style.display = "none";
  chatContent.style.display = "block";
  results.innerHTML = "<p>Loading...</p>";

  inputArea.value = "";
  updateSendButtonVisibility();

  const AIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC8-MCnORtaUszavXHCjhiajiIEuB_bxhM`;

  try {
    const response = await fetch(AIURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: question }] }],
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    results.innerHTML = `<p>${data.candidates[0].content.parts[0].text}</p>`;
  } catch (error) {
    console.error("Error:", error);
    results.innerHTML = "<p>An error occurred. Please try again.</p>";
  }
}

function handleSendRequest() {
  const question = inputArea.value.trim();
  if (question) getGeminiResponse(question);
}

function initialize() {
  initializeSuggestions();
  menuToggle.addEventListener("click", toggleSideNavigation);
  inputArea.addEventListener("input", updateSendButtonVisibility);
  sendButton.addEventListener("click", handleSendRequest);
  inputArea.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendRequest();
  });
  updateSendButtonVisibility();
}

window.addEventListener("load", initialize);
