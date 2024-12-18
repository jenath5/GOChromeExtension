// Function to fetch and display feature IDs
function fetchFeatureIDs() {
    
    // Get the iframe element if it exists
    const iframe = document.getElementById('iframeMain');
    let documentToSearch = document;
  
    if (iframe) {
      // Get the document inside the iframe
      documentToSearch = iframe.contentDocument || iframe.contentWindow.document;
    }
  
    // Select all rows in the Manage Features page
    const featureRows = documentToSearch.querySelectorAll('tr');
    featureRows.forEach(row => {
      const titleElement = row.querySelector('h3.ms-standardheader');
      const idElement = row.querySelector('div[id]');
  
      if (titleElement && idElement) {
        // Extract the feature ID from the div element's ID attribute
        const featureID = idElement.getAttribute('id');
  
        // Check if the feature ID is already appended to avoid duplicates
        if (!titleElement.querySelector('.feature-id')) {
          // Create a span element to display the feature ID
          const featureIDSpan = document.createElement('span');
          featureIDSpan.textContent = ` (${featureID})`;
          featureIDSpan.className = 'feature-id';
          featureIDSpan.style.color = 'black';
  
          // Append the feature ID span to the title element
          titleElement.appendChild(featureIDSpan);
        }
      }
    });
  }
  
  // Function to observe changes in the DOM and apply the fetchFeatureIDs function
  function observeDOMChanges() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };
  
    const callback = function(mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
          fetchFeatureIDs();
        }
      }
    };
  
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }
  
  // Run the function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    fetchFeatureIDs();
    observeDOMChanges();
  });
  
  // Also run the function when the window is fully loaded
  window.addEventListener('load', () => {
    fetchFeatureIDs();
  });
  