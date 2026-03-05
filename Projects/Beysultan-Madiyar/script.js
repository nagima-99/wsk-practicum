document.addEventListener('DOMContentLoaded', () => {

    const productsDB = [
        {
            id: 1,
            name: "Logitech G Pro X Superlight",
            category: "mouse",
            price: 74990,
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=600",
            desc: "Самая легкая беспроводная мышь профессионального уровня. Вес менее 63г. Сенсор HERO 25K для субмикронной точности.",
            specs: { "Сенсор": "HERO 25K", "Вес": "63г", "Тип": "Беспроводная", "DPI": "25600" }
        },
        {
            id: 2,
            name: "Keychron Q1 Pro",
            category: "keyboard",
            price: 104990,
            image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600",
            desc: "Полностью алюминиевая механика с поддержкой QMK/VIA. Премиальный опыт печати с gasket mount и PBT кейкапами.",
            specs: { "Материал": "Алюминий", "Свитчи": "Gateron Pro Red", "Раскладка": "75%", "Hot-Swap": "Да" }
        },
        {
            id: 3,
            name: "HyperX Cloud Alpha Wireless",
            category: "headset",
            price: 85990,
            image: "https://hyperx.ru/hyperx/product/hx-product-headset-alpha-s-black-6-zm-lg.jpg",
            desc: "Огромное время работы до 300 часов. Двухкамерные драйверы отделяют бас от средних и высоких частот.",
            specs: { "Батарея": "300 часов", "Аудио": "DTS Headphone:X", "Драйвер": "50мм", "Вес": "335г" }
        },
        {
            id: 4,
            name: "Razer BlackWidow V4",
            category: "keyboard",
            price: 80990,
            image: "https://4pda.to/s/as6yvxSfgTd3Hwxrcsz0W5GvyQDgp.jpg",
            desc: "Механика со свитчами Razer Green. Подсветка под каждую клавишу с RGB и нижним свечением.",
            specs: { "Свитчи": "Razer Green", "Макросы": "8 клавиш", "Частота": "8000 Гц", "Подставка": "Магнитная" }
        },
        {
            id: 5,
            name: "Shure SM7B",
            category: "mic",
            price: 215990,
            image: "https://photobuy.uz/wp-content/uploads/2023/11/shure-sm7b.jpg",
            desc: "Легендарный динамический микрофон для стримов. Теплое и гладкое воспроизведение голоса студийного качества.",
            specs: { "Тип": "Динамический", "Разъем": "XLR", "Диапазон": "50-20000 Гц", "Диаграмма": "Кардиоида" }
        },
        {
            id: 6,
            name: "SteelSeries Aerox 3",
            category: "mouse",
            price: 37990,
            image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=600",
            desc: "Сверхлегкая мышь с перфорацией и защитой IP54. Потрясающая 3-зонная RGB-подсветка.",
            specs: { "Вес": "57г", "Защита": "IP54", "Сенсор": "TrueMove Core", "Связь": "2.4 ГГц / BT" }
        },
        {
            id: 7,
            name: "Audio-Technica AT2020",
            category: "mic",
            price: 53990,
            image: "https://soundref.com/wp-content/uploads/2023/07/At_2020-09-1024x724.gif",
            desc: "Стандарт доступных студийных конденсаторов. Высокий SPL и широкий динамический диапазон.",
            specs: { "Тип": "Конденсаторный", "Интерфейс": "USB", "Шум": "20 дБ", "Стойка": "В комплекте" }
        },
        {
            id: 8,
            name: "Logitech G733 Lightspeed",
            category: "headset",
            price: 64990,
            image: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=600",
            desc: "Дизайн для комфорта и стиля. Беспроводная гарнитура с фронтальной RGB и фильтрами Blue VO!CE.",
            specs: { "Цвета": "4 варианта", "Вес": "278г", "Фильтры": "Blue VO!CE", "Радиус": "20 м" }
        }
    ];

    let cart = JSON.parse(localStorage.getItem('cybershop_cart')) || [];
    const grid = document.getElementById('products-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProducts(filter = 'all') {
        grid.innerHTML = '';
        grid.style.opacity = '0';
        
        const filtered = filter === 'all' ? productsDB : productsDB.filter(p => p.category === filter);
        
        setTimeout(() => {
            filtered.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.onclick = () => openProductModal(product.id);
                card.innerHTML = `
                    <div class="card-img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="card-price">${formatPrice(product.price)}</p>
                        <button class="card-btn">Подробнее</button>
                    </div>
                `;
                grid.appendChild(card);
            });
            grid.style.opacity = '1';
        }, 200);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.category);
        });
    });

    const modal = document.getElementById('product-modal');
    window.openProductModal = (id) => {
        const product = productsDB.find(p => p.id === id);
        
        modal.querySelector('#modal-title').textContent = product.name;
        modal.querySelector('#modal-price').textContent = formatPrice(product.price);
        modal.querySelector('#modal-desc').textContent = product.desc;
        modal.querySelector('#modal-img').src = product.image;

        const specsList = modal.querySelector('#modal-specs');
        specsList.innerHTML = '';
        for (const [key, value] of Object.entries(product.specs)) {
            specsList.innerHTML += `<li><span>${key}</span> <span>${value}</span></li>`;
        }
        
        const addBtn = modal.querySelector('#modal-add-btn');
        addBtn.onclick = () => {
            addToCart(product);
            closeModal(modal);
        };

        openModal(modal);
    };

    function openModal(el) {
        el.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(el) {
        el.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === el || e.target.classList.contains('modal-close')) {
                closeModal(el.closest('.modal-backdrop'));
            }
        });
    });

    modal.querySelectorAll('.tab-link').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            modal.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
            modal.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            modal.querySelector(`#tab-${target}`).classList.add('active');
        });
    });

    const videoModal = document.getElementById('video-modal');
    const videoPlaceholder = document.getElementById('video-placeholder');
    if(videoPlaceholder) {
        videoPlaceholder.onclick = () => openModal(videoModal);
    }

    function updateCart() {
        const cartCount = document.getElementById('cart-count');
        const cartItemsWrapper = document.getElementById('cart-items-wrapper');
        const cartTotalPrice = document.getElementById('cart-total-price');
        const cartTotalCountHeader = document.getElementById('cart-total-count');
        
        cartCount.textContent = cart.length;
        cartTotalCountHeader.textContent = `(${cart.length})`;
        
        cartItemsWrapper.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsWrapper.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        } else {
            cart.forEach(item => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-actions">
                            <span class="cart-price">${formatPrice(item.price)}</span>
                            <button class="remove-item-btn">Удалить</button>
                        </div>
                    </div>
                `;
                itemEl.querySelector('.remove-item-btn').onclick = () => removeItem(item.id);
                cartItemsWrapper.appendChild(itemEl);
            });
        }
        cartTotalPrice.textContent = formatPrice(total);
        localStorage.setItem('cybershop_cart', JSON.stringify(cart));
    }
    
    function addToCart(product) {
        if(cart.some(item => item.id === product.id)) {
            showToast('Товар уже в корзине', 'error');
            return;
        }
        cart.push(product);
        updateCart();
        showToast('Добавлено в корзину', 'success');
        
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    }

    window.removeItem = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    };
    
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartTrigger = document.getElementById('cart-trigger');
    const closeCartBtn = document.querySelector('.close-cart');

    if(cartTrigger) {
        cartTrigger.onclick = () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
        };
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    if(closeCartBtn) closeCartBtn.onclick = closeCart;
    if(cartOverlay) cartOverlay.onclick = closeCart;

    document.getElementById('checkout-btn').onclick = () => {
        if(cart.length === 0) return showToast('Корзина пуста', 'error');
        showToast('Заказ оформлен!', 'success');
        cart = [];
        updateCart();
        closeCart();
    };

    function formatPrice(p) {
        return p.toLocaleString('kk-KZ') + ' ₸';
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<h4>${message}</h4>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if(document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav-menu');
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    document.getElementById('scroll-to-catalog').onclick = () => {
        document.getElementById('trends').scrollIntoView();
    };

    renderProducts();
    updateCart();
});