const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let chores = [];
let total;

let theid;
let idURL = `http://localhost:5150/chores/${theid}`





const base_url = 'http://localhost:5150/chores';
// const chores = [
//     {
//       image: '../public/images/laundryIcon.png',
//       host: 'John Smith',
//       profile: 'unknown.png'
//     },
  
//     {
//       image: '../public/images/trashIcon.png',
//       host: 'Jesse Roberts',
//       profile: 'unknown.png'
//     },
  
//     {
//       image: '../public/images/dishesIcon.png',
//       host: 'Emily James',
//       profile: 'unknown.png'
//     }
//   ];


window.addEventListener('DOMContentLoaded', async ()=>{
  await fetchPosts();
  loadPosts();
  // await deleteChore();
  // loadPaginationBtns();
   changeId();
});


function markDone() {


}

async function fetchPosts() {
  let url = base_url;
  try {
      const response = await fetch(url);
      if(!response.ok)
          throw Error(`Error ${response.url} ${response.statusText}`);
      chores = await response.json();
      console.log(chores);
      // console.log(total);
      // console.log(chores);
  }catch(error) {
    console('fatal error')
      // errorContainer.firstChild.textContent = error.message;
      // errorContainer.classList.remove('hidden');

  }
}

const date = new Date();
let day = weekday[date.getDay()];

const header = document.querySelector('h2');
header.textContent = day + "'s Chores"



function addChores(chore) {
  const choresList = document.querySelector('.choresList')

    const li = document.createElement('li');
    const choreImg = document.createElement('img');
    choreImg.classList.add('choreIcon');
    choreImg.src = chore.image

    const divider = document.createElement('div');
    divider.classList.add('divider');

    const profileImg = document.createElement('img');
    profileImg.classList.add('profilePic');
    profileImg.src = chore.profile
    profileImg.alt = 'profile pic'

    const name = document.createElement('span');
    name.textContent = chore.host;

    const idElement = document.createElement('p');
    idElement.textContent = chore.id;
    idElement.classList.add('hidden')

    

   

    const deleteIcon = document.createElement('i');
   deleteIcon.classList.add("fa-solid");
   deleteIcon.classList.add("fa-trash");
   deleteIcon.classList.add("deleteIcon");

   deleteIcon.addEventListener('click',  changeId());

   


    li.append(choreImg,divider,profileImg,name, idElement, deleteIcon);


    choresList.append(li);

}

// chores.forEach(chore=> {
//   console.log('1')
//     addChores(chore)
// });

function loadPosts() {
  chores.forEach(chore=>addChores(chore));


}




const newButton = document.querySelector('#addButton');

const form = document.querySelector('form');

newButton.addEventListener('click', e => {
    form.classList.toggle('hidden');
   
});

const submitBtn = document.querySelector('#submit');


async function addChore(e) {
    e.preventDefault();
    if(form.reportValidity()) {
        let image = document.querySelector('select').value;
        if (image==='Take out trash') {
            image = '../public/images/trashIcon.png'
        } else if (image==='Wash Dishes') {
            image = '../public/images/dishesIcon.png'

        } else if (image==='Laundry') {
            image = '../public/images/laundryIcon.png'
        }
          else if (image==='Vacuum') {
                image = '../public/images/vacuumIcon.png'
          }
        // console.log(chore);
        let host = document.getElementById('host').value;
        let newChore = { image, host};
        newChore = JSON.stringify(newChore);
        console.log(newChore);
        try {
          const response = await fetch(base_url, 
              {
                  method: "POST", 
                  headers: {"Content-Type": "application/json"},
                  body: newChore
              });
          if(!response.ok) {
              throw Error(`Error ${response.base_url} ${response.statusText}`);
          }
                  
          window.location.href = '../views/chores.html';
      } catch(error) {
          console.log(error.message)
  
      }

        // chores.push(newChore);
        // addChores(newChore);

        document.getElementById('host').value = '';

    }
}
submitBtn.addEventListener('click', addChore);

function changeId() {

  const choresList = document.querySelector('.choresList')

  const allChores = choresList.querySelectorAll('li');
  // console.log(allChores)

  allChores.forEach(e => {
    e.addEventListener('click', () => {
      theid =  e.querySelector('p').textContent;
      console.log('chore number:' + theid);
      deleteChore();

  }
)
})

}


async function deleteChore(id) {

       
try {
  const response = await fetch(`http://localhost:5150/chores/${theid}`, {method: "DELETE"});
  if(!response.ok)
      throw Error(`Error ${response.url} ${response.statusText}`); 
      window.location.href = '../views/chores.html';

  // window.location.href ='/';   
} catch(error) {
  console.log('fatal error:' + error.message)
}

}
