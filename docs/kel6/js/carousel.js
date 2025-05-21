 
        document.addEventListener('DOMContentLoaded', function() {
            // Team carousel
            const teamCarousel = document.getElementById('team-carousel');
            const teamPrevBtn = document.querySelector('#team-carousel').previousElementSibling;
            const teamNextBtn = document.querySelector('#team-carousel').nextElementSibling;
            
            function setupCarousel(carousel, prevBtn, nextBtn) {
                const items = carousel.querySelectorAll('.carousel-item');
                const itemWidth = items[0].offsetWidth;
                const visibleItems = Math.min(3, Math.floor(carousel.parentElement.offsetWidth / itemWidth));
                const scrollAmount = itemWidth * visibleItems;
                let currentPosition = 0;
                const maxPosition = (items.length - visibleItems) * itemWidth;
                
                function updateButtons() {
                    prevBtn.style.display = currentPosition <= 0 ? 'none' : 'flex';
                    nextBtn.style.display = currentPosition >= maxPosition ? 'none' : 'flex';
                }
                
                prevBtn.addEventListener('click', function() {
                    currentPosition = Math.max(0, currentPosition - scrollAmount);
                    carousel.style.transform = `translateX(-${currentPosition}px)`;
                    updateButtons();
                });
                
                nextBtn.addEventListener('click', function() {
                    currentPosition = Math.min(maxPosition, currentPosition + scrollAmount);
                    carousel.style.transform = `translateX(-${currentPosition}px)`;
                    updateButtons();
                });
                
                const centerOffset = (carousel.parentElement.offsetWidth - (itemWidth * visibleItems)) / 2;
                carousel.style.paddingLeft = `${centerOffset}px`;
                carousel.style.paddingRight = `${centerOffset}px`;
                
                updateButtons();
                
                window.addEventListener('resize', function() {
                    const newVisibleItems = Math.min(3, Math.floor(carousel.parentElement.offsetWidth / itemWidth));
                    const newScrollAmount = itemWidth * newVisibleItems;
                    const newMaxPosition = (items.length - newVisibleItems) * itemWidth;
                    
                    scrollAmount = newScrollAmount;
                    maxPosition = newMaxPosition;
                    currentPosition = Math.min(currentPosition, maxPosition);
                    
                    carousel.style.transform = `translateX(-${currentPosition}px)`;
                    updateButtons();
                });
            }
            
            setupCarousel(teamCarousel, teamPrevBtn, teamNextBtn);
        });
    