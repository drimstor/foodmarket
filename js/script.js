/* ___________________________________________________ */

/* Переменные */

let itemParent,
  itemCounter,
  counter,
  itemInfo,
  liOverA,
  card,
  cardCounter,
  priceCounter,
  firstPrice;

const total = document.querySelector('[data-action="total"]'),
  headerCounter = document.querySelector('[data-action="headerCounter"]'),
  itemSum = document.querySelector('[data-action="itemSum"]'),
  cartWrapper = document.querySelector('.cart__items'),
  banner = document.querySelector('[data-action="banner"]'),
  bannerMob = document.querySelector('[data-action="bannerMob"]'),
  nav = document.querySelector('[data-action="nav"]'),
  header = document.querySelector('header'),
  mediaQuery = window.matchMedia('(min-width: 769px)'),
  about = document.querySelector('.about'),
  cartBtn = document.querySelector('[data-action="cartBtn"]'),
  cartBtnMob = document.querySelector('[data-action="cartBtnMob"]'),
  cartCloseBtn = document.querySelector('[data-action="cartClose"]'),
  cart = document.querySelector('[data-action="cart"]'),
  sections = document.querySelectorAll('section'),
  itemPageBackBtn = document.querySelector('[data-action="itemPageBackBtn"]'),
  itemPage = document.querySelector('[data-action="itemPage"]'),
  btnInCart = document.querySelector('[data-btn="cart"]'),
  burgerBtn = document.querySelector('.header__burger'),
  searchBar = document.querySelector('.input__search'),
  aScroll = document.querySelectorAll('.nav__menu a.scrollto'),
  contacts = document.querySelector('[data-action="contacts"]'),
  liScroll = document.querySelectorAll('.nav__menu li'),
  logosImg = document.querySelector('#logosImg');

/* ___________________________________________________ */

// Вход в корзину
cartBtn.addEventListener('click', (event) => {
  event.preventDefault();
  // Подсчет товаров для окончания
  itemEnd(headerCounter.innerText);
  // Открыть корзину если есть товары
  if (parseInt(headerCounter.innerText) > 0) {
    // Прячем баннер
    hideBanner();
    // Прячем секции
    hideSections();
    // Прячем карточку товара
    exitItemPage();
    // Показываем корзину
    showCart();
  }
});

// Вход в корзину из карточки товара
btnInCart.addEventListener('click', () => {
  // Подсчет товаров для окончания
  itemEnd(headerCounter.innerText);
  // Открыть корзину если есть товары
  if (parseInt(headerCounter.innerText) > 0) {
    // Прячем секции
    hideSections();
    // Прячем карточку товара
    exitItemPage();
    // Показываем корзину
    showCart();
  }
});

// Вход в карточку товара
window.addEventListener('click', (event) => {
  // Если открываем товар внутри карточки
  if (event.target.dataset.action === 'img' && itemPage.classList.contains('fade__in')) {
    // Прячем карточку товара
    itemPage.classList.add('fade__out');
    // Подставляем данные из карточки
    setTimeout(transferItem, 900, event);
    // Показываем карточку товара
    setTimeout(showItemPage, 900, event);
    // Скролл вверх
    setTimeout(scrollToTop, 900);
  }
  // Если открываем товар из корзины
  if (event.target.dataset.action === 'img' && cart.classList.contains('fade__in')) {
    cart.classList.remove('fade__in');
    // Прячем корзину
    exitCart();
    // Подставляем данные из карточки
    transferItemFromCart(event);
    // Показываем карточку товара
    showItemPage();
    // Прячем секции
    hideSections(event);
  }
  // Если открываем товар на главной
  if (event.target.dataset.action === 'img' && !itemPage.classList.contains('fade__in')) {
    itemParent = event.target.closest('.item');
    // Прячем секции
    hideSections(event);
    // Прячем баннер
    hideBanner();
    // Прячем корзину
    exitCart();
    // Подставляем данные из карточки
    transferItem(event);
    // Показываем карточку товара
    showItemPage();
  }
});

/* ___________________________________________________ */

// Выход из корзины
cartCloseBtn.addEventListener('click', cartClose);

