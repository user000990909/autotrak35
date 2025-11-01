function initMainFilterScrollbar() {
    const scrollableContainers = document.querySelectorAll('.filter-select__scrollable');
    
    scrollableContainers.forEach(container => {
        const scrollbar = container.parentElement.querySelector('.filter-select__scrollbar');
        
        if (!scrollbar) return;
        
        function updateScrollbar() {
            const containerHeight = container.clientHeight;
            const contentHeight = container.scrollHeight;
            const scrollTop = container.scrollTop;

            if (contentHeight <= containerHeight) {
                scrollbar.style.display = 'none';
                return;
            } else {
                scrollbar.style.display = 'block';
            }

            const scrollbarHeight = 40;
            scrollbar.style.height = scrollbarHeight + 'px';

            const scrollPercentage = scrollTop / (contentHeight - containerHeight);
            const maxTop = containerHeight - scrollbarHeight;
            scrollbar.style.top = (scrollPercentage * maxTop) + 'px';
        }

        container.addEventListener('scroll', updateScrollbar);
        window.addEventListener('resize', updateScrollbar);

        updateScrollbar();
    });
}

function initFilterToggles() {
    const filterRows = document.querySelectorAll('.filter-quantity__row');
    
    filterRows.forEach(row => {
        const header = row.querySelector('.filter-quantity__row__header');
        const arrow = row.querySelector('.filter-arrow');
        const wrapper = row.querySelector('.filter-quantity__wrapper');

        if (!wrapper) {
            return;
        }
        if (!row.classList.contains('collapsed') && !row.classList.contains('expanded')) {
            row.classList.add('expanded');
        }
        
        header.addEventListener('click', function() {
            const isCollapsed = row.classList.contains('collapsed');
            
            if (isCollapsed) {
                row.classList.remove('collapsed');
                row.classList.add('expanded');
                setTimeout(initFilterScrollbars, 10);
            } else {
                row.classList.remove('expanded');
                row.classList.add('collapsed');
            }
        });
    });
}

function initFilterScrollbars() {
    const scrollableContainers = document.querySelectorAll('.filter-quantity__scrollable');
    
    scrollableContainers.forEach(container => {
        const scrollbar = container.parentElement.querySelector('.filter-quantity__scrollbar');
        
        if (!scrollbar) return;
        
        function updateScrollbar() {
            const containerHeight = container.clientHeight;
            const contentHeight = container.scrollHeight;
            const scrollTop = container.scrollTop;

            if (contentHeight <= containerHeight) {
                scrollbar.style.display = 'none';
                return;
            } else {
                scrollbar.style.display = 'block';
            }

            const scrollbarHeight = 160;
            scrollbar.style.height = scrollbarHeight + 'px';

            const scrollPercentage = scrollTop / (contentHeight - containerHeight);
            const maxTop = containerHeight - scrollbarHeight;
            scrollbar.style.top = (scrollPercentage * maxTop) + 'px';
        }

        container.addEventListener('scroll', updateScrollbar);
        window.addEventListener('resize', updateScrollbar);

        updateScrollbar();
    });
}

function initMobileMenu() {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!burger || !mobileMenu) return;
    
    burger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');

        const lines = burger.querySelectorAll('.burger-line');
        if (mobileMenu.classList.contains('active')) {
            lines[0].classList.add('burger-line__cross');
            lines[1].classList.add('burger-line__cross');
            lines[2].classList.add('burger-line__cross');
        } else {
            lines[0].classList.remove('burger-line__cross');
            lines[1].classList.remove('burger-line__cross');
            lines[2].classList.remove('burger-line__cross');
        }
    });
    
    document.addEventListener('click', function(event) {
        if (!burger.contains(event.target) && !mobileMenu.contains(event.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            const lines = burger.querySelectorAll('.burger-line');
            lines[0].classList.remove('burger-line__cross');
            lines[1].classList.remove('burger-line__cross');
            lines[2].classList.remove('burger-line__cross');
        }
    });
}

