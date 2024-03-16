const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const date = new Date();
let day = weekday[date.getDay()];

const information = document.querySelector('#date');
information.textContent = day + "'s Chores"