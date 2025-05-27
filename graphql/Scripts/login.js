
import { handleProfile } from "./profile.js"


export function handleLogout() {
    localStorage.removeItem('JWT')
    document.body.innerHTML = ``
    handleLogin()
}


export function handleLogin() {
    renderLoginPage()
    const form = document.getElementById("login-form")
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const credentials = {
            username: form?.username.value,
            password: form?.password.value,
        }
        try {
            const response = await submitLogin(credentials)
            if (response.error) {
                throw response.error
            }
            localStorage.setItem('JWT', response)            
            handleProfile()
        } catch (error) {
            console.error(error)
        }
    })
}

function renderLoginPage() {
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="login-container">
        <form class="login-card" id="login-form">
            <h1>Login</h1>
            <input type="text" id="username" placeholder="username or email" required/>
            <input type="password" id="password" placeholder="password" required/>
            <span class="error" id="login-error"></span>
            <button id="login-button" class="btn">Login <i class="fa-solid fa-right-to-bracket"></i></button>
        </form>
    </div>`

    document.body.appendChild(container);
}

async function submitLogin(credentials) {
    try {
        const errorElement = document.getElementById("login-error");
        errorElement.textContent = "";
        
        // Validate input
        if (!credentials.username || !credentials.password) {
            errorElement.textContent = "Please enter both username/email and password";
            return { error: "Missing credentials" };
        }
        
        const response = await fetch(`https://zone01normandie.org/api/auth/signin`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(credentials.username + ":" + credentials.password)}`
            }
        });
        
        if (!response.ok) {
            errorElement.textContent = "Invalid username/email or password";
            return { error: "Authentication failed" };
        }
        
        return response.json();
    } catch (error) {
        console.error("Login error:", error);
        document.getElementById("login-error").textContent = "An error occurred during login";
        return { error: error.message };
    }
}