function cartClose(event) {
  event.preventDefault();
  // Прячем корзину
  exitCart();
  // Показываем секции
  showSections();
  // Показываем баннер
  showBanner();
  // Скролл вверх и подсчет товаров
  setTimeout(scrollToTop, 1000);
  setTimeout(checkItemEnd, 1000);
  cart.classList.remove('fade__in');
}

// Выход из карточки товара
itemPageBackBtn.addEventListener('click', itemClose);

function itemClose() {
  // Прячем карточку товара
  exitItemPage();
  // Показываем секции
  showSections();
  // Показываем баннер
  showBanner();
  // Скролл вверх и подсчет товаров
  setTimeout(scrollToTop, 1000);
}

// Выход на главную
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('exit') && cart.classList.contains('fade__in')) {
    cartClose(event);
  }
  if (event.target.classList.contains('exit') && itemPage.classList.contains('fade__in')) {
    itemClose();
  }
});

/* ___________________________________________________ */

/* Действия */

// Прячем карточку товара
function exitItemPage() {
  nav.classList.remove('scrl');
  itemPage.classList.remove('fade__in');
  itemPage.classList.add('fade__out');
  setTimeout(displayBoolean, 1000, itemPage, 'none');
}

// Прячем корзину
function exitCart() {
  nav.classList.remove('scrl');
  cart.classList.add('fade__out');
  setTimeout(displayBoolean, 1000, cart, 'none');
}

// Прячем секции
function hideSections(event) {
  sections.forEach((element) => {
    element.classList.add('fade__out');
    setTimeout(displayBoolean, 1000, element, 'none');
  });
  if (event) {
    contacts.classList.remove('fade__out');
    contacts.classList.add('fade__in');
    setTimeout(displayBoolean, 1000, contacts, 'block');
  }
}

// Прячем баннер
function hideBanner() {
  const mediaQueryMob = window.matchMedia('(min-width: 426px)');
  if (mediaQueryMob.matches) {
    banner.style.marginTop = -banner.clientHeight + 'px';
    banner.style.opacity = '0';
  } else {
    bannerMob.style.marginTop = -bannerMob.clientHeight + 'px';
    bannerMob.style.opacity = '0';
  }
}

/* ___________________________________________________ */

// Показываем карточку товара
function showItemPage(notScroll) {
  if (notScroll) {
    itemPage.classList.remove('fade__out');
    setTimeout(displayBoolean, 900, itemPage, 'block');
    itemPage.classList.add('fade__in');
  } else {
    itemPage.classList.remove('fade__out');
    setTimeout(displayBoolean, 900, itemPage, 'block');
    itemPage.classList.add('fade__in');
    setTimeout(scrollToTop, 900);
  }
}

// Показываем корзину
function showCart() {
  cart.classList.remove('fade__out');
  setTimeout(displayBoolean, 1000, cart, 'block');
  cart.classList.add('fade__in');
  setTimeout(scrollToTop, 1000);
}

// Показываем секции
function showSections() {
  if (mediaQuery.matches) {
    sections.forEach((element) => {
      element.classList.remove('fade__out');
      element.classList.add('fade__in');
      setTimeout(displayBoolean, 1000, element, 'block');
      contacts.classList.remove('fade__in');
    });
  } else {
    sections.forEach((element) => {
      element.classList.remove('fade__out');
      element.classList.add('fade__in');
      setTimeout(displayBoolean, 1000, element, 'block');
      setTimeout(displayBoolean, 1000, about, 'none');
      contacts.classList.remove('fade__in');
    });
    about.style.display = 'none';
  }
  contacts.classList.add('fade__out');
  contacts.classList.remove('fade__in');
  setTimeout(displayBoolean, 1000, contacts, 'block');
}

// Показываем баннер
function showBanner() {
  const mediaQueryMob = window.matchMedia('(min-width: 426px)');
  if (mediaQueryMob.matches) {
    banner.style.marginTop = '';
    banner.style.opacity = '1';
  } else {
    bannerMob.style.marginTop = '';
    bannerMob.style.opacity = '1';
    about.style.display = 'none';
  }
}

/* ___________________________________________________ */

