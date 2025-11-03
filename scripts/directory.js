const url = 'data/data/members.json';
const cards = document.querySelector('#directory-cards');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

// --- Core Function: Fetch and Process Data ---
async function getMemberData() {
    try {
        // Use Fetch API and await for the response
        const response = await fetch(url);
        // Convert the response to a JSON object
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members); // data.members targets the array inside the object
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        cards.innerHTML = `<p class="error">Failed to load member directory. (${error.message})</p>`;
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

        // Append to the card (Grid View Structure)
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