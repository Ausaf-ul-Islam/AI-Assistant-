// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
const btn = document.querySelector("#listen-btn");

// Attach click event listener to the button
btn.addEventListener("click", function () {
  // Function to convert text to speech
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  // Function to handle recognized commands
  function handleCommand(command) {
    if (command.includes("open youtube")) {
      speak("Opening YouTube. This will take you to the YouTube website where you can watch videos.");
      window.open("https://www.youtube.com", "_blank");
    } else if (command.includes("open google")) {
      speak("Opening Google. This will take you to Google's search engine, where you can search for information.");
      window.open("https://www.google.com", "_blank");
    } else if (command.includes("open facebook")) {
      speak("Opening Facebook. This will take you to Facebook's homepage to connect with friends and family.");
      window.open("https://www.facebook.com", "_blank");
    } else if (command.includes("open instagram")) {
      speak("Opening Instagram. This will take you to Instagram's homepage, where you can view and share photos and videos.");
      window.open("https://www.instagram.com", "_blank");
    } else if (command.includes("open whatsapp")) {
      speak("Opening WhatsApp Web. This will allow you to use WhatsApp on your web browser.");
      window.open("https://web.whatsapp.com", "_blank"); // WhatsApp web URL
    } else {
      // Perform a Google search if command not recognized
      speak("I'm not sure about that command. I'll search Google for " + command + " instead.");
      window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank");
    }
  }

  // Greet the user and then start listening
  speak("Hello, Brother, how can I help you?");

  // Delay to ensure greeting completes before starting recognition
  setTimeout(() => {
    btn.innerHTML = "Listening...👂";
    btn.classList.add("listening");
    recognition.start();
  }, 2500);

  // When a result is received
  recognition.onresult = (event) => {
    console.log(event);
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  // When recognition ends
  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
  };
});
