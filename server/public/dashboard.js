const displayUsername = document.getElementById('display-username');
const checkBalanceBtn = document.getElementById('check-balance-btn');
const balanceSection = document.getElementById('balance-section');
const balanceValue = document.getElementById('balance-value');
const logoutBtn = document.getElementById('logout-btn');

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = 'index.html';
} else {
    displayUsername.textContent = user.username;
}

checkBalanceBtn.addEventListener('click', async () => {
    checkBalanceBtn.disabled = true;
    checkBalanceBtn.textContent = 'Verifying...';

    try {
        const response = await fetch('/api/user/balance');

        if (response.ok) {
            const data = await response.json();
            animateBalance(data.balance);
            balanceSection.classList.remove('hidden');
            checkBalanceBtn.classList.add('hidden');
        } else {
            if (response.status === 401) {
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            } else {
                alert('Failed to fetch balance');
            }
        }
    } catch (err) {
        alert('Network error');
    } finally {
        checkBalanceBtn.disabled = false;
        checkBalanceBtn.textContent = 'Check Balance';
    }
});

logoutBtn.addEventListener('click', async () => {
    await fetch('/api/auth/logout');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

function animateBalance(target) {
    let current = 0;
    const duration = 1000;
    const startTime = performance.now();

    function update(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        current = target * easedProgress;

        balanceValue.textContent = '₹ ' + current.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}
