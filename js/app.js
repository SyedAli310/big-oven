let x = null
$('.hamburger').on('click',(e)=>{
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