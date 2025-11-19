// --- W04 Thank You Page Logic: Retrieving and Displaying Form Data ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the query string parameters from the URL
    const params = new URLSearchParams(window.location.search);
    
    // 2. Retrieve required fields using params.get()
    const firstName = params.get('fname') || 'N/A';
    const lastName = params.get('lname') || 'N/A';
    const email = params.get('email') || 'N/A';
    const tel = params.get('tel') || 'N/A';
    const bizName = params.get('bizname') || 'N/A';
    const timestamp = params.get('timestamp') || 'N/A';
    
    // 3. Display the retrieved data in the appropriate <dd> elements
    document.querySelector('#display-name').textContent = `${firstName} ${lastName}`;
    document.querySelector('#display-email').textContent = email;
    document.querySelector('#display-tel').textContent = tel;
    document.querySelector('#display-bizname').textContent = bizName;
    
    // Format the timestamp for better readability
    if (timestamp !== 'N/A') {
        try {
            // Convert the ISO string back to a readable local time format
            const date = new Date(timestamp);
            document.querySelector('#display-timestamp').textContent = date.toLocaleString();
        } catch (e) {
            // Fallback if formatting fails
            document.querySelector('#display-timestamp').textContent = timestamp;
        }
    } else {
        document.querySelector('#display-timestamp').textContent = timestamp;
    }
});