// Сбор данных по товару на главной
function menuItemInfo(item) {
  return (itemInfo = {
    id: item.dataset.id,
    imgSrc: item.querySelector('[data-action="img"]').getAttribute('src'),
    title: item.querySelector('h3').innerText,
    decription: item.querySelector('.item__descr').innerText,
    price: item.querySelector('[data-action="firstPrice"]').innerText,
    priceSumm: item.querySelector('[data-action="price"]').innerText,
    counter: item.querySelector('.counter').innerText,
  });
}

// Сбор данный по товару из корзины
function cartItemInfo(item) {
  return (itemInfo = {
    id: item.dataset.id,
    imgSrc: item.querySelector('[data-action="img"]').getAttribute('src'),
    title: item.querySelector('h3').innerText,
    decription: item.querySelector('.cart__descr').innerText,
    price: item.querySelector('[data-price]').dataset.price,
    priceSumm: parseInt(item.querySelector('[data-price]').innerText),
    counter: item.querySelector('.cart__counter').innerText,
  });
}

// Собрать и подставить данные в карточку товара из главной
function transferItem(event) {
  // Находим родителя
  const item = event.target.closest('.item');
  // Сбор данных
  menuItemInfo(item);
  console.log(menuItemInfo(item));
  // Находим значения
  const h2 = itemPage.querySelector('h2'),
    price = itemPage.querySelector('.item-price'),
    img = itemPage.querySelector('[data-item="img"]'),
    descr = itemPage.querySelector('.item__page-descr');
  // Заменяем значения
  h2.innerText = itemInfo.title;
  price.innerText = itemInfo.price;
  img.src = itemInfo.imgSrc;
  descr.innerText = itemInfo.decription;
}

// Собрать и подставить данные в карточку товара из корзины
function transferItemFromCart(event) {
  // Находим родителя
  const item = event.target.closest('.cart__item');
  // Сбор данных
  cartItemInfo(item);
  console.log(cartItemInfo(item));
  // Находим значения
  const h2 = itemPage.querySelector('h2'),
    price = itemPage.querySelector('.item-price'),
    img = itemPage.querySelector('[data-item="img"]'),
    descr = itemPage.querySelector('.item__page-descr');
  // Заменяем значения
  h2.innerText = itemInfo.title;
  price.innerText = itemInfo.price;
  img.src = itemInfo.imgSrc;
  descr.innerText = itemInfo.decription;
}

/* ___________________________________________________ */

