import { handleLogin } from "./login.js"
import { handleProfile } from "./profile.js"

document.addEventListener('DOMContentLoaded', () => {
    // Gérer l'animation de chargement
    const initialLoader = document.getElementById('initial-loader');
    
    // Attendre un peu pour montrer l'animation
    setTimeout(() => {
        if (initialLoader) {
            initialLoader.classList.add('hidden');
            setTimeout(() => {
                initialLoader.remove();
            }, 500);
        }
        
        // Continuer avec le chargement normal
        const jwt = localStorage.getItem('JWT')
        if (jwt) {
            handleProfile()
        } else {
            handleLogin()
        }
    }, 1500);
})