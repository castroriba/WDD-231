// The URL must be correct relative to the directory.html file
const url = 'data/data/members.json'; 
const cards = document.querySelector('#directory-cards');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

// --- Core Function: Fetch and Process Data (Uses async/await) ---
async function getMemberData() {
    try {
        const response = await fetch(url);
        
        // Handle HTTP error status codes (like 404 or 500)
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members); // data.members targets the array inside the object
        } else {
            // Throw an error if the HTTP status is not 200-299
            throw Error(`Network response was not ok. Status: ${response.status}`);
        }
    } catch (error) {
        // This catches network errors AND the JSON parsing error from the previous attempt
        console.error('Error fetching or parsing data:', error);
        cards.innerHTML = `<p class="error">Failed to load member directory. Please check the console for details. (Error: ${error.message})</p>`;
    }
}

// --- Display Function: Build HTML Cards ---
const displayMembers = (members) => {
    cards.innerHTML = ''; // Clear the "Loading" message

    members.forEach((member) => {
        // Create the card elements
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let logo = document.createElement('img');
        let level = document.createElement('p');

        // Populate content
        h2.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = `Phone: ${member.phone}`;
        
        website.textContent = member.website;
        website.href = member.website;
        website.target = '_blank';
        
        level.textContent = `Membership: ${member.membership_level}`;
        level.classList.add('membership-level');

        // Build Image attributes
        logo.setAttribute('src', member.imageurl);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');

        // Append to the card
        card.appendChild(logo);
        card.appendChild(h2);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        cards.appendChild(card);
    });
}

// --- View Control Logic (Grid/List Switch) ---
function setView(viewType) {
    if (viewType === 'list') {
        cards.classList.remove('grid');
        cards.classList.add('list');
        listButton.classList.add('active-view');
        gridButton.classList.remove('active-view');
    } else { // Default to Grid
        cards.classList.remove('list');
        cards.classList.add('grid');
        gridButton.classList.add('active-view');
        listButton.classList.remove('active-view');
    }
}

// --- Event Listeners and Initialization ---

// Switch view on button click
gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

// Load data on page load
getMemberData();