function openNav() {
  document.getElementById("theSidePanel").style.width = "50vw";
  document.getElementById("main").style.marginLeft = "50vw";
  $('.timer').animate({
    'font-size':'3vw'
  },1000);
  $('.timer-container').animate({
    'left':'70%'
  },1000);

  $('.timer-labels').animate({
    'font-size':'0.8vw'
  },1000);
  $('.timer-labels').animate({
    'margin-left':'-0.5vw'
  },1000);
}

function closeNav() {
  document.getElementById("theSidePanel").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  $('.timer').animate({
    'font-size':'6vw'
  },1000);
  $('.timer-container').animate({
    'left':'50%'
  },1000);

  $('.timer-labels').animate({
    'font-size':'1.5vw'
  },1000);
  $('.timer-labels').animate({
    'margin-left':'-1vw'
  },1000);
}

$('#main').click(function() {
  closeNav();
});

$('#close-button').click(function()
{
  closeNav();
});

$('#menu-button').click(function(e)
{
  openNav();
  e.stopPropagation();
});
