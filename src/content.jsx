import { renderSuggestionBox } from "./main";

export const mountReactApp = () => {
  const container = document.createElement("div");
  const shadow = container.attachShadow({ mode: "open" });
  container.id = "email-suggestion-box";
  container.style.position = "absolute";
  container.style.zIndex = "1000";
  document.body.appendChild(container);

  // Inject React app
  const root = document.createElement("div");
  root.id = "root";
  shadow.appendChild(root);

  return root;
};

console.log("hello");

const fetchSuggestions = async () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "fetchSuggestions" }, (response) => {
      console.log("response", response);
      if (response.success) {
        resolve(response.suggestions);
      } else {
        console.error("Failed to fetch suggestions:", response.error);
        resolve([]);
      }
    });
  });
};

fetchSuggestions().then((emails) => {
  console.log("emails", emails);
  renderSuggestionBox(emails);
});