function initSorting() {
    const sortElements = document.querySelectorAll('.page-catalog__main__right__controls__sort span');
    
    sortElements.forEach(element => {
        element.addEventListener('click', function() {
            sortElements.forEach(el => el.classList.remove('active'));
            this.classList.add('active');

            console.log('Сортировка по:', this.textContent);
        });
    });
}

function initViewToggle() {
    const wideView = document.querySelector('.page-catalog__main__right__controls__type-view__wide');
    const tileView = document.querySelector('.page-catalog__main__right__controls__type-view__tile');
    const productsContainer = document.querySelector('.page-catalog__main__right__products');
    
    if (!wideView || !tileView || !productsContainer) return;
    
    wideView.addEventListener('click', function() {
        wideView.classList.add('active');
        tileView.classList.remove('active');
        productsContainer.classList.remove('tile-view');
        productsContainer.classList.add('wide-view');
    });
    
    tileView.addEventListener('click', function() {
        tileView.classList.add('active');
        wideView.classList.remove('active');
        productsContainer.classList.remove('wide-view');
        productsContainer.classList.add('tile-view');
    });
}

function initPagination() {
    const paginationItems = document.querySelectorAll('.pagination__item');
    const prevBtn = document.querySelector('.pagination__item__back');
    const nextBtn = document.querySelector('.pagination__item__next');

    function getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('page')) || 1;
    }
    
    let currentPage = getCurrentPage();
    
    function setActivePage(pageNumber) {
        paginationItems.forEach(item => {
            const itemPage = parseInt(item.textContent);
            if (itemPage === pageNumber) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        currentPage = pageNumber;
        
        const url = new URL(window.location);
        url.searchParams.set('page', pageNumber);
        window.history.pushState({}, '', url);
        
        console.log('Переход на страницу:', pageNumber);
    }

    paginationItems.forEach(item => {
        if (item.textContent !== '...') {
            item.addEventListener('click', function() {
                const pageNumber = parseInt(this.textContent);
                if (pageNumber !== currentPage) {
                    setActivePage(pageNumber);
                } else {
                    console.log('Вы уже на странице', pageNumber);
                }
            });
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                setActivePage(currentPage - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < 15) {
                setActivePage(currentPage + 1);
            }
        });
    }
    
    setActivePage(currentPage);
    
    window.addEventListener('popstate', function() {
        const newPage = getCurrentPage();
        setActivePage(newPage);
    });
}

function initAddToCart() {
    const addToCartButtons = document.querySelectorAll('.product-card__button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-card__title').textContent;
            const productPrice = productCard.querySelector('.product-card__price__block__price')?.textContent || 
                               productCard.querySelector('.product-card__price__block__empty-price')?.textContent;
            
            console.log('Добавлен товар:', {
                title: productTitle,
                price: productPrice
            });

            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Добавлено!';
            this.style.backgroundColor = '#4CAF50';
            this.style.borderColor = '#4CAF50';
            
            setTimeout(() => {
                this.querySelector('span').textContent = originalText;
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }, 2000);
        });
    });
}

