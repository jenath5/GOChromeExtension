console.log('Content script loaded');

// Function to fetch and display internal field names
function fetchInternalFieldNames() {
  console.log('Fetching internal field names...');
  
  // Get the iframe element
  const iframe = document.getElementById('iframeMain');
  if (iframe) {
    // Get the document inside the iframe
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    
    // Select all anchor tags that contain field information within the iframe
    const anchors = iframeDocument.querySelectorAll('a[href*="FldEdit.aspx"], a[href*="FldEditEx.aspx"][id^="LinkEditField"]');
    anchors.forEach(anchor => {
      // Check if the internal name is already appended to avoid duplicates
      if (!anchor.querySelector('.internal-field-name')) {
        // Extract the internal field name from the href attribute
        const href = anchor.getAttribute('href');
        const urlParams = new URLSearchParams(href.split('?')[1]);
        const internalName = urlParams.get('Field');

        // Create a span element to display the internal field name
        const internalNameSpan = document.createElement('span');
        internalNameSpan.textContent = ` (${internalName})`;
        internalNameSpan.className = 'internal-field-name';
        internalNameSpan.style.color = 'black';

        // Append the internal name span to the anchor tag
        anchor.appendChild(internalNameSpan);
      }
    });
  } else {
    console.log('Iframe not found');
  }
}

// Function to observe changes in the DOM and apply the fetchInternalFieldNames function
function observeDOMChanges() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        fetchInternalFieldNames();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

// Run the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  fetchInternalFieldNames();
  observeDOMChanges();
});

// Also run the function when the window is fully loaded
window.addEventListener('load', () => {
  console.log('Window fully loaded');
  fetchInternalFieldNames();
});