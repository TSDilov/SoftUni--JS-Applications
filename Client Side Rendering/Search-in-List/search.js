import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns as townNames } from './towns.js';

const townsTemplate = (towns) => html`
<ul> 
   ${towns.map(t => html`<li class=${t.match ? 'active' : ''}>${t.name}</li>`)}
</ul>`;

const towns = townNames.map(t => ({ name:t, match:false }));
const divForList = document.getElementById('towns');
const input = document.getElementById('searchText');
const result = document.getElementById('result');
const button = document.querySelector('button');

button.addEventListener('click', onSearch);

update();

function update() {
   render(townsTemplate(towns), divForList);
}

function onSearch() {
   result.textContent = '';
   const match = input.value.trim().toLocaleLowerCase();
   let matches = 0;
   for (const town of towns) {
      if (match && town.name.toLocaleLowerCase().includes(match)) {
         matches++;
         town.match = true;
      } else {
         town.match = false;
      }
   }

   input.value = '';
   result.textContent = `${matches} matches found`;

   update();
}