function initPriceFilter() {
    const minInput = document.querySelector('.filter-quantity__min');
    const maxInput = document.querySelector('.filter-quantity__max');
    const priceRange = document.querySelector('.price-range');
    
    if (!priceRange) return;

    const sliderTrack = document.createElement('div');
    sliderTrack.className = 'slider-track';
    
    const sliderRange = document.createElement('div');
    sliderRange.className = 'slider-range';
    
    const minThumb = document.createElement('div');
    minThumb.className = 'slider-thumb min-thumb';
    
    const maxThumb = document.createElement('div');
    maxThumb.className = 'slider-thumb max-thumb';
    
    sliderTrack.appendChild(sliderRange);
    sliderTrack.appendChild(minThumb);
    sliderTrack.appendChild(maxThumb);
    priceRange.appendChild(sliderTrack);

    const minPrice = 0;
    const maxPrice = 75000;
    let currentMin = minPrice;
    let currentMax = maxPrice;

    function updateSlider() {
        const minPercent = ((currentMin - minPrice) / (maxPrice - minPrice)) * 100;
        const maxPercent = ((currentMax - minPrice) / (maxPrice - minPrice)) * 100;
        
        sliderRange.style.left = minPercent + '%';
        sliderRange.style.width = (maxPercent - minPercent) + '%';
        
        minThumb.style.left = minPercent + '%';
        maxThumb.style.left = maxPercent + '%';
        
        if (minInput) minInput.value = currentMin;
        if (maxInput) maxInput.value = currentMax;
    }

    function setMinValue(value) {
        currentMin = Math.min(Math.max(value, minPrice), currentMax - 1000);
        updateSlider();
    }

    function setMaxValue(value) {
        currentMax = Math.max(Math.min(value, maxPrice), currentMin + 1000);
        updateSlider();
    }

    function setupDrag(thumb, setValue) {
        thumb.addEventListener('mousedown', function(e) {
            e.preventDefault();
            const sliderRect = sliderTrack.getBoundingClientRect();
            const startX = e.clientX;
            const startLeft = parseFloat(thumb.style.left) || (thumb.classList.contains('min-thumb') ? 0 : 100);

            function onMouseMove(e) {
                const deltaX = e.clientX - startX;
                const deltaPercent = (deltaX / sliderRect.width) * 100;
                let newPercent = startLeft + deltaPercent;
                newPercent = Math.min(Math.max(newPercent, 0), 100);
                
                const newValue = minPrice + (newPercent / 100) * (maxPrice - minPrice);
                setValue(Math.round(newValue));
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    setupDrag(minThumb, setMinValue);
    setupDrag(maxThumb, setMaxValue);

    if (minInput) {
        minInput.addEventListener('change', function() {
            setMinValue(parseInt(this.value) || minPrice);
        });
    }

    if (maxInput) {
        maxInput.addEventListener('change', function() {
            setMaxValue(parseInt(this.value) || maxPrice);
        });
    }

    updateSlider();
}

function initAll() {
    initMainFilterScrollbar();
    initFilterToggles();
    initFilterScrollbars();
    initMobileMenu();
    initSorting();
    initViewToggle();
    initPagination();
    initAddToCart();
    initPriceFilter();
    initFilterCheckboxes();
    initFilterButtons();
    
    console.log('Все функции инициализированы');
}

function initFilterCheckboxes() {
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const filterName = this.getAttribute('name');
            const value = this.closest('.filter-option').textContent.trim();
            const isChecked = this.checked;
            
            console.log('Фильтр изменен:', {
                filter: filterName,
                value: value,
                checked: isChecked
            });

        });
    });
}

function initFilterButtons() {
    const showButton = document.querySelector('.button--show');
    const resetButton = document.querySelector('.button--reset');
    
    if (showButton) {
        showButton.addEventListener('click', function() {

            console.log('Применить фильтры');
        });
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {

            const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            const priceInputs = document.querySelectorAll('.filter-quantity__min, .filter-quantity__max');
            priceInputs.forEach(input => {
                input.value = '';
            });
            
            console.log('Фильтры сброшены');
        });
    }
}

function initAll() {
    initMainFilterScrollbar();
    initFilterToggles();
    initFilterScrollbars();
    initMobileMenu();
    initSorting();
    initViewToggle();
    initPagination();
    initAddToCart();
    initPriceFilter();
    initFilterCheckboxes();
    initFilterButtons();
    
    console.log('Все функции инициализированы');
}

document.addEventListener('DOMContentLoaded', function() {
    initAll();
});

window.addEventListener('resize', function() {
    setTimeout(() => {
        initMainFilterScrollbar();
        initFilterScrollbars();
    }, 100);
});

function reinitFilters() {
    initFilterToggles();
    initFilterScrollbars();
    initFilterCheckboxes();
    initFilterButtons();
}

window.reinitFilters = reinitFilters;
window.initAll = initAll;