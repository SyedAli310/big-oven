$('.hamburger').on('click',()=>{
    $('.navbar').toggleClass('responsive')
    $('.nav-links').toggleClass('responsive')
    console.log($('.hamburger').attr('name'))
})