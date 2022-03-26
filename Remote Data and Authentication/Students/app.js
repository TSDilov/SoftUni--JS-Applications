const tableBodyElement = document.querySelector('#results tbody');
async function extractStudents() {
    
    const submitButton =document.getElementById('submit');
       
    submitButton.addEventListener('click', createRecord); 
    loadStudents();

    async function createRecord(event) {
        event.preventDefault();
        tableBodyElement.replaceChildren();

        let firstNameInput = document.querySelector('[name="firstName"]');
        let lastNameInput = document.querySelector('[name="lastName"]');
        let facultyNumberInput = document.querySelector('[name="facultyNumber"]');
        let gradeInput = document.querySelector('[name="grade"]');

        if (firstNameInput.value == '' || lastNameInput.value == '' 
            || facultyNumberInput.value == '' || gradeInput.value == '') {
            loadStudents();
            return;
        }

        const data = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            facultyNumber: facultyNumberInput.value,
            grade: gradeInput.value
        }

        await createStudent(data);
        loadStudents();
        
        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';      
    }   
}

async function createStudent(data) {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const options = {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData;
}

async function loadStudents() {
    
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const response = await fetch(url);
    const responseData = await response.json();

    const students = Object.values(responseData);

    for (const student of students) {
            
        const tableRow = document.createElement('tr');
        const tableDataFirstName = document.createElement('td');
        const tableDataLastName = document.createElement('td');
        const tableDataFacultyNumber = document.createElement('td');
        const tableDataGrade = document.createElement('td');

        tableDataFirstName.textContent = student.firstName;
        tableDataLastName.textContent = student.lastName;
        tableDataFacultyNumber.textContent = student.facultyNumber;
        tableDataGrade.textContent = student.grade;

        tableRow.appendChild(tableDataFirstName);
        tableRow.appendChild(tableDataLastName);
        tableRow.appendChild(tableDataFacultyNumber);
        tableRow.appendChild(tableDataGrade);

        tableBodyElement.appendChild(tableRow);
    } 

    return tableBodyElement;
}

extractStudents();