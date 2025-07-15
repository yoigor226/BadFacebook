const connexion = document.getElementById('connexionForm');
const inscription = document.getElementById('inscriptionForm');

//Gestion des inscription
inscription.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }) 
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
    });
});

//Gestion des connexions
connexion.addEventListener('/api/users/login', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }) 
    
    .catch(error => {
        console.error('Error:', error);
    });
});