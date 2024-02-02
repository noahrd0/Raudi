// Fonction pour gérer la déconnexion
function Logout() {
    // Supprimez le token du localStorage
    localStorage.removeItem('token');
    // Redirigez l'utilisateur vers la page de connexion (ou une autre page appropriée)
    window.location.href = 'connexion.html';
}

function checkAuthentication() {
    // Récupérez le token du localStorage
    const token = localStorage.getItem('token');

    // Vérifiez si le token existe
    if (token) {
        // Masquez le lien "Se connecter" et affichez le lien "Déconnexion"
        hideElement('seConnecterLink');
        showElement('deconnexionLink');
    } else {
        // Affichez le lien "Se connecter" et masquez le lien "Déconnexion"
        showElement('seConnecterLink');
        hideElement('deconnexionLink');
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

// Appelez la fonction pour vérifier l'authentification lors du chargement de la page
document.addEventListener('DOMContentLoaded', checkAuthentication);