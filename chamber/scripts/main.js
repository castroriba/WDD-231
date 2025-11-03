// ===================================================================
// Criterion 13: Copyright Year and Last Modified Date
// ===================================================================

const yearElement = document.querySelector('#year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const modifiedElement = document.querySelector('#lastModified');
if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}


// ===================================================================
// Criteria 9, 10, 11, 12: Course List Data and Display Logic
// ===================================================================

// --- 1. Course Data Array ---
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

// --- 2. Target Elements ---
const listContainer = document.querySelector('#course-list-container');
const totalCreditsSpan = document.querySelector('#total-credits');
const filterControls = document.querySelector('.filter-controls');

// --- 3. Core Functions ---

/**
 * Criterion 9 & 12: Creates and displays the list of courses.
 * @param {Array} courseArray - The array of courses to display.
 */
function displayCourses(courseArray) {
    listContainer.innerHTML = ''; 

    courseArray.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // Criterion 12: Mark completed courses
        if (course.isCompleted) {
            courseCard.classList.add('completed');
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
    // Uses reduce to sum only the credits of UNCOMPLETED courses
    const totalCredits = courseArray.reduce((sum, course) => {
        return sum + (course.isCompleted ? 0 : course.credits);
    }, 0); 

    totalCreditsSpan.textContent = totalCredits;
}


// --- 4. Initialization and Event Handling ---

// 1. Initial Load: Display all courses (Criterion 9)
displayCourses(courses);


// 2. Criterion 10: Event Listener for Filtering
if (filterControls) {
    filterControls.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const filterType = event.target.dataset.filter;
            
            let filteredList = courses;

            // Apply filter if not 'All'
            if (filterType !== 'All') {
                filteredList = courses.filter(course => course.subject === filterType);
            }

            // Update the display with the filtered list
            displayCourses(filteredList);
        }
    });
}