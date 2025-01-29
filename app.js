document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    appElement.innerHTML = '<h1>Vôlei Web App</h1>';

    const contentContainer = document.getElementById('content-container');
    contentContainer.appendChild(createNamesList());
    contentContainer.appendChild(createOptionsBox());
    contentContainer.appendChild(createTeamsContainer());
    contentContainer.appendChild(createRedrawButton());
    contentContainer.appendChild(createInputContainer());

    const inputBox = document.querySelector('input[type="text"]');
    const namesList = document.querySelector('.names-list');
    const addButton = document.querySelector('.add-button');
    const optionsBox = document.getElementById('options-box');
    const teamsContainer = document.getElementById('teams-container');
    const redrawButton = document.getElementById('redraw-button');
    
    let currentTeamsCount = 0;
    
    const triggerCommands = [
        'sortei os times', 'sorteia os times', 'sortei os nomes', 'sorteia os nomes',  
        'Sorteia os times', 'Sorteia os nomes', 'Sortei os times', 'Sortei os nomes',  
        'sortei', 'sorteia', 'sortear', 'faz o sorteio', 'faz sorteio', 'cria times',  
        'gera times', 'gera nomes', 'sorteio times', 'sorteio nomes', 'times sorteio',  
        'nomes sorteio', 'sortear times', 'sortear nomes', 'fazer sorteio', 'sortei agora',  
        'sorteia agora', 'criar times', 'gerar times', 'times aleatórios', 'nomes aleatórios',  
        'sorteio rápido', 'sortear agora', 'randomiza times', 'randomiza nomes', 'times random',  
        'random times', 'random nomes', 'times aleatórios', 'nomes aleatórios', 'times randômicos',  
        'sorta os times', 'sorta os nomes', 'sortea os times', 'sortea os nomes', 'monta times',  
        'gera grupos', 'faz grupos', 'organiza times', 'times automáticos', 'grupos automáticos',  
        'divide os times', 'divide nomes', 'separa times', 'separa nomes', 'times automáticos',  
        'formar times', 'formar equipes', 'montar equipes', 'criar equipes', 'times sorteados',  
        'nomes sorteados', 'faz o time', 'gera um time', 'randomiza um time', 'randomiza uma equipe', 'x'
    ];
    
    function createNamesList() {
        const ul = document.createElement('ul');
        ul.className = 'names-list';
        return ul;
    }

    function createOptionsBox() {
        const div = document.createElement('div');
        div.className = 'options-box';
        div.id = 'options-box';
        div.innerHTML = `
            <button data-teams="2">2 Times</button>
            <button data-teams="3">3 Times</button>
            <button data-teams="4">4 Times</button>
            <button data-teams="5">5 Times</button>
        `;
        return div;
    }

    function createTeamsContainer() {
        const div = document.createElement('div');
        div.className = 'teams-container';
        div.id = 'teams-container';
        return div;
    }

    function createRedrawButton() {
        const button = document.createElement('button');
        button.className = 'redraw-button';
        button.id = 'redraw-button';
        button.textContent = 'Tirar de novo';
        return button;
    }

    function createInputContainer() {
        const div = document.createElement('div');
        div.className = 'input-container';
        div.innerHTML = `
            <input type="text" placeholder="Escreva os nomes aqui...">
            <button class="add-button">+</button>
        `;
        return div;
    }

    function addNameToList(name) {
        if (name.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${namesList.children.length + 1} - ${name.trim().toUpperCase()} <button class="delete-button">×</button>`;
            namesList.insertBefore(listItem, namesList.firstChild);
            listItem.querySelector('.delete-button').addEventListener('click', () => {
                namesList.removeChild(listItem);
                reindexNames();
            });
        }
    }

    function reindexNames() {
        Array.from(namesList.children).forEach((li, index) => {
            const name = li.textContent.split(' - ')[1].split(' ')[0];
            li.innerHTML = `${index + 1} - ${name} <button class="delete-button">×</button>`;
            li.querySelector('.delete-button').addEventListener('click', () => {
                namesList.removeChild(li);
                reindexNames();
            });
        });
    }
    
    function handleInput(event) {
        if (event.key === 'Enter') {
            const inputValue = event.target.value.trim().toLowerCase();
            if (triggerCommands.includes(inputValue)) {
                optionsBox.style.display = 'flex';
            } else {
                addNameToList(event.target.value);
            }
            event.target.value = '';
        }
    }
    
    inputBox.addEventListener('keypress', handleInput);
    addButton.addEventListener('click', () => {
        const inputValue = inputBox.value.trim().toLowerCase();
        if (triggerCommands.includes(inputValue)) {
            optionsBox.style.display = 'flex';
        } else {
            addNameToList(inputBox.value);
        }
        inputBox.value = '';
    });

    optionsBox.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const quantidadeTimes = parseInt(event.target.getAttribute('data-teams'));
            currentTeamsCount = quantidadeTimes;
            createTeams(quantidadeTimes);
            optionsBox.style.display = 'none';
            redrawButton.style.display = 'block'; // Show the redraw button
        }
    });

    redrawButton.addEventListener('click', () => {
        if (currentTeamsCount > 0) {
            createTeams(currentTeamsCount);
        }
    });

    function createTeams(quantidadeTimes) {
        const names = Array.from(namesList.children).map(li => li.textContent.split(' - ')[1].split(' ')[0]);
        shuffleArray(names);
        const teams = Array.from({ length: quantidadeTimes }, () => []);
        names.forEach((name, index) => {
            teams[index % quantidadeTimes].push(name);
        });
        displayTeams(teams);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function displayTeams(teams) {
        teamsContainer.innerHTML = '';
        teams.forEach((team, index) => {
            const teamDiv = document.createElement('div');
            teamDiv.classList.add('team');
            teamDiv.innerHTML = `<h3>Time ${index + 1}</h3><ul>${team.map(name => `<li>${name}</li>`).join('')}</ul>`;
            teamsContainer.appendChild(teamDiv);
        });
        addOrderEmojis(teams.length);
        addRandomEmojiToStarTeams(teams);
        redrawButton.style.display = 'block'; // Ensure the redraw button is shown
    }

    function addOrderEmojis(teamCount) {
        const orderEmojis = ['⭐', '⭐', ' - Próximo', ' - Depois do Próximo', ' - Depois > Depois do Próximo'];
        const teamHeaders = Array.from(document.querySelectorAll('.team h3'));
        shuffleArray(teamHeaders);
        teamHeaders.forEach((header, index) => {
            if (index < teamCount) {
                header.textContent += ` ${orderEmojis[index]}`;
            }
        });
    }

    function addRandomEmojiToStarTeams(teams) {
        const teamHeaders = Array.from(document.querySelectorAll('.team h3'));
        const starTeams = teamHeaders.filter(header => header.textContent.includes('⭐'));
        const allStarNames = starTeams.flatMap(header => {
            const teamIndex = teamHeaders.indexOf(header);
            return teams[teamIndex];
        });
        if (allStarNames.length > 0) {
            const randomIndex = Math.floor(Math.random() * allStarNames.length);
            const randomName = allStarNames[randomIndex];
            const listItem = Array.from(document.querySelectorAll('.team ul li')).find(li => li.textContent === randomName);
            if (listItem) {
                listItem.textContent += ' 🏐';
                listItem.classList.add('volleyball-emoji'); // Add class for transparent gray background
            }
        }
    }

    // Ensure the options box and redraw button are hidden initially
    optionsBox.style.display = 'none';
    redrawButton.style.display = 'none';
});