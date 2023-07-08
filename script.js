const inputEl = document.querySelector('#input-el');
const saveBtn = document.querySelector('#input-btn');
const saveTabBtn = document.querySelector('#save-tab-btn');
const deleteBtn = document.querySelector('#delete-btn');
const ulEl = document.querySelector('#ul-el');
let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

function renderLeads(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++) {
        listItems = `
        <li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

saveBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value);

    inputEl.value = '';

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
    renderLeads(myLeads);
});

saveTabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        renderLeads(myLeads);
    });
});

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
});

