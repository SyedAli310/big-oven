$('.hamburger').on('click',()=>{
    $('.navbar').toggleClass('responsive')
    $('.nav-links').toggleClass('responsive')
    $('.hamburger').toggleClass('responsive')
    console.log($('.hamburger').attr('name'))
})