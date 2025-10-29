// ===================================================================
// Criterion 13: Copyright Year and Last Modified Date (Required)
// ===================================================================

// Set the current year for the copyright
const yearElement = document.querySelector('#year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Set the last modified date
const modifiedElement = document.querySelector('#lastModified');
if (modifiedElement) {
    // Uses the Date object to get the last modified date of the document
    // We use 'toLocaleDateString' for a clean, human-readable format.
    modifiedElement.textContent = document.lastModified;
}


// ===================================================================
// Criteria 9, 10, 11, 12: Course List Data and Display Logic (Required)
// ===================================================================

// --- 1. Course Data Array (The provided array of course objects) ---
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Web Design',
        credits: 3,
        isCompleted: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Web Fundamentals',
        credits: 3,
        isCompleted: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Development I',
        credits: 3,
        isCompleted: false
    },
    {
        subject: 'WDD',
        number: 331,
        title: 'Frontend Development II',
        credits: 3,
        isCompleted: false
    },
    {
        subject: 'WDD',
        number: 431,
        title: 'Frontend Frameworks',
        credits: 3,
        isCompleted: false
    },
    {
        subject: 'CSE',
        number: 340,
        title: 'Database Design',
        credits: 3,
        isCompleted: false
    }
];

// --- 2. Target Element and Event Listeners ---
// IMPORTANT: You need to add an element to your HTML to display the course list.
// For example, add this <section> inside your <main> element:
// <section id="course-list-section">
//   <h2>My Course Load</h2>
//   <div class="filter-controls">...buttons go here...</div>
//   <div id="course-list-container"></div>
//   <p>Total Credits: <span id="total-credits">0</span></p>
// </section>

const listContainer = document.querySelector('#course-list-container');
const totalCreditsSpan = document.querySelector('#total-credits');
// The filter buttons will need a parent element, e.g., filter-controls

// --- 3. Core Functions ---

/**
 * Criterion 9: Creates and displays the list of courses.
 * @param {Array} courseArray - The array of courses to display.
 */
function displayCourses(courseArray) {
    listContainer.innerHTML = ''; // Clear existing content

    courseArray.forEach(course => {
        // Create the course card container (e.g., a <div>)
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // Criterion 12: Clearly mark courses you have completed.
        if (course.isCompleted) {
            courseCard.classList.add('completed');
            // Optional: You might add a badge or checkmark here too
        }

        // Populate the card content
        courseCard.innerHTML = `
            <span class="subject">${course.subject}</span> 
            <span class="number">${course.number}</span>: 
            <span class="title">${course.title}</span>
            <span class="credits">(${course.credits} credits)</span>
        `;
        
        listContainer.appendChild(courseCard);
    });

    // Update the total credits after display
    updateTotalCredits(courseArray);
}


/**
 * Criterion 11: Calculates and displays the total number of credits using reduce.
 * @param {Array} courseArray - The array of courses to calculate credits from.
 */
function updateTotalCredits(courseArray) {
    // The reduce function is the key to Criterion 11
    const totalCredits = courseArray.reduce((sum, course) => {
        // Only include courses that are NOT completed in the sum
        return sum + (course.isCompleted ? 0 : course.credits);
    }, 0); // Start the accumulator at 0

    totalCreditsSpan.textContent = totalCredits;
}


// --- 4. Initialization and Event Handling ---

// 1. Initial Load: Display all courses (Criterion 9)
displayCourses(courses);

// 2. Criterion 10: Event Listener for Filtering
// IMPORTANT: You need to set up the filter buttons in your HTML first!

// Example structure for the filter handler:
// document.querySelector('.filter-controls').addEventListener('click', (event) => {
//     if (event.target.tagName === 'BUTTON') {
//         const filterType = event.target.dataset.filter; // e.g., 'WDD', 'CSE', 'All'
//         
//         let filteredList = courses;
//         if (filterType !== 'All') {
//             filteredList = courses.filter(course => course.subject === filterType);
//         }
//
//         displayCourses(filteredList);
//     }
// });