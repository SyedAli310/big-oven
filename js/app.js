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

$('.login-btn').on('click',()=>{
    netlifyIdentity.open();
})
