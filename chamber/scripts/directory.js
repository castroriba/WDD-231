// Data source URL
const url = 'data/members.json'; 
const cards = document.querySelector('#directory-cards');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

// --- Helper Function: Create Card HTML ---
const createMemberCard = (member) => {
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
    logo.classList.add('member-logo');

    // Append to the card
    card.appendChild(logo);
    card.appendChild(h2);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(level);

    return card;
}

// --- Display Function: Build HTML Cards ---
const displayMembers = (members) => {
    cards.innerHTML = ''; // Clear the message

    members.forEach((member) => {
        const card = createMemberCard(member);
        cards.appendChild(card);
    });
}

// --- Core Function: Fetch and Process Data (async/await) ---
async function getMemberData() {
    try {
        // Path adjusted to 'data/members.json' relative to chamber/directory.html
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            throw Error(`Network response was not ok. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        cards.innerHTML = `<p class="error">Failed to load member directory. Check console/network for details.</p>`;
    }
}

// --- View Control Logic (Grid/List Switch) ---
function setView(viewType) {
    if (viewType === 'list') {
        cards.classList.remove('grid');
        cards.classList.add('list');
        listButton.classList.add('active-view');
        gridButton.classList.remove('active-view');
    } else { // Grid View
        cards.classList.remove('list');
        cards.classList.add('grid');
        gridButton.classList.add('active-view');
        listButton.classList.remove('active-view');
    }
    // Re-render to ensure images are hidden/shown correctly in the new view
    // Not strictly necessary if CSS handles it, but good for debugging.
}

// --- Event Listeners and Initialization ---
gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

getMemberData();