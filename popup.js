document.getElementById('save').addEventListener('click', () => {
    const backgroundColor = document.getElementById('background').value;
    const textColor = document.getElementById('text').value;
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'applyTheme', backgroundColor, textColor });
    });
  });
  
  document.getElementById('reset').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'resetTheme' });
    });
  });
  