// Счетчик товаров и цен на главной
window.addEventListener('click', (event) => {
  // Проверка был ли клик именно по нужным кнопкам
  // Поиск родительской карточки кнопки и счетчика
  if (
    event.target.dataset.action === 'add' ||
    event.target.dataset.action === 'plus' ||
    event.target.dataset.action === 'minus'
  ) {
    // Нашли родителя и счетчики
    itemParent = event.target.closest('.item');
    itemCounter = itemParent.querySelector('.count');
    counter = itemParent.querySelector('.counter');
  }

  // Если клик по кнопке "в корзину" - показываем счетчик
  if (event.target.dataset.action === 'add') {
    const itemBefore = itemParent.querySelector('.item__price_before'),
      itemAfter = itemParent.querySelector('.item__price_after'),
      firstPrice = itemParent.querySelector('[data-action="firstPrice"]');
    // Визуал
    itemCounter.classList.add('vis');
    itemBefore.classList.add('hide');
    itemAfter.classList.remove('hide');
    // +1 Счетчик для объекта
    counter.innerText = ++counter.innerText;
    // +1 Общий счетчик
    headerCounter.innerText = ++headerCounter.innerText;
    // Сумма в корзине
    total.innerText = +total.innerText + parseInt(firstPrice.innerText);
  }
  // Если клик по любому плюсу прибавляем общий счетчик
  if (event.target.dataset.action === 'plus' || event.target.dataset.plus === 'plus') {
    // +1 Общий счетчик
    headerCounter.innerText = ++headerCounter.innerText;
  }
  // Если клик только по плюсу на главной
  if (event.target.dataset.action === 'plus') {
    const price = itemParent.querySelector('[data-action="price"]'),
      firstPrice = itemParent.querySelector('[data-action="firstPrice"]');
    // +1 Цена
    price.innerText = parseInt(price.innerText) + parseInt(firstPrice.innerText);
    // Сумма в корзине
    total.innerText = +total.innerText + parseInt(firstPrice.innerText);
    // +1 Визуал
    itemCounter.innerText = ++itemCounter.innerText;
    // +1 Счетчик для объекта
    counter.innerText = ++counter.innerText;
  }

  // Если клик по любому минусу отнимаем общий счетчик
  if (event.target.dataset.action === 'minus' || event.target.dataset.minus === 'minus') {
    if (parseInt(itemCounter.innerText) > 1) {
      // -1 Общий счетчик
      headerCounter.innerText = --headerCounter.innerText;
      if (event.target.dataset.action === 'minus') {
        const price = itemParent.querySelector('[data-action="price"]'),
          firstPrice = itemParent.querySelector('[data-action="firstPrice"]');
        // -1 Визуал
        itemCounter.innerText = --itemCounter.innerText;
        // -1 Счетчик для объекта
        counter.innerText = --counter.innerText;
        // -1 Цена
        price.innerText = parseInt(price.innerText) - parseInt(firstPrice.innerText);
        // Сумма в корзине
        total.innerText = +total.innerText - parseInt(firstPrice.innerText);
      }
    } else {
      // -1 Общий счетчик
      headerCounter.innerText = --headerCounter.innerText;
      if (event.target.dataset.action === 'minus') {
        const itemBefore = itemParent.querySelector('.item__price_before'),
          itemAfter = itemParent.querySelector('.item__price_after'),
          firstPrice = itemParent.querySelector('[data-action="firstPrice"]');
        // Сумма в корзине
        total.innerText = +total.innerText - parseInt(firstPrice.innerText);
        // Удаляем визуал
        itemBefore.classList.remove('hide');
        itemAfter.classList.add('hide');
        itemCounter.classList.remove('vis');
        // Если еще не ноль
        if (parseInt(headerCounter.innerText) !== 0) {
          // -1 Счетчик для объекта
          counter.innerText = --counter.innerText;
        }
        // Находим родителя
        const item = event.target.closest('.item');
        // Сбор данных
        menuItemInfo(item);
        // Находим товар в корзине по айди
        const itemInCart = cartWrapper.querySelector(`[data-id="${itemInfo.id}"]`);
        // Удаление
        const deeel = () => {
          itemInCart.remove();
        };
        // С анимацией
        itemInCart.classList.add('fade__out');
        setTimeout(deeel, 700, itemInCart, 'none');
      }
    }
  }
});

/* ___________________________________________________ */

