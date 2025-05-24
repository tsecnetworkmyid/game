// Loader animation
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.cyber-loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Show alert after 3 seconds
    setTimeout(() => {
        document.querySelector('.cyber-alert').classList.add('show');
    }, 3000);
    
    // Close alert button
    document.querySelector('.close-alert').addEventListener('click', function() {
        document.querySelector('.cyber-alert').classList.remove('show');
    });
    
   
    // Access key verification
    document.getElementById('submitKey').addEventListener('click', verifyAccessKey);
    document.getElementById('accessKey').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verifyAccessKey();
    });
    
    function verifyAccessKey() {
        const accessKey = document.getElementById('accessKey').value;
        const responseElement = document.getElementById('keyResponse');
        
        if (accessKey === "saya_cinta_tsecnetwork") {
            responseElement.innerHTML = '<i class="fas fa-check-circle"></i> Kunci valid! Memeriksa status CTF-mu...';
            responseElement.style.color = 'var(--primary)';
            responseElement.style.display = 'block';
            
            // Check if user has registered before
            setTimeout(() => {
                const userRegistered = getCookie('ctf_user_registered');
                
                if (userRegistered === 'true') {
                    // User has registered before, check progress
                    checkCTFProgress();
                } else {
                    // Show registration form
                    document.getElementById('userFormContainer').style.display = 'block';
                }
            }, 1500);
        } else {
            responseElement.innerHTML = '<i class="fas fa-times-circle"></i> Kunci tidak valid! Coba lagi atau hubungi admin.';
            responseElement.style.color = 'var(--danger)';
            responseElement.style.display = 'block';
        }
    }
    
    // User registration
    document.getElementById('submitUser').addEventListener('click', registerUser);
    
    function registerUser() {
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        
        // Simple validation
        if (!userName || !userEmail) {
            alert('Nama dan email harus diisi!');
            return;
        }
        
        // Very basic email validation
        if (!userEmail.includes('@') || !userEmail.includes('.')) {
            alert('Masukkan email yang valid!');
            return;
        }
        
        // Save to cookies
        setCookie('ctf_user_name', userName, 30);
        setCookie('ctf_user_email', userEmail, 30);
        setCookie('ctf_user_registered', 'true', 30);
        
        // PERBAIKAN: Set initial room dengan benar
        setCookie('ctf_current_room', '001', 30);
        
        // Show CTF start options
        document.getElementById('userFormContainer').style.display = 'none';
        document.getElementById('ctfStartContainer').style.display = 'block';
        document.getElementById('ctfStatusText').textContent = `Selamat datang ${userName}! Kamu akan memulai challenge dari awal. Selesaikan setiap ruangan untuk mendapatkan poin!`;
    }
    
    // Start CTF
    document.getElementById('startCTF').addEventListener('click', function() {
        const currentRoom = getCookie('ctf_current_room') || '001';
        
        // PERBAIKAN: Jangan reset progress jika sudah ada
        if (!getCookie('ctf_current_room')) {
            setCookie('ctf_current_room', '001', 30);
        }
        
        // Redirect to current room
        window.location.href = `ruangan${currentRoom}/index.html`;
    });
    
    // Check user's CTF progress
    function checkCTFProgress() {
        const currentRoom = getCookie('ctf_current_room');
        const userName = getCookie('ctf_user_name');
        
        console.log('Checking progress - Current room:', currentRoom); // Debug log
        
        if (!currentRoom || currentRoom === '001') {
            // No progress or still at room 1, start from beginning
            document.getElementById('ctfStartContainer').style.display = 'block';
            document.getElementById('ctfStatusText').textContent = `Selamat datang kembali ${userName}! Kamu akan memulai challenge dari awal.`;
            
            const startButton = document.getElementById('startCTF');
            startButton.innerHTML = `Masuk Ruangan 001 <i class="fas fa-door-open"></i>`;
            startButton.onclick = function() {
                setCookie('ctf_current_room', '001', 30);
                window.location.href = `ruangan001/index.html`;
            };
        } else {
            // Has progress beyond room 1
            document.getElementById('ctfStartContainer').style.display = 'block';
            document.getElementById('ctfStatusText').textContent = `Selamat datang kembali ${userName}! Kamu akan melanjutkan challenge dari Ruangan ${currentRoom}.`;
            
            // Update button based on progress
            const startButton = document.getElementById('startCTF');
            startButton.innerHTML = `Lanjutkan Ruangan ${currentRoom} <i class="fas fa-door-open"></i>`;
            startButton.onclick = function() {
                console.log('Navigating to room:', currentRoom); // Debug log
                window.location.href = `ruangan${currentRoom}/index.html`;
            };
        }
    }
    
    // Cookie functions
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        console.log(`Cookie set: ${name} = ${value}`); // Debug log
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const value = c.substring(nameEQ.length, c.length);
                console.log(`Cookie get: ${name} = ${value}`); // Debug log
                return value;
            }
        }
        console.log(`Cookie not found: ${name}`); // Debug log
        return null;
    }
});

// Resize canvas on window resize
window.addEventListener('resize', function() {
    const canvas = document.querySelector('.matrix-rain');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});