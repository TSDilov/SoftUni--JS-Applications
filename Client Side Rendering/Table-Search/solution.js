import { html, render } from './node_modules/lit-html/lit-html.js';

const rowTemplate = (student) => html`
<tr class=${student.match ? 'select' : ''}>
   <td>${student.item.firstName} ${student.item.lastName}</td>
   <td>${student.item.email}</td>
   <td>${student.item.course}</td>
</tr>`;

const url = 'http://localhost:3030/jsonstore/advanced/table';
const body = document.querySelector('tbody');
let students;
const input = document.getElementById('searchField');
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', onSearch);

getData();

async function getData() {
   const response = await fetch(url);
   const data = await response.json();
   students = Object.values(data).map(s => ({ item: s, match: false }));
   update();
}

function update() {
   render(students.map(rowTemplate), body);
}

function onSearch() {
   let value = input.value.trim().toLowerCase();

   for (const student of students) {
      student.match = Object.values(student.item).some(v => value && v.toLowerCase().includes(value));
   }
   input.value = '';
   update();
}

