// ждем пока весь html прогрузится, чтобы скрипт не искал элементы, которых еще нет
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. подсветка активного пункта меню ---
    
    // вытаскиваем название текущего файла из ссылки (типа menu.html или booking.html)
    // split бьет ссылку по слешам, а pop берет последний кусок
    const currentPage = window.location.pathname.split('/').pop();
    
    // собираем все ссылки из шапки в один список
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        // если атрибут href совпадает с открытой страницей (или мы на главной)
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.style.color = '#c97a3e'; // красим активную ссылку в кофейный цвет
        }
    });


    // --- 2. запрет выбора прошедших дат в календаре ---
    
    const dateInput = document.querySelector('input[type="date"]');
    // проверяем, есть ли вообще календарь на этой странице (чтобы на главной не выдавало ошибку)
    if (dateInput) {
        // берем текущую дату и отрезаем от нее время (оставляем только год-месяц-день)
        const today = new Date().toISOString().split('T')[0];
        // вешаем атрибут min, чтобы браузер сам заблокировал все вчерашние дни
        dateInput.setAttribute('min', today);
    }


    // --- 3. имитация отправки форм ---
    
    // находим все формы на странице
    const forms = document.querySelectorAll('form');
    
    // перебираем каждую форму и вешаем слушатель на нажатие кнопки submit
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            
            // самая частая штука на защите: эта команда отменяет стандартную перезагрузку страницы
            e.preventDefault(); 

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent; // запоминаем старый текст кнопки
            
            // меняем кнопку, чтобы юзер видел, что процесс пошел, и не спамил кликами
            btn.textContent = 'Отправка...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // таймер setTimeout имитирует задержку ответа от сервера (1500 мс = 1.5 сек)
            setTimeout(() => {
                alert('Успешно! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
                
                // встроенный метод reset() сам очищает все поля в форме
                form.reset(); 
                
                // возвращаем кнопку в нормальное состояние
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    });

});