// Счетчик товаров и цен внутри корзины
window.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('cart__control-plus') ||
    event.target.dataset.minus === 'minus' ||
    event.target.dataset.del === 'del'
  ) {
    // Находим родителя и счетчики
    (card = event.target.closest('.cart__item')),
      (cardCounter = card.querySelector('.cart__counter')),
      (priceCounter = card.querySelector('.cart_price')),
      (firstPrice = card.querySelector('[data-price]').dataset.price);
  }
  //  При клике на плюс
  if (event.target.classList.contains('cart__control-plus')) {
    // +1 Счетчик
    cardCounter.innerText = ++cardCounter.innerText;
    // +1 Цена
    priceCounter.innerText = parseInt(priceCounter.innerText) + parseInt(firstPrice) + ' ₽';
    // Сумма в корзине
    total.innerText = +total.innerText + parseInt(firstPrice);
    // Окончание слова "товаров"
    checkItemEnd();
    itemEnd(headerCounter.innerText);
    // Находим родителя
    const item = event.target.closest('.cart__item');
    // Сбор данных по товару
    cartItemInfo(item);
    // Находим товар на главной по айди
    const itemInMain = document.querySelector(`[data-id="${itemInfo.id}"]`),
      // Находим счетчики и цену
      itemCount = itemInMain.querySelector('.count'),
      itemCounter = itemInMain.querySelector('.counter'),
      itemPrice = itemInMain.querySelector('[data-action="price"]');
    // Добавляем значения товару на главной
    itemCount.innerText = ++itemCount.innerText;
    itemCounter.innerText = ++itemCounter.innerText;
    itemPrice.innerText = itemInfo.priceSumm;
    console.log(cartItemInfo(item));
  }
  // При клике на минус
  if (event.target.dataset.minus === 'minus') {
    if (parseInt(cardCounter.innerText) > 1) {
      // -1 Счетчик
      cardCounter.innerText = --cardCounter.innerText;
      // -1 Цена
      priceCounter.innerText = parseInt(priceCounter.innerText) - parseInt(firstPrice) + ' ₽';
      // Сумма в корзине
      total.innerText = +total.innerText - parseInt(firstPrice);
      // Окончание слова "товаров"
      checkItemEnd();
      itemEnd(headerCounter.innerText);
      // Находим родителя
      const item = event.target.closest('.cart__item');
      // Сбор данных по товару
      cartItemInfo(item);
      // Находим товар на главной по айди
      const itemInMain = document.querySelector(`[data-id="${itemInfo.id}"]`),
        // Находим счетчики и цену
        itemCount = itemInMain.querySelector('.count'),
        itemCounter = itemInMain.querySelector('.counter'),
        itemPrice = itemInMain.querySelector('[data-action="price"]');
      // Добавляем значения товару на главной
      itemCount.innerText = --itemCount.innerText;
      itemCounter.innerText = --itemCounter.innerText;
      itemPrice.innerText = itemInfo.priceSumm;
    } else {
      if (parseInt(cardCounter.innerText) !== 0) {
        // Окончание слова "товаров"
        checkItemEnd();
        itemEnd(headerCounter.innerText);
        // Находим родителя
        const item = event.target.closest('.cart__item');
        // Сбор данных по товару
        cartItemInfo(item);
        // Находим товар на главной по айди
        const itemInMain = document.querySelector(`[data-id="${itemInfo.id}"]`),
          // Находим счетчики и цену
          itemCount = itemInMain.querySelector('.count'),
          itemCounter = itemInMain.querySelector('.counter'),
          itemBefore = itemInMain.querySelector('.item__price_before'),
          itemAfter = itemInMain.querySelector('.item__price_after');
        // Удаляем визуал
        itemCount.classList.remove('vis');
        itemBefore.classList.remove('hide');
        itemAfter.classList.add('hide');
        // Удаление
        const deeel = () => {
          card.remove();
        };
        // С анимацией
        card.classList.add('fade__out');
        setTimeout(deeel, 700, card, 'none');
        // Очистка счетчиков
        itemCount.innerText = 1;
        itemCounter.innerText = 0;
        // Сумма в корзине
        total.innerText = +total.innerText - parseInt(firstPrice);
      }
    }
  }
  // Удаление товара
  if (event.target.dataset.del === 'del') {
    (card = event.target.closest('.cart__item')),
      (cardCounter = card.querySelector('.cart__counter'));
    // Отнимаем от общего счетчика
    headerCounter.innerText = parseInt(headerCounter.innerText) - parseInt(cardCounter.innerText);
    // Окончание слова "товаров"
    checkItemEnd();
    itemEnd(headerCounter.innerText);
    // Находим родителя
    const item = event.target.closest('.cart__item');
    // Сбор данных по товару
    cartItemInfo(item);
    // Находим товар на главной по айди
    const itemInMain = document.querySelector(`[data-id="${itemInfo.id}"]`),
      // Находим счетчики и цену
      itemCount = itemInMain.querySelector('.count'),
      itemCounter = itemInMain.querySelector('.counter'),
      itemPrice = itemInMain.querySelector('[data-action="price"]'),
      itemFirstPrice = itemInMain.querySelector('[data-action="firstPrice"]'),
      itemBefore = itemInMain.querySelector('.item__price_before'),
      itemAfter = itemInMain.querySelector('.item__price_after');
    // Сумма в корзине
    total.innerText = +total.innerText - parseInt(itemPrice.innerText);
    // Обнуляем счетчики
    itemCount.innerText = 1;
    itemCounter.innerText = 0;
    itemPrice.innerText = itemFirstPrice.innerText;
    // Удаляем визуал
    itemCount.classList.remove('vis');
    itemBefore.classList.remove('hide');
    itemAfter.classList.add('hide');
    // Удаление
    const deeel = () => {
      card.remove();
    };
    // С анимацией
    card.classList.add('fade__out');
    setTimeout(deeel, 700, card, 'none');
  }
});
/* ___________________________________________________ */

