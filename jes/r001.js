 document.addEventListener('DOMContentLoaded', function() {
            const loader = document.querySelector('.cyber-loader');
            const currentRoom = '001'; 
            
            const userRegistered = getCookie('ctf_user_registered');
            if (userRegistered !== 'true') {
                window.location.href = '../index.html';
                return;
            }
            
            const userCurrentRoom = getCookie('ctf_current_room');
            console.log(`User current room: ${userCurrentRoom}, This room: ${currentRoom}`);
            
            if (userCurrentRoom && parseInt(currentRoom) > parseInt(userCurrentRoom)) {
                preventRoomSkipping(currentRoom, userCurrentRoom);
                return;
            }
            
            if (userCurrentRoom && parseInt(currentRoom) < parseInt(userCurrentRoom)) {
                preventBacktracking(currentRoom, userCurrentRoom);
                return;
            }
            
            // Display user info
            document.getElementById('userNameDisplay').textContent = getCookie('ctf_user_name') || 'Tidak diketahui';
            document.getElementById('userEmailDisplay').textContent = getCookie('ctf_user_email') || 'Tidak diketahui';
            document.getElementById('currentRoomDisplay').textContent = currentRoom;
            document.getElementById('totalPointsDisplay').textContent = calculateTotalPoints();
            
            // Check if already completed
            const roomProgress = getCookie(`ctf_room_${currentRoom.padStart(3, '0')}_progress`);
            if (roomProgress === 'completed') {
                document.getElementById('challengeContent').style.display = 'none';
                document.getElementById('successContent').style.display = 'block';
                document.getElementById('roomStatus').textContent = 'Selesai';
                document.getElementById('nextRoom').onclick = function() {
                    const nextRoom = (parseInt(currentRoom) + 1).toString().padStart(3, '0');
                    // PERBAIKAN: Update current room cookie ketika pindah ke ruangan berikutnya
                    setCookie('ctf_current_room', nextRoom, 30);
                    window.location.href = `../ruangan${nextRoom}/index.html`;
                };
                // Don't return here, let normal loading continue
            }
            
            // Loader timeout
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1500);
            
            // Show hint after 30 seconds
            setTimeout(() => {
                document.getElementById('hintArea').style.display = 'block';
            }, 30000);
            
            // Hint button
            document.getElementById('showHint').addEventListener('click', function() {
                const hintContent = document.getElementById('hintContent');
                hintContent.style.display = hintContent.style.display === 'none' ? 'block' : 'none';
            });
            
            // Flag submission
            document.getElementById('submitFlag').addEventListener('click', checkFlag);
            document.getElementById('flagInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') checkFlag();
            });
            
            function checkFlag() {
                const userFlag = document.getElementById('flagInput').value;
                const correctFlag = 'selamat_datang_di_ctf_tsecnetwork'; // GANTI flag untuk setiap ruangan
                const responseElement = document.getElementById('flagResponse');
                
                if (userFlag === correctFlag) {
                    responseElement.innerHTML = '<i class="fas fa-check-circle"></i> Flag benar! 5 poin telah ditambahkan.';
                    responseElement.style.color = 'var(--primary)';
                    responseElement.style.display = 'block';
                    
                    // Mark room as completed
                    setCookie(`ctf_room_${currentRoom.padStart(3, '0')}_progress`, 'completed', 30);
                    
                    // PERBAIKAN: Update current room untuk akses ruangan berikutnya
                    const nextRoom = (parseInt(currentRoom) + 1).toString().padStart(3, '0');
                    setCookie('ctf_current_room', nextRoom, 30);
                    
                    console.log(`Room ${currentRoom} completed, next room set to: ${nextRoom}`);
                    
                    // Show success content
                    setTimeout(() => {
                        document.getElementById('challengeContent').style.display = 'none';
                        document.getElementById('successContent').style.display = 'block';
                        document.getElementById('roomStatus').textContent = 'Selesai';
                        document.getElementById('totalPointsDisplay').textContent = calculateTotalPoints();
                    }, 1500);
                } else {
                    responseElement.innerHTML = '<i class="fas fa-times-circle"></i> Flag salah! Coba lagi.';
                    responseElement.style.color = 'var(--danger)';
                    responseElement.style.display = 'block';
                }
            }
            
            // Next room button
            document.getElementById('nextRoom').addEventListener('click', function() {
                const nextRoom = (parseInt(currentRoom) + 1).toString().padStart(3, '0');
                window.location.href = `../ruangan${nextRoom}/index.html`;
            });
            
            // Flag in console
            console.log('%c Tahukah kamu? Flag untuk challenge ini adalah: selamat_datang_di_ctf_tsecnetwork', 'color: #00ffaa; font-size: 14px;');
            
            // Helper functions
            function preventRoomSkipping(attemptedRoom, userRoom) {
                const funnyMessages = [
                    "Bro, jangan curang dong! Kalo mau jadi hacker yang jago ya harus lewat jalan yang benar~",
                    "Waduh, ketahuan mau skip level ya? Gak boleh gitu, nanti gak jago-jago!",
                    "Eits, mau lompat-lompat ya? Kayak kodok aja~ Yuk balik ke level yang bener!",
                    "Hacker sejati gak pernah curang! Kembali ke level terakhirmu ya~",
                    "Kamu pikir bisa cheat pakai inspect element? Gak semudah itu, kawan~"
                ];
                const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
                
                if (confirm(`${randomMessage}\n\nKamu sedang di ruangan ${userRoom} tapi mencoba mengakses ruangan ${attemptedRoom}. Kembali ke ruangan yang sesuai?`)) {
                    window.location.href = `../ruangan${userRoom}/index.html`;
                } else {
                    window.location.href = '../index.html';
                }
            }
            
            // BARU: Fungsi untuk mencegah kembali ke ruangan sebelumnya
            function preventBacktracking(attemptedRoom, userRoom) {
                // Stop loader immediately
                const loader = document.querySelector('.cyber-loader');
                if (loader) {
                    loader.style.display = 'none';
                }
                
                // Create and show access denied screen
                const accessDeniedHtml = `
                    <div class="access-denied-container">
                        <div class="access-denied-card">
                            <h1 class="denied-title">Akses Ditolak!</h1>
                            
                            <div class="motivational-text">
                                Kamu sudah tidak bisa berkunjung ke ruangan sebelumnya karena sudah menyelesaikannya!<br><br>
                                <span class="highlight-green">🎯 Kamu harus tetap fokus ke tujuan akhirmu!</span><br>
                                <span class="highlight-yellow">💪 Semangat, selalu konsisten!</span><br>
                                <span class="highlight-red">🔥 Jangan mundur, dan teruslah maju!</span><br><br>
                                <em style="color: #888;">Ruangan saat ini: ${userRoom} | Ruangan yang dicoba: ${attemptedRoom}</em>
                            </div>
                            
                            <div class="action-buttons">
                                <a href="../ruangan${userRoom}/index.html" class="action-btn btn-primary">
                                    🚀 Lanjutkan ke Ruangan ${userRoom}
                                </a>
                                
                                <a href="../index.html" class="action-btn btn-secondary">
                                    🏠 Kembali ke Menu Utama
                                </a>
                            </div>
                            
                            <div class="tips-box">
                                <p class="tips-content">
                                    💡 <strong>Tips Hacker:</strong> Dalam dunia cybersecurity, konsistensi dan fokus pada tujuan adalah kunci sukses. 
                                    Jangan terpaku pada pencapaian masa lalu, terus maju ke tantangan berikutnya! 
                                    Setiap ruangan yang sudah diselesaikan adalah langkah menuju keahlian yang lebih tinggi.
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                
                // Replace entire body content
                document.body.innerHTML = accessDeniedHtml;
                
                // Prevent any further script execution
                return false;
            }
            
            function calculateTotalPoints() {
                const ROOM_POINTS = 5;
                let total = 0;
                for (let i = 1; i <= 20; i++) {
                    const roomNum = i.toString().padStart(3, '0');
                    if (getCookie(`ctf_room_${roomNum}_progress`) === 'completed') {
                        total += ROOM_POINTS;
                    }
                }
                return total;
            }
            
            function setCookie(name, value, days) {
                let expires = "";
                if (days) {
                    const date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
                console.log(`Cookie set: ${name} = ${value}`);
            }
            
            function getCookie(name) {
                const nameEQ = name + "=";
                const ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) {
                        const value = c.substring(nameEQ.length, c.length);
                        return value;
                    }
                }
                return null;
            }
        });
