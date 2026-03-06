// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize variables
  const hamburger = document.querySelector(".hamburger")
  const mobileMenu = document.querySelector(".mobile-menu")
  const loginBtn = document.getElementById("login-btn")
  const cartBtn = document.getElementById("cart-btn")
  const loginModal = document.getElementById("login-modal")
  const registerModal = document.getElementById("register-modal")
  const cartModal = document.getElementById("cart-modal")
  const quickViewModal = document.getElementById("quick-view-modal")
  const authRequiredModal = document.getElementById("auth-required-modal")
  const helpFaqModal = document.getElementById("help-faq-modal")
  const helpDeliveryModal = document.getElementById("help-delivery-modal")
  const helpReturnsModal = document.getElementById("help-returns-modal")
  const helpSizesModal = document.getElementById("help-sizes-modal")
  const aboutCareersModal = document.getElementById("about-careers-modal")
  const aboutResponsibilityModal = document.getElementById("about-responsibility-modal")
  const aboutContactModal = document.getElementById("about-contact-modal")
  const closeModalBtns = document.querySelectorAll(".close-modal")
  const showRegisterBtn = document.getElementById("show-register")
  const showLoginBtn = document.getElementById("show-login")
  const showHelpFaqBtn = document.getElementById("show-help-faq")
  const showHelpDeliveryBtn = document.getElementById("show-help-delivery")
  const showHelpReturnsBtn = document.getElementById("show-help-returns")
  const showHelpSizesBtn = document.getElementById("show-help-sizes")
  const showAboutCareersBtn = document.getElementById("show-about-careers")
  const showAboutResponsibilityBtn = document.getElementById("show-about-responsibility")
  const showAboutContactBtn = document.getElementById("show-about-contact")
  const backToTopBtn = document.getElementById("back-to-top")
  const quickViewBtns = document.querySelectorAll(".quick-view")
  const addToCartBtns = document.querySelectorAll(".add-to-cart")
  const decreaseQuantityBtn = document.getElementById("decrease-quantity")
  const increaseQuantityBtn = document.getElementById("increase-quantity")
  const productQuantityInput = document.getElementById("product-quantity")
  const quickAddToCartBtn = document.getElementById("quick-add-to-cart")
  const checkoutBtn = document.getElementById("checkout-btn")
  const sizeBtns = document.querySelectorAll(".size-btn")
  const newsletterForm = document.getElementById("newsletter-form")
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")
  const contactForm = document.getElementById("contact-form")
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotalElement = document.getElementById("cart-total")
  const cartCountElement = document.querySelector(".cart-count")
  const navLinks = document.querySelectorAll(".nav-links a")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
  const searchBox = document.querySelector(".search-box input")
  const searchBtn = document.querySelector(".search-btn")
  const togglePasswordBtns = document.querySelectorAll(".toggle-password")
  const authLoginBtn = document.getElementById("auth-login-btn")
  const authRegisterBtn = document.getElementById("auth-register-btn")
  const authStatusElement = document.querySelector(".auth-status")
  const socialBtns = document.querySelectorAll(".social-btn")
  const countdownDays = document.getElementById("countdown-days")
  const countdownHours = document.getElementById("countdown-hours")
  const countdownMinutes = document.getElementById("countdown-minutes")
  const countdownSeconds = document.getElementById("countdown-seconds")
  const productDescriptionElement = document.querySelector(".product-description")

  // Cart array to store items
  let cart = []
  let currentProduct = null
  let isAuthenticated = false
  let currentUser = null

  // База данных описаний товаров
  const productDescriptions = {
    // Популярные товары
    1: "Спортивная футболка из дышащего материала, отводящего влагу. Идеальна для тренировок любой интенсивности. Эластичная ткань обеспечивает свободу движений.",
    2: "Беговые кроссовки с амортизирующей подошвой и поддержкой стопы. Сетчатый верх обеспечивает вентиляцию, а прочная подошва гарантирует долговечность.",
    3: "Йога-штаны из эластичного материала, обеспечивающего комфорт при любых асанах. Высокая талия и плотная посадка для максимального удобства.",
    4: "Спортивный бюстгальтер с высокой поддержкой для интенсивных тренировок. Широкие лямки снижают нагрузку на плечи, а дышащий материал обеспечивает комфорт.",

    // Мужская коллекция
    5: "Мужские тренировочные шорты с карманами на молнии. Легкий, быстросохнущий материал идеален для бега и тренажерного зала.",
    6: "Мужская компрессионная футболка улучшает кровообращение и поддерживает мышцы во время тренировок. Плоские швы предотвращают натирание.",
    7: "Мужская беговая куртка с ветрозащитным и водоотталкивающим покрытием. Светоотражающие элементы обеспечивают видимость в темное время суток.",
    8: "Мужские тренировочные кроссовки с усиленной поддержкой стопы и амортизацией. Подходят для кроссфита и силовых тренировок.",
    17: "Мужские спортивные очки с защитой от УФ-лучей и небьющимися линзами. Легкая и прочная оправа не скользит даже при интенсивных тренировках.",
    18: "Мужская толстовка с капюшоном из мягкого флиса. Идеальна для разминки и восстановления после тренировки.",
    19: "Мужская ветровка с вентиляционными вставками и регулируемым капюшоном. Компактно складывается в карман.",
    33: "Мужская спортивная майка из технологичной ткани, быстро отводящей влагу. Свободный крой обеспечивает максимальную свободу движений.",

    // Женская коллекция
    9: "Женские леггинсы с высокой талией и компрессионным эффектом. Плотная ткань не просвечивает при наклонах и приседаниях.",
    10: "Женский спортивный топ со средней поддержкой для йоги и пилатеса. Мягкие съемные чашечки и эластичный нижний пояс.",
    11: "Женские беговые шорты с внутренним карманом для ключей и встроенными трусиками. Легкий материал не сковывает движения.",
    12: "Женские фитнес-кроссовки с гибкой подошвой для тренировок в зале. Дышащий верх и амортизирующая стелька обеспечивают комфорт.",
    20: "Женская спортивная куртка с теплоизоляцией и защитой от ветра. Приталенный силуэт и удлиненная спинка.",
    21: "Женская толстовка из органического хлопка с начесом. Свободный крой и удлиненный силуэт для комфорта после тренировок.",
    22: "Женская спортивная футболка с V-образным вырезом и удлиненной спинкой. Легкий, дышащий материал не сковывает движения.",
    34: "Женский спортивный костюм из эластичного материала. Куртка с высоким воротником и брюки с эластичным поясом создают стильный образ для тренировок и отдыха.",

    // Аксессуары
    13: "Спортивная бутылка для воды объемом 750 мл с удобным носиком и шкалой для контроля потребления жидкости. Не содержит BPA.",
    14: "Фитнес-трекер с мониторингом пульса, шагов и качества сна. Водонепроницаемый корпус и длительное время работы от одного заряда.",
    15: "Спортивная сумка с отделением для обуви и влажных вещей. Прочный материал и регулируемый плечевой ремень.",
    16: "Коврик для йоги из экологичного материала с нескользящей поверхностью. Оптимальная толщина для комфорта и устойчивости.",
    23: "Спортивные наушники с защитой от пота и влаги. Надежная фиксация и отличное качество звука для мотивирующих тренировок.",
    24: "Спортивные перчатки с защитой ладоней и вентиляцией. Предотвращают мозоли и улучшают сцепление с тренажерами.",
    25: "Спортивный рюкзак с отделением для ноутбука и системой вентиляции спины. Множество карманов для организации вещей.",
    35: "Спортивный шейкер с металлическим шариком для идеального смешивания протеиновых коктейлей. Герметичная крышка предотвращает протекание.",

    // Скидки
    26: "Мужские спортивные кепки из быстросохнущего материала для помощи от солнца.",
    27: "Женские зиминий набор для тепла и чтобы небыло так тяжело во время марафона и больше заметности .",
    28: "Нарукавник помогает мышцам и сухожилиям быстрее согреваться и восстанавливаться.",
    29: "Укрепление костей очень сильно во время тренировак не повредить сами и кисти и с помощью них будет гораздо легче выполнять упражнения.",
    30: "Мужская беговая куртка с отражающими элементами и вентиляционными вставками. Защищает от ветра и легкого дождя.",
    31: "Женский спортивный топ с перекрестными лямками на спине. Средняя поддержка и мягкие съемные чашечки для комфорта.",
    32: "Спортивные наушники с технологией шумоподавления и защитой от пота. До 8 часов работы от одного заряда.",
    36: "Женский спортивный костюм из дышащего материала. Куртка с карманами на молнии и брюки с эластичным поясом.",

    // Новые товары со скидками
    37: "Мужские компрессионные тайтсы для бега в холодную погоду. Термоизоляция и эластичность обеспечивают комфорт и свободу движений.",
    38: "Женский утепленный жилет с легким наполнителем. Отлично сохраняет тепло, не ограничивая движений рук.",
    39: "Спортивный рюкзак-гидратор с встроенной системой для питья. Идеален для длительных пробежек и велосипедных прогулок.",
    40: "Умные спортивные весы с анализом состава тела. Синхронизируются с приложением для отслеживания прогресса.",
    41: "Комплект эспандеров разного уровня сопротивления для домашних тренировок. Компактны и эффективны для проработки всех групп мышц.",
    42: "Спортивные солнцезащитные очки с поляризованными линзами. Легкая оправа надежно фиксируется и не скользит во время активности.",
    43: "Мужская спортивная сумка-трансформер. Может использоваться как рюкзак или как сумка через плечо.",
    44: "Женский спортивный бра-топ с модным принтом. Средняя поддержка и стильный дизайн для тренировок и повседневной носки.",
  }

  // Данные о новых товарах со скидками
  const newSaleProducts = [
    {
      id: "37",
      name: "Мужские компрессионные тайтсы",
      price: 12600,
      originalPrice: 18000,
      discount: 30,
      image: "https://cdn1.ozone.ru/s3/multimedia-3/6011280999.jpg",
    },
    {
      id: "38",
      name: "Женский утепленный жилет",
      price: 15400,
      originalPrice: 22000,
      discount: 30,
      image: "https://a.lmcdn.ru/product/T/R/TR795EWDAR82_1.jpg",
    },
    {
      id: "39",
      name: "Спортивный рюкзак-гидратор",
      price: 13650,
      originalPrice: 21000,
      discount: 35,
      image: "https://ir.ozone.ru/s3/multimedia-w/c1000/6190519160.jpg",
    },
    {
      id: "40",
      name: "Умные спортивные весы",
      price: 14000,
      originalPrice: 28000,
      discount: 50,
      image: "https://avatars.mds.yandex.net/i?id=6d02da33ec22a7151180c73acdbd253b_l-5326430-images-thumbs&n=13",
    },
    {
      id: "41",
      name: "Комплект эспандеров",
      price: 5600,
      originalPrice: 8000,
      discount: 30,
      image: "https://avatars.mds.yandex.net/get-mpic/4012371/img_id6028329707695955815.jpeg/orig",
    },
    {
      id: "42",
      name: "Спортивные солнцезащитные очки",
      price: 9100,
      originalPrice: 13000,
      discount: 30,
      image: "https://static.insales-cdn.com/images/products/1/298/193257770/700055.jpg",
    },
    {
      id: "43",
      name: "Мужская сумка-трансформер",
      price: 16800,
      originalPrice: 24000,
      discount: 30,
      image: "https://cdn.100sp.ru/pictures/167182255",
    },
    {
      id: "44",
      name: "Женский спортивный бра-топ",
      price: 6300,
      originalPrice: 9000,
      discount: 30,
      image: "https://avatars.mds.yandex.net/i?id=4e950635a73f18aeb7cbf4949e6bd6f47ee1f853-9233495-images-thumbs&n=13",
    },
  ]

  // Функция для добавления новых товаров со скидками
  function addNewSaleProducts() {
    const saleProductGrid = document.querySelector("#sale .product-grid")

    // Если раздел скидок найден
    if (saleProductGrid) {
      // Удаляем существующие товары
      saleProductGrid.innerHTML = ""

      // Добавляем все товары со скидками (старые и новые)
      const allSaleProducts = [
        {
          id: "26",
          name: "Мужская кепка",
          price: 4175,
          originalPrice: 7250,
          discount: 30,
          image: "https://avatars.mds.yandex.net/i?id=90511ebf7b01c03debbec2549a940901_l-12936542-images-thumbs&n=13",
        },
        {
          id: "27",
          name: "Женский зимний набор",
          price: 20250,
          originalPrice: 27000,
          discount: 25,
          image:
            "https://avatars.mds.yandex.net/i?id=8a66efe7fe6db9a013935fcd81c3ec7939bdfde0-9229366-images-thumbs&ref=rim&n=33&w=250&h=250",
        },
        {
          id: "28",
          name: "Нарукавник",
          price: 6750,
          originalPrice: 11250,
          discount: 40,
          image:
            "https://ir.ozone.ru/s3/multimedia-r/c1000/6028848915.jpg",
        },
        {
          id: "29",
          name: "Укрепление кистей",
          price: 4400,
          originalPrice: 8000,
          discount: 20,
          image: "https://ae01.alicdn.com/kf/HTB1EO2ymH5YBuNjSspoq6zeNFXaR/1PCS-Adjustable-Wrist-Support-Brace-Wristband-Men-and-Women-Gym-Wrestle-Professional-Sports-Protection-Wrist-Bracelet.jpg",
        },
        ...newSaleProducts, // Добавляем новые товары
      ]

      // Создаем HTML для каждого товара
      allSaleProducts.forEach((product) => {
        const productHTML = `
          <div class="product-card">
            <div class="product-image">
              <div class="discount-badge">-${product.discount}%</div>
              <img src="${product.image}" alt="${product.name}">
              <div class="product-overlay">
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-original-price="${product.originalPrice}">В корзину</button>
                <button class="quick-view">Быстрый просмотр</button>
              </div>
            </div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <p class="product-price"><span class="old-price">${product.originalPrice.toLocaleString()} ₸</span> ${product.price.toLocaleString()} ₸</p>
            </div>
          </div>
        `

        saleProductGrid.innerHTML += productHTML
      })

      // Добавляем обработчики событий для новых кнопок
      const newQuickViewBtns = saleProductGrid.querySelectorAll(".quick-view")
      const newAddToCartBtns = saleProductGrid.querySelectorAll(".add-to-cart")

      newQuickViewBtns.forEach((btn) => {
        btn.addEventListener("click", handleQuickView)
      })

      newAddToCartBtns.forEach((btn) => {
        btn.addEventListener("click", handleAddToCart)
      })
    }
  }

  // Функция для обработки клика по кнопке "Быстрый просмотр"
  function handleQuickView() {
    const productCard = this.closest(".product-card")
    const productImage = productCard.querySelector(".product-image img").src
    const productTitle = productCard.querySelector(".product-info h3").textContent
    const productPrice = productCard.querySelector(".product-price").textContent
    const addToCartBtn = productCard.querySelector(".add-to-cart")
    const productId = addToCartBtn.dataset.id

    // Определяем категорию товара
    const isShoes = productTitle.toLowerCase().includes("кроссовки") || productTitle.toLowerCase().includes("обувь")
    const isAccessory =
      productCard.closest("#accessories") !== null ||
      productTitle.toLowerCase().includes("бутылка") ||
      productTitle.toLowerCase().includes("трекер") ||
      productTitle.toLowerCase().includes("наушники") ||
      productTitle.toLowerCase().includes("очки") ||
      productTitle.toLowerCase().includes("коврик") ||
      productTitle.toLowerCase().includes("шейкер") ||
      productTitle.toLowerCase().includes("весы") ||
      productTitle.toLowerCase().includes("эспандер")

    // Set current product
    currentProduct = {
      id: addToCartBtn.dataset.id,
      name: addToCartBtn.dataset.name,
      price: Number.parseFloat(addToCartBtn.dataset.price),
      image: productImage,
      isShoes: isShoes,
      isAccessory: isAccessory,
    }

    // Update quick view modal
    document.getElementById("quick-view-image").src = productImage
    document.getElementById("quick-view-title").textContent = productTitle
    document.getElementById("quick-view-price").textContent = productPrice

    // Обновляем описание товара
    if (productDescriptionElement && productDescriptions[productId]) {
      productDescriptionElement.textContent = productDescriptions[productId]
    } else if (productDescriptionElement) {
      productDescriptionElement.textContent =
        "Высококачественная спортивная одежда, разработанная для максимального комфорта и производительности. Наши изделия сочетают в себе современные технологии и стильный дизайн."
    }

    // Reset quantity
    productQuantityInput.value = 1

    // Обновляем отображение размеров в зависимости от типа товара
    const sizeSelector = document.querySelector(".size-selector")
    const quantitySelector = document.querySelector(".quantity-selector")

    if (isAccessory) {
      // Для аксессуаров скрываем выбор размера и показываем только количество
      if (sizeSelector) sizeSelector.parentElement.style.display = "none"
      if (quantitySelector) quantitySelector.style.display = "block"
    } else {
      // Для одежды и обуви показываем выбор размера
      if (sizeSelector) {
        sizeSelector.parentElement.style.display = "block"

        // Очищаем текущие размеры
        sizeSelector.innerHTML = ""

        if (isShoes) {
          // Для обуви показываем числовые размеры
          ;[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].forEach((size) => {
            const btn = document.createElement("button")
            btn.className = "size-btn"
            btn.textContent = size
            sizeSelector.appendChild(btn)
          })
        } else {
          // Для одежды стандартные размеры
          ;["S", "M", "L", "XL"].forEach((size) => {
            const btn = document.createElement("button")
            btn.className = "size-btn"
            btn.textContent = size
            sizeSelector.appendChild(btn)
          })
        }

        // Добавляем обработчики событий для новых кнопок размера
        const newSizeBtns = sizeSelector.querySelectorAll(".size-btn")
        newSizeBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            newSizeBtns.forEach((b) => b.classList.remove("active"))
            this.classList.add("active")
          })
        })

        // Активируем первый размер по умолчанию
        if (newSizeBtns.length > 0) {
          newSizeBtns[0].classList.add("active")
        }
      }

      if (quantitySelector) quantitySelector.style.display = "block"
    }

    openModal(quickViewModal)
  }

  // Функция для обработки клика по кнопке "В корзину"
  function handleAddToCart() {
    if (!isAuthenticated) {
      openModal(authRequiredModal)
      return
    }

    const id = this.dataset.id
    const name = this.dataset.name
    const price = Number.parseFloat(this.dataset.price)
    const image = this.closest(".product-card").querySelector(".product-image img").src

    // Определяем категорию товара
    const productCard = this.closest(".product-card")
    const productTitle = productCard.querySelector(".product-info h3").textContent
    const isShoes = productTitle.toLowerCase().includes("кроссовки") || productTitle.toLowerCase().includes("обувь")
    const isAccessory =
      productCard.closest("#accessories") !== null ||
      productTitle.toLowerCase().includes("бутылка") ||
      productTitle.toLowerCase().includes("трекер") ||
      productTitle.toLowerCase().includes("наушники") ||
      productTitle.toLowerCase().includes("очки") ||
      productTitle.toLowerCase().includes("коврик") ||
      productTitle.toLowerCase().includes("шейкер") ||
      productTitle.toLowerCase().includes("весы") ||
      productTitle.toLowerCase().includes("эспандер")

    // Для аксессуаров не указываем размер
    const size = isAccessory ? "" : isShoes ? "39" : "M" // Размер по умолчанию

    addToCart({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1,
      size: size,
      isShoes: isShoes,
      isAccessory: isAccessory,
    })

    updateCartDisplay()
  }

  // Set end date for countdown (7 days from now)
  const countdownEndDate = new Date()
  countdownEndDate.setDate(countdownEndDate.getDate() + 7)

  // Update countdown timer
  function updateCountdown() {
    const now = new Date()
    const distance = countdownEndDate - now

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result
    countdownDays.textContent = days.toString().padStart(2, "0")
    countdownHours.textContent = hours.toString().padStart(2, "0")
    countdownMinutes.textContent = minutes.toString().padStart(2, "0")
    countdownSeconds.textContent = seconds.toString().padStart(2, "0")

    // If the countdown is finished, display expired message
    if (distance < 0) {
      clearInterval(countdownInterval)
      countdownDays.textContent = "00"
      countdownHours.textContent = "00"
      countdownMinutes.textContent = "00"
      countdownSeconds.textContent = "00"
    }
  }

  // Update countdown every second
  updateCountdown()
  const countdownInterval = setInterval(updateCountdown, 1000)

  // Toggle password visibility
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })

  // Social login functionality
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const platform = this.textContent.trim()
      simulateSocialLogin(platform)
    })
  })

  // Simulate social login
  function simulateSocialLogin(platform) {
    showNotification(`Выполняется вход через ${platform}...`, "info")

    setTimeout(() => {
      const randomUser = {
        name: "Пользователь " + Math.floor(Math.random() * 1000),
        email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        id: Math.floor(Math.random() * 10000),
      }

      loginUser(randomUser)
      closeAllModals()
      showNotification(`Вы успешно вошли через ${platform}!`, "success")
    }, 1500)
  }

  // Login user
  function loginUser(user) {
    isAuthenticated = true
    currentUser = user
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("currentUser", JSON.stringify(user))
    updateAuthUI()
  }

  // Logout user
  function logoutUser() {
    isAuthenticated = false
    currentUser = null
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("currentUser")
    updateAuthUI()
    cart = []
    localStorage.removeItem("cart")
    updateCartDisplay()
  }

  // Update auth UI
  function updateAuthUI() {
    if (isAuthenticated && currentUser) {
      authStatusElement.textContent = currentUser.name
      loginBtn.innerHTML = `<i class="fas fa-user"></i><span class="auth-status">${currentUser.name}</span>`
      loginBtn.removeEventListener("click", openLoginModal)
      loginBtn.addEventListener("click", showUserMenu)
    } else {
      authStatusElement.textContent = "Войти"
      loginBtn.innerHTML = `<i class="fas fa-user"></i><span class="auth-status">Войти</span>`
      loginBtn.removeEventListener("click", showUserMenu)
      loginBtn.addEventListener("click", openLoginModal)
    }
  }

  // Show user menu
  function showUserMenu() {
    // Проверяем, существует ли уже меню пользователя
    const existingMenu = document.querySelector(".user-menu")
    if (existingMenu) {
      document.body.removeChild(existingMenu)
      return
    }

    const userMenu = document.createElement("div")
    userMenu.className = "user-menu"
    userMenu.innerHTML = `
    <div class="user-menu-item">Профиль</div>
    <div class="user-menu-item">Заказы</div>
    <div class="user-menu-item">Настройки</div>
    <div class="user-menu-item logout">Выйти</div>
  `

    document.body.appendChild(userMenu)

    const rect = loginBtn.getBoundingClientRect()
    userMenu.style.position = "absolute"
    userMenu.style.top = rect.bottom + "px"

    // Улучшаем позиционирование для мобильных устройств
    if (window.innerWidth <= 576) {
      userMenu.style.left = "20px"
      userMenu.style.right = "20px"
      userMenu.style.width = "calc(100% - 40px)"
    } else {
      userMenu.style.right = window.innerWidth - rect.right + "px"
      userMenu.style.minWidth = "150px"
    }

    userMenu.style.backgroundColor = "var(--white-color)"
    userMenu.style.boxShadow = "0 2px 10px var(--shadow-color)"
    userMenu.style.borderRadius = "4px"
    userMenu.style.zIndex = "1001"

    const userMenuItems = userMenu.querySelectorAll(".user-menu-item")
    userMenuItems.forEach((item) => {
      // Увеличиваем размер элементов меню для удобства на мобильных устройствах
      item.style.padding = window.innerWidth <= 576 ? "15px" : "10px 15px"
      item.style.cursor = "pointer"
      item.style.transition = "var(--transition)"
      item.style.fontSize = window.innerWidth <= 576 ? "16px" : "inherit"

      item.addEventListener("mouseover", function () {
        this.style.backgroundColor = "var(--light-color)"
      })

      item.addEventListener("mouseout", function () {
        this.style.backgroundColor = "transparent"
      })
    })

    const logoutItem = userMenu.querySelector(".logout")
    logoutItem.addEventListener("click", () => {
      logoutUser()
      document.body.removeChild(userMenu)
      showNotification("Вы успешно вышли из аккаунта", "success")
    })

    document.addEventListener("click", function closeUserMenu(e) {
      if (!userMenu.contains(e.target) && e.target !== loginBtn) {
        if (document.body.contains(userMenu)) {
          document.body.removeChild(userMenu)
        }
        document.removeEventListener("click", closeUserMenu)
      }
    })
  }

  // Check if user is already logged in
  function checkAuthentication() {
    const savedAuth = localStorage.getItem("isAuthenticated")
    const savedUser = localStorage.getItem("currentUser")

    if (savedAuth === "true" && savedUser) {
      isAuthenticated = true
      currentUser = JSON.parse(savedUser)
      updateAuthUI()
    }
  }

  // Call check authentication on load
  checkAuthentication()

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      mobileMenu.classList.toggle("active")

      // Animate hamburger icon
      const spans = hamburger.querySelectorAll("span")
      if (hamburger.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Добавляем функцию для улучшения работы модальных окон на мобильных устройствах
  function enhanceMobileModals() {
    // Улучшаем модальные окна для мобильных устройств
    const modals = document.querySelectorAll(".modal-content")

    if (window.innerWidth <= 576) {
      modals.forEach((modal) => {
        // Увеличиваем размер кнопки закрытия для удобства на мобильных устройствах
        const closeBtn = modal.querySelector(".close-modal")
        if (closeBtn) {
          closeBtn.style.fontSize = "24px"
          closeBtn.style.padding = "10px"
          closeBtn.style.top = "10px"
          closeBtn.style.right = "10px"
        }

        // Увеличиваем размер шрифта в формах
        const inputs = modal.querySelectorAll("input, textarea")
        inputs.forEach((input) => {
          input.style.fontSize = "16px" // Предотвращает масштабирование на iOS
          input.style.padding = "12px"
        })

        // Увеличиваем размер кнопок в модальных окнах
        const buttons = modal.querySelectorAll(".btn")
        buttons.forEach((button) => {
          button.style.padding = "14px 20px"
          button.style.fontSize = "16px"
        })
      })
    }
  }

  // Вызываем функцию при загрузке страницы и при изменении размера окна
  window.addEventListener("load", enhanceMobileModals)
  window.addEventListener("resize", enhanceMobileModals)

  // Модифицируем функцию openModal для лучшей работы на мобильных устройствах
  function openModal(modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Улучшаем прокрутку на мобильных устройствах
    if (window.innerWidth <= 576) {
      const modalContent = modal.querySelector(".modal-content")
      if (modalContent) {
        // Устанавливаем максимальную высоту для модального окна на мобильных устройствах
        modalContent.style.maxHeight = "90vh"
        modalContent.style.overflowY = "auto"

        // Прокручиваем модальное окно в начало
        setTimeout(() => {
          modalContent.scrollTop = 0
        }, 10)
      }
    }

    // Вызываем функцию для улучшения модальных окон на мобильных устройствах
    enhanceMobileModals()
  }

  function closeModal(modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  function closeAllModals() {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      closeModal(modal)
    })
  }

  // Open login modal function
  function openLoginModal() {
    openModal(loginModal)
  }

  // Event listeners for opening modals
  if (loginBtn) {
    loginBtn.addEventListener("click", openLoginModal)
  }

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      if (isAuthenticated) {
        updateCartDisplay()
        openModal(cartModal)
      } else {
        openModal(authRequiredModal)
      }
    })
  }

  if (authLoginBtn) {
    authLoginBtn.addEventListener("click", () => {
      closeModal(authRequiredModal)
      openModal(loginModal)
    })
  }

  if (authRegisterBtn) {
    authRegisterBtn.addEventListener("click", () => {
      closeModal(authRequiredModal)
      openModal(registerModal)
    })
  }

  if (showRegisterBtn) {
    showRegisterBtn.addEventListener("click", (e) => {
      e.preventDefault()
      closeModal(loginModal)
      openModal(registerModal)
    })
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      closeModal(registerModal)
      openModal(loginModal)
    })
  }

  // Help and About modal buttons
  if (showHelpFaqBtn) {
    showHelpFaqBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(helpFaqModal)
    })
  }

  if (showHelpDeliveryBtn) {
    showHelpDeliveryBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(helpDeliveryModal)
    })
  }

  if (showHelpReturnsBtn) {
    showHelpReturnsBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(helpReturnsModal)
    })
  }

  if (showHelpSizesBtn) {
    showHelpSizesBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(helpSizesModal)
    })
  }

  if (showAboutCareersBtn) {
    showAboutCareersBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(aboutCareersModal)
    })
  }

  if (showAboutResponsibilityBtn) {
    showAboutResponsibilityBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(aboutResponsibilityModal)
    })
  }

  if (showAboutContactBtn) {
    showAboutContactBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openModal(aboutContactModal)
    })
  }

  // Close modals
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeAllModals()
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeAllModals()
    }
  })

  // Back to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Search functionality
  if (searchBtn && searchBox) {
    searchBtn.addEventListener("click", performSearch)
    searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        performSearch()
      }
    })
  }

  // Модифицируем функцию performSearch для добавления всплывающего окна с результатами
  function performSearch() {
    const searchTerm = searchBox.value.toLowerCase().trim()
    if (searchTerm === "") {
      showNotification("Пожалуйста, введите поисковый запрос", "warning")
      return
    }

    // Получаем все карточки товаров
    const productCards = document.querySelectorAll(".product-card")
    const foundProducts = []
    let foundCount = 0

    // Собираем найденные товары
    productCards.forEach((card) => {
      const productName = card.querySelector(".product-info h3").textContent.toLowerCase()
      if (productName.includes(searchTerm)) {
        foundCount++
        if (foundCount <= 5) {
          // Ограничиваем до 5 товаров в попапе
          const productImage = card.querySelector(".product-image img").src
          const productPrice = card.querySelector(".product-price").textContent
          const productId = card.querySelector(".add-to-cart").dataset.id
          const productNameFull = card.querySelector(".product-info h3").textContent

          foundProducts.push({
            id: productId,
            name: productNameFull,
            price: productPrice,
            image: productImage,
          })
        }
      }
    })

    // Показываем результаты поиска
    if (foundCount > 0) {
      showSearchResults(foundProducts, foundCount, searchTerm)

      // На мобильных устройствах не показываем уведомление, чтобы не перекрывать результаты
      if (window.innerWidth > 576) {
        showNotification(`Найдено ${foundCount} товаров`, "success")
      }
    } else {
      showNotification("Товары не найдены", "error")
      // Закрываем попап, если он открыт
      const existingPopup = document.querySelector(".search-results-popup")
      if (existingPopup) {
        document.body.removeChild(existingPopup)
      }
    }

    // На мобильных устройствах скрываем клавиатуру после поиска
    if (window.innerWidth <= 576) {
      searchBox.blur()
    }
  }

  // Добавляем новую функцию для отображения всплывающего окна с результатами поиска
  function showSearchResults(products, totalCount, searchTerm) {
    // Удаляем существующий попап, если он есть
    const existingPopup = document.querySelector(".search-results-popup")
    if (existingPopup) {
      document.body.removeChild(existingPopup)
    }

    // Создаем попап
    const popup = document.createElement("div")
    popup.className = "search-results-popup"

    // Стилизуем попап с учетом мобильных устройств
    popup.style.position = "absolute"
    popup.style.top = "60px"

    // Адаптивное позиционирование для мобильных устройств
    if (window.innerWidth <= 576) {
      popup.style.left = "10px"
      popup.style.right = "10px"
      popup.style.width = "calc(100% - 20px)"
    } else {
      popup.style.right = "20px"
      popup.style.width = "350px"
    }

    popup.style.maxHeight = "500px"
    popup.style.overflowY = "auto"
    popup.style.backgroundColor = "var(--white-color)"
    popup.style.boxShadow = "0 4px 15px var(--shadow-color)"
    popup.style.borderRadius = "8px"
    popup.style.zIndex = "1000"
    popup.style.padding = "15px"

    // Создаем заголовок
    let popupContent = `
      <div class="search-results-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
        <h3 style="margin: 0; font-size: ${window.innerWidth <= 576 ? "16px" : "18px"};">Результаты поиска: "${searchTerm}"</h3>
        <span class="close-search-popup" style="cursor: pointer; font-size: ${window.innerWidth <= 576 ? "24px" : "18px"}; padding: ${window.innerWidth <= 576 ? "0 10px" : "0"};">&times;</span>
      </div>
    `

    // Добавляем результаты
    if (products.length > 0) {
      products.forEach((product) => {
        popupContent += `
          <div class="search-result-item" style="display: flex; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border-color);">
            <img src="${product.image}" alt="${product.name}" style="width: ${window.innerWidth <= 576 ? "60px" : "70px"}; height: ${window.innerWidth <= 576 ? "60px" : "70px"}; object-fit: cover; border-radius: 4px;">
            <div style="margin-left: 15px; flex: 1;">
              <h4 style="margin: 0 0 5px 0; font-size: ${window.innerWidth <= 576 ? "14px" : "16px"};">${product.name}</h4>
              <p style="margin: 0 0 10px 0; font-size: ${window.innerWidth <= 576 ? "13px" : "14px"};">${product.price}</p>
              <button class="quick-view-search" data-id="${product.id}" style="background-color: var(--primary-color); color: white; border: none; padding: ${window.innerWidth <= 576 ? "8px 12px" : "5px 10px"}; border-radius: 4px; cursor: pointer; font-size: ${window.innerWidth <= 576 ? "14px" : "12px"};">Быстрый просмотр</button>
            </div>
          </div>
        `
      })

      // Если найдено больше товаров, чем показано
      if (totalCount > products.length) {
        popupContent += `
          <div style="text-align: center; padding: 10px;">
            <a href="#" class="view-all-results" style="color: var(--primary-color); text-decoration: underline; font-size: ${window.innerWidth <= 576 ? "15px" : "14px"};">Показать все ${totalCount} результатов</a>
          </div>
        `
      }
    } else {
      popupContent += `<p style="text-align: center; font-size: ${window.innerWidth <= 576 ? "15px" : "14px"};">Товары не найдены</p>`
    }

    popup.innerHTML = popupContent
    document.body.appendChild(popup)

    // Позиционируем попап относительно поисковой строки
    const searchBoxRect = searchBox.getBoundingClientRect()
    popup.style.top = searchBoxRect.bottom + window.scrollY + "px"

    // Для мобильных устройств центрируем попап
    if (window.innerWidth <= 576) {
      popup.style.left = "10px"
      popup.style.right = "10px"
    } else {
      popup.style.right = window.innerWidth - searchBoxRect.right + "px"
    }

    // Добавляем обработчики событий
    const closeBtn = popup.querySelector(".close-search-popup")
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(popup)
    })

    const viewAllBtn = popup.querySelector(".view-all-results")
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", (e) => {
        e.preventDefault()
        document.body.removeChild(popup)

        // Показываем все товары в основном контенте
        const productCards = document.querySelectorAll(".product-card")

        // Сначала скрываем все товары
        productCards.forEach((card) => {
          card.style.display = "none"
        })

        // Затем показываем только те, которые соответствуют поиску
        productCards.forEach((card) => {
          const productName = card.querySelector(".product-info h3").textContent.toLowerCase()
          if (productName.includes(searchTerm)) {
            card.style.display = "block"
          }
        })

        // Прокручиваем к первой секции с товарами
        const firstProductSection = document.querySelector(".product-section")
        if (firstProductSection) {
          firstProductSection.scrollIntoView({ behavior: "smooth" })
        }
      })
    }

    // Добавляем обработчики для кнопок быстрого просмотра
    const quickViewBtns = popup.querySelectorAll(".quick-view-search")
    quickViewBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = this.dataset.id

        // Находим карточку товара по ID
        const productCards = document.querySelectorAll(".product-card")
        productCards.forEach((card) => {
          const addToCartBtn = card.querySelector(".add-to-cart")
          if (addToCartBtn && addToCartBtn.dataset.id === productId) {
            // Вызываем клик по кнопке быстрого просмотра этого товара
            const quickViewBtn = card.querySelector(".quick-view")
            if (quickViewBtn) {
              quickViewBtn.click()
              // Закрываем попап
              document.body.removeChild(popup)
            }
          }
        })
      })
    })

    // Закрываем попап при клике вне его
    document.addEventListener("click", function closeSearchPopup(e) {
      if (!popup.contains(e.target) && e.target !== searchBox && e.target !== searchBtn) {
        if (document.body.contains(popup)) {
          document.body.removeChild(popup)
        }
        document.removeEventListener("click", closeSearchPopup)
      }
    })
  }

  // Добавляем стили для попапа поиска в head с учетом мобильных устройств
  function addSearchPopupStyles() {
    const style = document.createElement("style")
    style.textContent = `
      .search-results-popup {
        animation: fadeIn 0.3s ease;
      }
      
      .search-result-item:hover {
        background-color: var(--light-color);
      }
      
      .quick-view-search:hover {
        background-color: var(--hover-color) !important;
      }
      
      @media (max-width: 576px) {
        .search-results-popup {
          width: calc(100% - 20px) !important;
          left: 10px !important;
          right: 10px !important;
          max-height: 80vh !important;
        }
        
        .user-menu {
          width: calc(100% - 40px) !important;
          left: 20px !important;
          right: 20px !important;
        }
        
        .user-menu-item {
          padding: 15px !important;
          font-size: 16px !important;
        }
        
        .close-search-popup {
          padding: 0 10px !important;
          font-size: 24px !important;
        }
      }
      
      /* Добавляем стили для тач-устройств */
      @media (hover: none) {
        .search-result-item:active {
          background-color: var(--light-color);
        }
        
        .quick-view-search:active {
          background-color: var(--hover-color) !important;
        }
        
        .user-menu-item:active {
          background-color: var(--light-color);
        }
      }
    `
    document.head.appendChild(style)
  }

  // Quick view functionality
  quickViewBtns.forEach((btn) => {
    btn.addEventListener("click", handleQuickView)
  })

  // Size selection
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      sizeBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Quantity controls
  if (decreaseQuantityBtn) {
    decreaseQuantityBtn.addEventListener("click", () => {
      const quantity = Number.parseInt(productQuantityInput.value)
      if (quantity > 1) {
        productQuantityInput.value = quantity - 1
      }
    })
  }

  if (increaseQuantityBtn) {
    increaseQuantityBtn.addEventListener("click", () => {
      const quantity = Number.parseInt(productQuantityInput.value)
      productQuantityInput.value = quantity + 1
    })
  }

  // Add to cart from quick view
  if (quickAddToCartBtn) {
    quickAddToCartBtn.addEventListener("click", () => {
      if (!isAuthenticated) {
        closeModal(quickViewModal)
        openModal(authRequiredModal)
        return
      }

      if (currentProduct) {
        const quantity = Number.parseInt(productQuantityInput.value)
        let selectedSize = ""

        // Получаем размер только если это не аксессуар
        if (!currentProduct.isAccessory) {
          const activeSizeBtn = document.querySelector(".size-btn.active")
          if (activeSizeBtn) {
            selectedSize = activeSizeBtn.textContent
          }
        }

        addToCart({
          ...currentProduct,
          quantity: quantity,
          size: selectedSize,
        })

        closeModal(quickViewModal)
        updateCartDisplay()
      }
    })
  }

  // Add to cart functionality
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", handleAddToCart)
  })

  // Add to cart function
  function addToCart(product) {
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex((item) => item.id === product.id && item.size === product.size)

    if (existingProductIndex > -1) {
      // Update quantity if product already exists
      cart[existingProductIndex].quantity += product.quantity
    } else {
      // Add new product to cart
      cart.push(product)
    }

    // Save cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Show notification
    showNotification(`${product.name} добавлен в корзину!`, "success")
  }

  // Update cart display
  function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCountElement.textContent = totalItems

    // Update cart items
    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Ваша корзина пуста</p>'
        cartTotalElement.textContent = "0 ₸"
      } else {
        let cartHTML = ""
        let cartTotal = 0

        cart.forEach((item, index) => {
          const sizeInfo = item.isAccessory ? "" : ` | Размер: ${item.size}`

          cartHTML += `
          <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                  <h3 class="cart-item-title">${item.name}</h3>
                  <p class="cart-item-price">${item.price.toLocaleString()} ₸${sizeInfo}</p>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn decrease-cart-quantity" data-index="${index}">-</button>
                      <span>${item.quantity}</span>
                      <button class="quantity-btn increase-cart-quantity" data-index="${index}">+</button>
                      <span class="remove-item" data-index="${index}">Удалить</span>
                  </div>
              </div>
          </div>
        `

          cartTotal += item.price * item.quantity
        })

        cartItemsContainer.innerHTML = cartHTML
        cartTotalElement.textContent = cartTotal.toLocaleString() + " ₸"

        // Add event listeners for cart item controls
        const decreaseCartBtns = document.querySelectorAll(".decrease-cart-quantity")
        const increaseCartBtns = document.querySelectorAll(".increase-cart-quantity")
        const removeItemBtns = document.querySelectorAll(".remove-item")

        decreaseCartBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const index = Number.parseInt(this.dataset.index)
            if (cart[index].quantity > 1) {
              cart[index].quantity--
              updateCartDisplay()
              localStorage.setItem("cart", JSON.stringify(cart))
            }
          })
        })

        increaseCartBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const index = Number.parseInt(this.dataset.index)
            cart[index].quantity++
            updateCartDisplay()
            localStorage.setItem("cart", JSON.stringify(cart))
          })
        })

        removeItemBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const index = Number.parseInt(this.dataset.index)
            cart.splice(index, 1)
            updateCartDisplay()
            localStorage.setItem("cart", JSON.stringify(cart))
          })
        })
      }
    }
  }

  // Checkout functionality
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        showNotification("Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения.", "success")
        cart = []
        localStorage.removeItem("cart")
        updateCartDisplay()
        closeModal(cartModal)
      } else {
        showNotification("Ваша корзина пуста. Добавьте товары перед оформлением заказа.", "warning")
      }
    })
  }

  // Show notification
  function showNotification(message, type = "") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    // Animate notification
    setTimeout(() => {
      notification.style.opacity = "1"
      notification.style.transform = "translateY(0)"
    }, 10)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transform = "translateY(20px)"

      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Form submissions
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      showNotification(`Спасибо за подписку с адресом ${email}!`, "success")
      this.reset()
    })
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation
      if (email && password) {
        const user = {
          name: email.split("@")[0],
          email: email,
          id: Math.floor(Math.random() * 10000),
        }

        loginUser(user)
        closeModal(loginModal)
        showNotification(`Добро пожаловать, ${user.name}!`, "success")
      } else {
        showNotification("Пожалуйста, заполните все поля.", "error")
      }
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("reg-name").value
      const email = document.getElementById("reg-email").value
      const password = document.getElementById("reg-password").value
      const confirmPassword = document.getElementById("reg-confirm-password").value
      const terms = document.getElementById("terms").checked

      // Simple validation
      if (name && email && password && terms) {
        if (password !== confirmPassword) {
          showNotification("Пароли не совпадают.", "error")
          return
        }

        const user = {
          name: name,
          email: email,
          id: Math.floor(Math.random() * 10000),
        }

        loginUser(user)
        closeModal(registerModal)
        showNotification(`Регистрация прошла успешно! Добро пожаловать, ${name}.`, "success")
      } else {
        showNotification("Пожалуйста, заполните все поля и примите условия использования.", "error")
      }
    })
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("contact-name").value
      const email = document.getElementById("contact-email").value

      showNotification(
        `Спасибо за ваше сообщение, ${name}! Мы свяжемся с вами по адресу ${email} в ближайшее время.`,
        "success",
      )
      contactForm.reset()
      closeModal(aboutContactModal)
    })
  }

  // Smooth scrolling for navigation links
  function smoothScroll(target) {
    const element = document.querySelector(target)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      })
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href")
      smoothScroll(target)

      // Update active link
      navLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")
    })
  })

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href")
      smoothScroll(target)

      // Close mobile menu
      mobileMenu.classList.remove("active")
      hamburger.classList.remove("active")

      // Reset hamburger icon
      const spans = hamburger.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    })
  })

  // Load cart from local storage
  function loadCart() {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      cart = JSON.parse(savedCart)
      updateCartDisplay()
    }
  }

  // Initialize
  loadCart()

  // Добавляем новые товары со скидками
  addNewSaleProducts()

  // Add scroll animation for elements
  const animateElements = document.querySelectorAll(
    ".product-card, .category-card, .section-title, .about-content, .about-image",
  )

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  animateElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Check elements on load
  window.addEventListener("load", checkScroll)

  // Check elements on scroll
  window.addEventListener("scroll", checkScroll)

  // Добавляем стили для попапа поиска
  addSearchPopupStyles()

  // Добавляем обработчик изменения размера окна для адаптивности
  window.addEventListener("resize", () => {
    // Закрываем меню пользователя при изменении размера окна
    const userMenu = document.querySelector(".user-menu")
    if (userMenu) {
      document.body.removeChild(userMenu)
    }

    // Закрываем попап поиска при изменении размера окна
    const searchPopup = document.querySelector(".search-results-popup")
    if (searchPopup) {
      document.body.removeChild(searchPopup)
    }
  })
})
