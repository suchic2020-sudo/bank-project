const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const toggleAuth = document.getElementById('toggle-auth');
const toggleMsg = document.getElementById('toggle-msg');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');

const uidGroup = document.getElementById('uid-group');
const emailGroup = document.getElementById('email-group');
const phoneGroup = document.getElementById('phone-group');

let isLogin = true;

toggleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
        authTitle.textContent = 'Kodbank Login';
        submitBtn.textContent = 'Login';
        toggleMsg.textContent = "Don't have an account?";
        toggleAuth.textContent = 'Register';
        uidGroup.classList.add('hidden');
        emailGroup.classList.add('hidden');
        phoneGroup.classList.add('hidden');
    } else {
        authTitle.textContent = 'Kodbank Register';
        submitBtn.textContent = 'Register';
        toggleMsg.textContent = 'Already have an account?';
        toggleAuth.textContent = 'Login';
        uidGroup.classList.remove('hidden');
        emailGroup.classList.remove('hidden');
        phoneGroup.classList.remove('hidden');
    }
    errorMessage.classList.add('hidden');
});

// Initial state
if (isLogin) {
    uidGroup.classList.add('hidden');
    emailGroup.classList.add('hidden');
    phoneGroup.classList.add('hidden');
}

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.classList.add('hidden');

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin
        ? { username, password }
        : {
            username,
            password,
            uid: document.getElementById('uid').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            if (isLogin) {
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'dashboard.html';
            } else {
                alert('Registration successful! Please login.');
                toggleAuth.click();
            }
        } else {
            errorMessage.textContent = data.message || 'Error occurred';
            errorMessage.classList.remove('hidden');
        }
    } catch (err) {
        errorMessage.textContent = 'Network error. Is the server running?';
        errorMessage.classList.remove('hidden');
    }
});
