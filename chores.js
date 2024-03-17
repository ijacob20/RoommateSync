const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const chores = [
    {
      image: '../public/images/laundryIcon.png',
      host: 'John Smith',
      profile: 'unknown.png'
    },
  
    {
      image: '../public/images/trashIcon.png',
      host: 'Jesse Roberts',
      profile: 'unknown.png'
    },
  
    {
      image: '../public/images/dishesIcon.png',
      host: 'Emily James',
      profile: 'unknown.png'
    }
  ];

const date = new Date();
let day = weekday[date.getDay()];

const header = document.querySelector('h2');
header.textContent = day + "'s Chores"


const choresList = document.querySelector('.choresList')

function addChores(chore) {
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

    li.append(choreImg,divider,profileImg,name);


    choresList.append(li);

}

chores.forEach(chore=> {
    addChores(chore)
});
// choresWrapper.addEventListener('click', e => {
//       const articleElement = e.target;
//     //   let index = articles.findIndex(article=>article.title === articleElement.querySelector('h3').textContent);
//     //   articles.splice(index, 1);
//       articleElement.remove();
    
//   });


const newButton = document.querySelector('button');

const form = document.querySelector('form');

newButton.addEventListener('click', e => {
    form.classList.remove('hidden');
   
});

const submitBtn = document.querySelector('#submit');


function addChore(e) {
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
        console.log(host);
        let newChore = { image, host};
        chores.push(newChore);
        console.log(chores);
            addChores(newChore)
    }
}
submitBtn.addEventListener('click', addChore);