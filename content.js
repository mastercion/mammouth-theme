// Default theme values
const defaultTheme = {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    headerColor: '#000000',
    linkColor: '#007BFF',
    buttonColor: '#007BFF',
    inputBackgroundColor: '#ffffff',
    inputTextColor: '#000000',
    bgWhiteColor: '#ffffff',
    textBubbleColor: '#ffffff',
    textBubbleOuterColor: '#f0f0f0'
  };
  
  // Apply saved theme
  async function applySavedTheme() {
    try {
      // Retrieve saved theme values
      const result = await chrome.storage.sync.get(Object.keys(defaultTheme));
      console.log('Saved theme values:', result);
  
      // Fallback to default values if no saved values exist
      const theme = { ...defaultTheme, ...result };
      console.log('Theme to apply:', theme);
  
      // Apply theme to elements
      if (theme.backgroundColor) document.body.style.backgroundColor = theme.backgroundColor;
      if (theme.textColor) document.body.style.color = theme.textColor;
      if (theme.headerColor) applyColorToElements('h1, h2, h3, h4, h5, h6', 'color', theme.headerColor);
      if (theme.linkColor) applyColorToElements('a', 'color', theme.linkColor);
      if (theme.buttonColor) applyColorToElements('button', 'backgroundColor', theme.buttonColor);
      if (theme.inputBackgroundColor) applyColorToElements('input, textarea', 'backgroundColor', theme.inputBackgroundColor);
      if (theme.inputTextColor) applyColorToElements('input, textarea', 'color', theme.inputTextColor);
      if (theme.bgWhiteColor) applyColorToElements('.bg-white', 'backgroundColor', theme.bgWhiteColor);
      if (theme.textBubbleColor) applyColorToElements('.p-4', 'background', theme.textBubbleColor);
      if (theme.textBubbleOuterColor) applyColorToElements('.whitespace-pre-line', 'background', theme.textBubbleOuterColor);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }
  
  // Helper function to apply colors to multiple elements
  function applyColorToElements(selector, property, color) {
    const elements = document.querySelectorAll(selector);
    console.log(`Applying ${property}: ${color} to ${selector} (found ${elements.length} elements)`);
    elements.forEach((element) => {
      element.style[property] = color;
    });
  }
  
  // Watch for dynamic content and reapply theme
  function watchForDynamicContent() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          console.log('DOM changed, reapplying theme');
          applySavedTheme();
        }
      });
    });
  
    // Start observing the body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Add theme customizer button
  const button = document.createElement('button');
  button.textContent = '🖌️';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '1000';
  button.style.padding = '15px';
  button.style.backgroundColor = '#007BFF';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '50%';
  button.style.cursor = 'pointer';
  button.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.6)';
  button.style.transition = 'box-shadow 0.3s ease-in-out';
  
  // Add hover effect for more interactivity
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = '0 0 15px rgba(0, 123, 255, 1), 0 0 30px rgba(0, 123, 255, 0.8)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba極, 123, 255, 0.6)';
  });
  
  document.body.appendChild(button);
  
  // Create overlay for blur effect
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.backdropFilter = 'blur(10px)';
  overlay.style.zIndex = '1001';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);
  
  // Create modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  modal.style.color = 'white';
  modal.style.padding = '20px';
  modal.style.borderRadius = '10px';
  modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  modal.style.zIndex = '1002';
  modal.style.display = 'none';
  modal.innerHTML = `
    <h2>Theme Customizer</h2>
    <div class="color-picker">
      <label for="background">Background Color:</label>
      <input type="color" id="background">
    </div>
    <div class="color-picker">
      <label for="text">Text Color:</label>
      <input type="color" id="text">
    </div>
    <div class="color-picker">
      <label for="header">Header Color:</label>
      <input type="color" id="header">
    </div>
    <div class="color-picker">
     label for="link">Link Color:</label>
       <input type="color" id="link">
    </div>
    <div class="color-picker">
      <label for="button">Button Background Color:</label>
      <input type="color" id="button">
    </div>
    <div class="color-picker">
      <label for="inputBackground">Input Background Color:</label>
      <input type="color" id="inputBackground">
    </div>
    <div class="color-picker">
      <label for="inputText">Input Text Color:</label>
      <input type="color" id="inputText">
    </div>
    <div class="color-picker">
      <label for="bgWhite">whiteBg Background Color:</label>
      <input type="color" id="bgWhite">
    </div>
    <div class="color-picker">
      <label for="p4">p-4 Background Color:</label>
      <input type="color" id="p4">
    </div>
    <div class="color-picker">
      <label for="whitespacePre">whitespacePre Background Color:</label>
      <input type="color" id="whitespacePre">
    </div>
    <button id="save">Save</button>
    <button id="reset">Reset</button>
  `;
  document.body.appendChild(modal);
  
  // Function to load saved colors into the modal
  async function loadSavedColorsIntoModal() {
    const result = await chrome.storage.sync.get(Object.keys(defaultTheme));
    const theme = { ...defaultTheme, ...result };
  
    // Set the modal input values
    modal.querySelector('#background').value = theme.backgroundColor;
    modal.querySelector('#text').value = theme.textColor;
    modal.querySelector('#header').value = theme.headerColor;
    modal.querySelector('#link').value = theme.linkColor;
    modal.querySelector('#button').value = theme.buttonColor;
    modal.querySelector('#inputBackground').value = theme.inputBackgroundColor;
    modal.querySelector('#inputText').value = theme.inputTextColor;
    modal.querySelector('#bgWhite').value = theme.bgWhiteColor;
    modal.querySelector('#p4').value = theme.textBubbleColor;
    modal.querySelector('#whitespacePre').value = theme.textBubbleOuterColor;
  }
  
  // Show overlay and modal on button click
  button.addEventListener('click', async () => {
    // Load saved colors into the modal
    await loadSavedColorsIntoModal();
    overlay.style.display = 'block';
    modal.style.display = 'block';
  });
  
  // Hide overlay and modal when clicking outside
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
  });
  
  // Save theme
  modal.querySelector('#save').addEventListener('click', async () => {
    const backgroundColor = modal.querySelector('#background').value;
    const textColor = modal.querySelector('#text').value;
    const headerColor = modal.querySelector('#header').value;
    const linkColor = modal.querySelector('#link').value;
    const buttonColor = modal.querySelector('#button').value;
    const inputBackgroundColor = modal.querySelector('#inputBackground').value;
    const inputTextColor = modal.querySelector('#inputText').value;
    const bgWhiteColor = modal.querySelector('#bgWhite').value;
    const textBubbleColor = modal.querySelector('#p4').value;
    const textBubbleOuterColor = modal.querySelector('#whitespacePre').value;
  
    // Save theme to chrome.storage
    await chrome.storage.sync.set({
      backgroundColor, textColor, headerColor, linkColor,
      buttonColor, inputBackgroundColor, inputTextColor, bgWhiteColor,
      textBubbleColor, textBubbleOuterColor
    });
  
    console.log('Theme saved:', {
      backgroundColor, textColor, headerColor, linkColor,
      buttonColor, inputBackgroundColor, inputTextColor, bgWhiteColor,
      textBubbleColor, textBubbleOuterColor
    });
  
    // Apply theme
    await applySavedTheme();
  
    // Hide overlay and modal
    overlay.style.display = 'none';
    modal.style.display = 'none';
  });
  
  // Reset theme
  modal.querySelector('#reset').addEventListener('click', async () => {
    // Clear saved theme
    await chrome.storage.sync.clear();
  
    // Apply default theme
    await applySavedTheme();
  
    // Hide overlay and modal
    overlay.style.display = 'none';
    modal.style.display = 'none';
  });
  
  // Wait for the page to fully load before applying the theme
  window.addEventListener('load', async () => {
    console.log('Page fully loaded, applying theme');
    await applySavedTheme();
  });
  
  // Watch for dynamic content
  watchForDynamicContent();
  