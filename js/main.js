let mainColor = localStorage.getItem("color_option");


if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
}


let backgroundOption = true;

let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if(backgroundLocalItem !== null) {
    
    if(backgroundLocalItem === 'true') {
        backgroundOption = true;
    }
    else{
        backgroundOption = false;
    };
};


document.querySelectorAll(".random-b-g span").forEach(element => {

    element.classList.remove('active');
});


if(backgroundLocalItem === 'true') {

    document.querySelector('.yes').classList.add('active');
}
else {
    document.querySelector('.no').classList.add('active');
}

let landigPage = document.querySelector('.landing-page');


let imgeArray = ["01.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"];


 
   
  randomizeImges= ()=> {
    if(backgroundOption === true) {
        backgroundInterval = setInterval(()=> {
    
            let randomNumber = Math.floor(Math.random() * imgeArray.length);
        
            landigPage.style.backgroundImage = 'url("imges/'+ imgeArray[randomNumber]+'")'
        
        },5000);
    }
  }
    randomizeImges();


const colorLi = document.querySelectorAll('.color-list li');

colorLi.forEach(li => {
  
    li.addEventListener("click", (e)=> {
 
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
      
        localStorage.setItem("color_option",e.target.dataset.color);

        e.target.parentElement.querySelectorAll('.active').forEach(element => {

            element.classList.remove('active');
        });
   
        e.target.classList.add('active');
    });
});



const randomBackEl = document.querySelectorAll('.random-b-g span');

randomBackEl.forEach(span => {
  
    span.addEventListener("click", (e)=> {
 
        e.target.parentElement.querySelectorAll('.active').forEach(element => {

            element.classList.remove('active');
        });
      
        e.target.classList.add('active');

            if(e.target.dataset.background == 'yes') {

                backgroundOption = true;
                randomizeImges();

                localStorage.setItem("background_option",true);
            }else {
                backgroundOption = false;
             clearInterval(backgroundInterval);

             localStorage.setItem("background_option",false);
            }
    });
});

// dark theme
 theme = ()=> {
    let darkMood = document.body;

    darkMood.classList.toggle('mood');

    let themes;
    if( darkMood.classList.contains('mood') ) {
        themes = 'DARK';
    }
    else {
        themes = 'LIGHT';
    }

    localStorage.setItem("body_theme", JSON.stringify(themes));
};

let getTheme = JSON.parse(localStorage.getItem("body_theme"));

if(getTheme === 'DARK'){
    document.body.classList = 'mood';
};



let skillsSection = document.querySelector('.skills');

window.onscroll = function () {

    // skills offset top
    let skillsOffsetTop = skillsSection.offsetTop;

    // skills outer height
    let skillsOuterHeight = skillsSection.offsetHeight;

    // skills window height
    let skillsWindowHeight = this.innerHeight;

    // window scrollTop
    let windoScrollTop = this.pageYOffset;

    if(windoScrollTop > (skillsOffsetTop + skillsOuterHeight - skillsWindowHeight)) {

        let allSkills = document.querySelectorAll('.skills-box .skill-progress span');

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    };
};



// Create popup With Img
let ourGallary = document.querySelectorAll('.gallary img');

ourGallary.forEach(img => {

    img.addEventListener("click", (e)=> {
        
        let overlay = document.createElement('div');

        overlay.className = 'popup-overlay';

        document.body.append(overlay);

        let popupBox = document.createElement('div');

        popupBox.className = 'popup-box';

        let popupImge = document.createElement('img');

        popupImge.src = img.src;

        popupBox.appendChild(popupImge);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement('span');

        let closeBtnText = document.createTextNode('x'); 

        closeButton.appendChild(closeBtnText);

        closeButton.className = 'close-button';

        popupBox.appendChild(closeButton);

    });
});

// Remove popup
document.addEventListener("click", (e)=> {

    if(e.target.className == "close-button") {

        e.target.parentNode.remove();

        document.querySelector('.popup-overlay').remove();
    }
});


const allBullets = document.querySelectorAll('.nav-bullets .bullets');

allBullets.forEach(bullet => {

    bullet.addEventListener("click", (e)=> {

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior:'smooth'
        });
    });
});

document.querySelector('.reset-option').onclick = function () {

    localStorage.clear();

    window.location.reload();
};