// Добавление товара в корзину
window.addEventListener('click', (event) => {
  if (
    event.target.dataset.action === 'add' ||
    event.target.dataset.action === 'plus' ||
    event.target.dataset.action === 'minus'
  ) {
    // Находим родителя
    const item = event.target.closest('.item');
    // Сбор данных
    menuItemInfo(item);
    console.log(menuItemInfo(item));
    // Находим товар в корзине по айди
    const itemInCart = cartWrapper.querySelector(`[data-id="${itemInfo.id}"]`);
    // Если товар уже есть в корзине меняем счетчик и цену
    if (
      (itemInCart && event.target.dataset.action === 'add') ||
      event.target.dataset.action === 'plus'
    ) {
      const counterElement = itemInCart.querySelector('.cart__counter'),
        priceElement = itemInCart.querySelector('.cart_price');
      // Подставляем значения из объекта данных
      counterElement.innerText = itemInfo.counter;
      priceElement.innerText = priceFunc(itemInfo);
      // Если товара нет то добавляем
    } else if (!itemInCart) {
      // Шаблон HTML
      const cartItemHTML = `
			  <div class="gradient_line">
				  <div class="line__left"></div>
				  <div class="line__right"></div>
			  </div>
  
			  <div class="cart__item" data-id='${itemInfo.id}'>
			  <div class="cart__info">
				  <img src="${itemInfo.imgSrc}" alt="${itemInfo.title}" data-action="img">
				  <div class="cart__text">
					  <h3>${itemInfo.title}</h3>
					  <div class="cart__descr">
					  ${itemInfo.decription}</div>
				  </div>
			  </div>
			  <div class="cart__control">
				  <div class="cart__control-counter">
					  <div class="cart__control-minus" data-minus="minus"></div>
					  <div class="cart__counter">${itemInfo.counter}</div>
					  <div class="cart__control-plus" data-plus="plus"></div>
				  </div>
				  <div class="cart_price" data-price='${itemInfo.price}'>${priceFunc(itemInfo)}</div>
				  <div class="cart__del-btn" data-del="del"></div>
			  </div>
			  </div>`;
      // Добавление шаблона в верстку
      cartWrapper.insertAdjacentHTML('afterbegin', cartItemHTML);
    }
    // Клик по минусу на главной, удаляет из корзины
    if (itemInCart && event.target.dataset.action === 'minus') {
      const counterElement = itemInCart.querySelector('.cart__counter'),
        priceElement = itemInCart.querySelector('.cart_price');
      // Подставляем значения из объекта данных
      counterElement.innerText = itemInfo.counter;
      priceElement.innerText = priceFunc(itemInfo);
      // Если меньше 1 то удаляет из корзины
      if (parseInt(counterElement.innerText) < 1 && event.target.dataset.action === 'minus') {
        itemInCart.remove();
      }
    }
  }
});

/* ___________________________________________________ */

/* Дополнительный функционал */

// Прелоадер
document.body.onload = function () {
  setTimeout(function () {
    let preloader = document.getElementById('page-preloader');
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
  }, 1000);
};

