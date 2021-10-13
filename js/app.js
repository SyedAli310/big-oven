$('.hamburger').on('click',(e)=>{
    $('body').toggleClass('responsive')
    $('.navbar').toggleClass('responsive')
    $('.hamburger').toggleClass('responsive')
    $('.nav-links').toggleClass('responsive')
    if(e.target.name == 'menu-outline'){
        e.target.name = 'close-outline'
    }
    else if(e.target.name=='close-outline'){
        e.target.name = 'menu-outline'
    }
})

$('.login-btn').on('click',()=>{
    netlifyIdentity.open();
})
