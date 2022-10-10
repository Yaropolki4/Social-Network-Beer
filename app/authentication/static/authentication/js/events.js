notificButton = document.querySelector('.nav-item_notifications');
nav = document.querySelector('.nav');
borderButton = document.querySelector('.nav-close-notifications');
notifications = document.querySelector('.nav-notifications');

friendsButton = document.querySelector('.nav-item_friends');
friends = document.querySelector('.nav-friends');


notificButton.addEventListener('click', (event)=>{
    nav.classList.add('visible');
    borderButton.classList.add('visible');
    notifications.classList.add('visible');
});

friendsButton.addEventListener('click', event =>{
    nav.classList.add('visible');
    borderButton.classList.add('visible');
    friends.classList.add('visible');
});

borderButton.addEventListener('click', event =>{
    nav.classList.remove('visible');
    borderButton.classList.remove('visible');
    notifications.classList.remove('visible');
});