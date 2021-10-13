$('.hamburger').on('click',(e)=>{
    $('body').toggleClass('responsive')
    $('.navbar').toggleClass('responsive')
    $('.hamburger').toggleClass('responsive')
    $('.nav-links').toggleClass('responsive')
    if($('.hamburger ion-icon').attr('name') == 'menu-outline'){
        $('.hamburger ion-icon').attr('name','close-outline')
    }
    else if($('.hamburger ion-icon').attr('name') =='close-outline'){
        $('.hamburger ion-icon').attr('name','menu-outline') 
    }
})

netlifyIdentity.on('init', user => console.log('init netlify identity'))

function checkUserStatus(){
    const user = netlifyIdentity.currentUser();
    //console.log(user);
    if(user != null){
        $('.login-btn')
        .html(`
        <ion-icon name="person-circle-outline" style='font-size:larger;'></ion-icon>
        <span>&nbsp;${user.user_metadata.full_name}</span>
        `)
        $('#welcome-msg').html(`Welcome,<span class='welcome-username'>&nbsp;${user.user_metadata.full_name}</span>`)
    }
    else{
        $('.login-btn')
        .html(`
        Join/Login
        `) 
        $('#welcome-msg').html(`Welcome`)
    }
}
checkUserStatus()

$('.login-btn').on('click',()=>{
    netlifyIdentity.open();
});

netlifyIdentity.on('login', user => {
    netlifyIdentity.close();
    checkUserStatus()
});

netlifyIdentity.on('logout', () => {
    netlifyIdentity.close();
    checkUserStatus()
});