// Модальное окно
function modals() {
  function blindModal(triggerSelector, modalBgSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
      modalBg = document.querySelector(modalBgSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      scroll = calcScroll();
    const menuBtn = document.querySelector('.modal__btn');

    // При клике на все попапы
    trigger.forEach((item) => {
      item.addEventListener('click', (event) => {
        if (event.target) {
          event.preventDefault();
        }
        // Открывать если коризна пуста
        if (parseInt(headerCounter.innerText) === 0) {
          modalBg.classList.add('show');
          modal.classList.add('show');
          document.body.style.overflow = 'hidden';
          document.body.style.width = `${window.innerWidth - scroll}px`;
          header.style.width = `${window.innerWidth - scroll}px`;
          nav.style.width = `${window.innerWidth - scroll}px`;
        }
      });
    });

    // Закрыть попап
    function modalClose() {
      modalBg.classList.remove('show');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    // При клике на закрыть
    close.addEventListener('click', () => {
      modalClose();
    });
    // При клике на кнопку меню
    menuBtn.addEventListener('click', () => {
      modalClose();
    });
    // При клике на область фона
    modalBg.addEventListener('click', (event) => {
      if (event.target === modalBg) {
        modalClose();
      }
    });
  }
  blindModal('.header__btn_cart', '.popup__bg', '.popup', '.popup .popup__close');
}
modals();

/* ___________________________________________________ */

// Бургер меню
burgerBtn.addEventListener('click', (event) => {
  // Открыть, закрыть
  burgerBtn.classList.toggle('active');
  searchBar.classList.toggle('active');
  nav.classList.toggle('active');
  header.classList.toggle('active');
  bodyLock();
  // Закрыть
  const burgerClose = () => {
    burgerBtn.classList.remove('active');
    searchBar.classList.remove('active');
    nav.classList.remove('active');
    header.classList.remove('active');
  };
  // Закрыть по клику ссылки в бургере
  nav.addEventListener('click', (event) => {
    if (event.target.classList.contains('scrollto')) {
      let pagePosition = window.scrollY;
      document.body.classList.remove('lock');
      pagePosition = parseInt(document.body.dataset.position, 10);
      document.body.style.top = '';
      window.scroll({ top: pagePosition, left: 0 });
      document.body.removeAttribute('data-position');
      burgerClose();
      // bodyLock();
    }
  });
});

/* ___________________________________________________ */

/*  Вспомогательнные фунции */

// Меняет окончание слова "товар"
function itemEnd(item) {
  if (item == 1) {
    itemSum.innerText = item + ' товар';
  }
  if (item >= 2 && item <= 4) {
    itemSum.innerText = item + ' товара';
  }
  if (item == 0 || item >= 5) {
    itemSum.innerText = item + ' товаров';
  }
}

// Добавление знака "₽"
function priceFunc(itemInfo) {
  if (itemInfo.counter == 1) {
    return itemInfo.price + ' ₽';
  } else {
    return itemInfo.priceSumm + ' ₽';
  }
}

// Функции для задержки
function displayBoolean(element, value) {
  element.style.display = value;
}

// Скролл вверх
function scrollToTop() {
  window.scrollTo(0, 0);
}

// Удаляет слово "товар" для счетчика
function checkItemEnd() {
  if (itemSum.innerText.indexOf('товар')) {
    itemSum.innerText = itemSum.innerText.replace(/[a-zа-яё]/gi, '');
  }
}

// Расчет скроллбара
function calcScroll() {
  let div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

// Поиск высоты баннера и приклеивание навбара
window.addEventListener('scroll', function () {
  // Если это десктоп версия
  if (mediaQuery.matches) {
    // Если есть баннер
    if (getComputedStyle(banner).opacity == '1') {
      const wScroll = window.pageYOffset;
      if (wScroll > banner.clientHeight) {
        nav.classList.add('scrl');
      } else {
        nav.classList.remove('scrl');
      }
    } else {
      nav.classList.add('scrl');
    }
  }
});

// Плавный скролл
$('a.scrollto').click(function () {
  let elementClick = $(this).attr('href');
  let destination = $(elementClick).offset().top;
  jQuery('html:not(:animated),body:not(:animated)').animate(
    {
      scrollTop: destination,
    },
    800,
  );
  // return false;
});

// Запрет скролла
function bodyLock() {
  let pagePosition = window.scrollY;
  if (document.body.classList.contains('lock')) {
    document.body.classList.remove('lock');
    pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.top = '';
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
  } else {
    document.body.classList.add('lock');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }
}

// Подсветка навбара
aScroll.forEach((element) => {
  element.addEventListener('click', (event) => {
    for (let i = 0; i < aScroll.length; i++) {
      liScroll[i].classList.remove('active');
    }
    liOverA = event.target.closest('li');
    liOverA.classList.add('active');
  });
});

/* ___________________________________________________ */

// Слайдер
$(document).ready(function () {
  $('.slider').slick({
    arrows: false,
    dots: false,
    slidesToShow: 4,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 915,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  });
});

/* ___________________________________________________ */
