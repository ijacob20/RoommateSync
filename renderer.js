const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
  }
  

  // Below shows how you can get information from preload.js and change the page dynamically

  // const information = document.querySelector('#test')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
  func()



const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

const eventHeader = document.querySelector(".event-header");





// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    /* for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    } */

    // Determines what day of the month it is currently
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday;

        // checks if the i is equal to the current day of the month, 
        // if so label the current days element as active
        if(i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()){
            isToday = "active";            
        }else{
            isToday = "";
        }
        // adds the either active or "" as a class to the li and adds all days of the month as the element of the li
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // TODO: make this an firstDayofMonth into a method, with 6 and lastDayofMonth/firstDayofMonth as parameters
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

    /* daysTagli.addEventListener("click", () => {
        console.log("test");
    });
 */
    const month = months[currMonth];
    const daysTagli = document.querySelectorAll(".days > li");

    // upon start up sets the event header text = the selected date
    switch (date.getDate()) {
        case 1 || 21 || 31:
            eventHeader.innerHTML = `${month} ${date.getDate()}st Event:`
            break;
        case 2 || 22:
            eventHeader.innerHTML = `${month} ${date.getDate()}nd Event:`
            break;
        case 3 || 23:
            eventHeader.innerHTML = `${month} ${date.getDate()}rd Event:`
            break;
      default:
            eventHeader.innerHTML = `${month} ${date.getDate()}th Event:`
    }
    

    /* const daysli = document.querySelector(".days li");

    daysli.classList.toggle("hidden"); */

    for (let i = 0; i < daysTagli.length; i++) {
        

        daysTagli[i].addEventListener("click", function() {
            console.log(daysTagli[i]);
            console.log(daysTagli[i].innerHTML);
            console.log(date.getDate().innerHTML);

            daysTagli[i].classList.toggle("selected-day"); 
            //selected-day

            /* switch (daysTagli[i].innerHTML) {
                case 1 || 21 || 31:
                    console.log('st')
                    eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}st Event:`
                    break;
                case 2 || 22:
                    eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}nd Event:`
                    break;
                case 3 || 23:
                    eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}rd Event:`
                    break;
              default:
                console.log('th');
                eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}th Event:`
            } */

            // sets the event header text = the selected date
            switch (daysTagli[i].innerHTML) {
                case '1': 
                case '21':
                case '31':
                    eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}st Event:`
                    break;
                case '2':
                case '22':
                    eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}nd Event:`
                    break;
                case '3':
                case '23':
                    eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}rd Event:`
                    break;
              default:
                    eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}th Event:`
            }

            /* if(daysTagli[i].innerHTML == 1 || daysTagli[i].innerHTML == 21 || daysTagli[i].innerHTML == 31){
                eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}st Event:`
            }else if(daysTagli[i].innerHTML == 2 || daysTagli[i].innerHTML == 22){
                eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}nd Event:`
            }else if(daysTagli[i].innerHTML == 3 || daysTagli[i].innerHTML == 23){
                eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}rd Event:`
            }else{
                eventHeader.innerHTML = `${months[currMonth]} ${daysTagli[i].innerHTML}th Event:`
            } */
            
        });
    }

    const eventTitle = document.querySelector(".event-title-container");
    const eventTitleDesc = document.querySelector(".event-title-container div h2");
    const eventInput = document.querySelector(".event-input-container");
    const plusIcon = document.querySelector(".plus");

    /* eventInput.style.display = "none"; */
    /* eventTitle.style.display = "none"; */

    plusIcon.addEventListener("click", function() {

        eventTitle.classList.toggle("hidden");
        console.log(eventTitle.style.display);

        eventInput.classList.toggle("hidden");
        console.log(eventInput.style.display);

        /* if(eventTitle.style.display == "none"){
            eventTitle.style.removeProperty( 'display' ); 
            console.log("remove");
        }else{
            eventTitle.style.display = "none";
            console.log("none");
        }
 */ 
        /* eventTitle.style.display = eventTitle.style.display === 'none' ? '' : 'none'; */

        /* if(eventTitle.style.display == "none"){
            eventTitle.style.removeProperty( 'display' ); 
            //console.log("remove");
        }else{
            eventTitle.style.display = "none";
            //console.log("none");
         } */



        /* if(eventInput.style.display === "none"){
            eventInput.style.removeProperty( 'display' ); 
            //console.log("remove2");
        }else{
            eventInput.style.display = "none";
            //console.log("none2");
        } */

        
    });

   

}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});