// Получаем элементы интерфейса
const input = document.getElementById("input"); // поле ввода
const button = document.getElementById("button"); // кнопка поиска
const result = document.getElementById("result"); // блок для отображения результата

// Функция для отправки запроса к API
function searchCat(breed) {
  // Создаем объект XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Открываем соединение с API
  xhr.open(
    "GET",
    "https://api.thecatapi.com/v1/breeds/search?q=" + breed,
    true
  );
  // Устанавливаем заголовок с ключом API
  xhr.setRequestHeader("x-api-key", "YOUR_API_KEY");
  // Обрабатываем ответ от API
  xhr.onload = function () {
    // Проверяем статус ответа
    if (xhr.status === 200) {
      // Парсим JSON в объект
      const data = JSON.parse(xhr.responseText);
      // Проверяем, есть ли результат поиска
      if (data.length > 0) {
        // Берем первый элемент из массива результатов
        const cat = data[0];
        // Отображаем информацию о коте на экране
        displayCat(cat);
      } else {
        // Сообщаем, что кот не найден
        result.innerHTML = "Кот не найден";
      }
    } else {
      // Сообщаем, что произошла ошибка при запросе к API
      result.innerHTML = "Ошибка при запросе к API";
    }
  };
  // Отправляем запрос
  xhr.send();
}

// Функция для отображения информации о коте на экране
function displayCat(cat) {
  // Создаем элементы для отображения информации о коте
  const h1 = document.createElement("h1"); // заголовок с названием кота
  const img = document.createElement("img"); // изображение кота
  const p = document.createElement("p"); // абзац с описанием кота
  const ul = document.createElement("ul"); // список с характеристиками кота

  // Заполняем элементы данными из объекта cat
  h1.textContent = cat.name;
  img.src = cat.image.url;
  img.alt = cat.name;
  p.textContent = cat.description;
  ul.innerHTML = `
    <li>Темперамент: ${cat.temperament}</li>
    <li>Страна происхождения: ${cat.origin}</li>
    <li>Средняя продолжительность жизни: ${cat.life_span} лет</li>
    <li>Уровень энергии: ${cat.energy_level}</li>
    <li>Уровень интеллекта: ${cat.intelligence}</li>
  `;

  // Очищаем блок результата от предыдущего содержимого
  result.innerHTML = "";
  // Добавляем созданные элементы в блок результата
  result.appendChild(h1);
  result.appendChild(img);
  result.appendChild(p);
  result.appendChild(ul);
}

// Добавляем обработчик события клика на кнопку поиска
button.addEventListener("click", function () {
  // Получаем введенную породу кота из поля ввода
  const breed = input.value;
  // Проверяем, что поле ввода не пустое
  if (breed) {
    // Вызываем функцию поиска кота по породе
    searchCat(breed);
  } else {
    // Сообщаем, что нужно ввести породу кота
    result.innerHTML