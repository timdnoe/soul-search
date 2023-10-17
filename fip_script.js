// Function to perform search
function performSearch() {
  // Get the search term from the input field
  const searchTerm = document.getElementById('searchInput').value;
  var sourceObject = {
    ACIM: true
  }
  var sources = addSources(sourceObject)
  const numberResults = document.getElementById('numberResults').value
  const display_sources = document.getElementById('display_sources').checked

  // Make sure the search term is not empty
  if (searchTerm.trim() === '') {
    alert('Please enter a search term.');
    return;
  }
  if (!sources.length) {
    alert('Please choose at least one source text.');
    return;
  }

  document.getElementById("loader").style.display = "inline-block"
  document.getElementById("results").style.display = "none"

  // Perform the API call
  fetch(`https://eoubihciw9w5j6z.m.pipedream.net`,
  {
    method: "POST",
    body: JSON.stringify({
      query: searchTerm,
      sources: sources,
      numberResults: numberResults,
      display_sources: display_sources
    })
  })
    .then(response => response.json())
    .then(data => {
      // Clear previous results
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      // Check if data is empty
      if (data.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
        return;
      }
      console.log(data)
      console.log(JSON.stringify(data))
      var text = data.description.split('\n').join("</br>");
      // Loop through the data and display it
      //data.forEach(item => {
        const resultItem = document.createElement('div');
        /*resultItem.innerHTML = `
          <h2>${item.title}</h2>
          <p>${item.description}</p>
        `;*/
        resultItem.innerHTML = `
          <h2>${data.title}</h2>
          <p>${text}</p>
        `;
        resultsDiv.appendChild(resultItem);

      document.getElementById("results").style.display = "inline-block"
      document.getElementById("loader").style.display = "none"
      //});
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    
}

const showSettings = () => {
   document.getElementById("settings").classList.toggle('hidden');
 }

 function addSources(sourceObject){
  var returnArray = new Array()
  for (const key in sourceObject) {
    if (sourceObject[key]){
      returnArray.push(key)
    }
  }
  return returnArray
 }


