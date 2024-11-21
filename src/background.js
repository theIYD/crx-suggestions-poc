console.log("background.js");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("request", request);
  if (request.action === "fetchSuggestions") {
    fetch("https://reqres.in/api/users") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const emails = data.data.map((user) => user.email);
        sendResponse({ success: true, suggestions: emails });
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; // Indicates the response will be sent asynchronously
  }
});
