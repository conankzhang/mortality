function openNav()
{
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

function closeNav()
{
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
  document.getElementById("updateBadge").style.display = "none";
}

$('#main').click(function()
{
  closeNav();
});

$('#closeButton').click(function()
{
  closeNav();
});

$('#menu-button').click(function(e)
{
  openNav();
  e.stopPropagation();

  if(localStorage.getItem("dob")===null)
  {
    setButtonPressed(2);
  }
  //UPDATE WHEN REVVING VERSIONS
  else if(localStorage.getItem("version")=="4.1.0")
  {
    var lastOptionView = localStorage.getItem("lastOptionView");
    if( lastOptionView === null )
    {
      lastOptionView = 0;
    }
    setButtonPressed(lastOptionView);
  }
  else
  {
    setButtonPressed(1);
    localStorage.setItem("version", "4.1.0");
  }

  // if(document.getElementById("info-img").src.indexOf("assets/infoWhiteAlert.png") > -1)
  // {
  //   document.getElementById("info-img").src = "assets/infoWhite.png"
  // }
  // else if(document.getElementById("info-img").src.indexOf("assets/infoBlackAlert.png") > -1)
  // {
  //   document.getElementById("info-img").src = "assets/infoBlack.png"
  // }
});


///////////////////////
// SidePanel Navigation
///////////////////////

$("#aboutButton").click(function()
{
  unlessDOBMissingGoToButtonNumber(0);
});

$("#updatesButton").click(function()
{
  unlessDOBMissingGoToButtonNumber(1);
});

$("#themeButton").click(function()
{
  unlessDOBMissingGoToButtonNumber(2);
});

$("#settingsButton").click(function()
{
  unlessDOBMissingGoToButtonNumber(3);
});

function unlessDOBMissingGoToButtonNumber(button)
{
  localStorage.setItem("lastOptionView", button);

  if(localStorage.getItem("dob")===null)
  {
    setButtonPressed(3);
  }
  else
  {
    setButtonPressed(button);
  }
}

function setButtonPressed(button)
{
  var aboutButton = document.querySelector("#aboutButton");
  var updatesButton = document.querySelector("#updatesButton");
  var themeButton = document.querySelector('#themeButton');
  var settingsButton = document.querySelector("#settingsButton");
  var sidepanelBody = document.querySelector('#sidepanelBody');

  if (button == 0)
  {
    sidepanelBody.innerHTML = window.app.getTemplateScript('about')();
    aboutButton.className = "PressedButton";
    updatesButton.className = "UnpressedButton";
    themeButton.className = "UnpressedButton";
    settingsButton.className = "UnpressedButton";
  }
  else if (button == 1)
  {
    sidepanelBody.innerHTML = window.app.getTemplateScript('updates')();
    aboutButton.className = "UnpressedButton";
    updatesButton.className = "PressedButton";
    themeButton.className = "UnpressedButton";
    settingsButton.className = "UnpressedButton";
  }
  else if (button == 2)
  {
    sidepanelBody.innerHTML = window.app.getTemplateScript('theme')();
    aboutButton.className = "UnpressedButton";
    updatesButton.className = "UnpressedButton";
    themeButton.className = "PressedButton";
    settingsButton.className = "UnpressedButton";

    setupThemes();
  }
  else
  {
    sidepanelBody.innerHTML = window.app.getTemplateScript('settings')();
    aboutButton.className = "UnpressedButton";
    updatesButton.className = "UnpressedButton";
    themeButton.className = "UnpressedButton";
    settingsButton.className = "PressedButton";

    setupSettings(window.app.dob, window.app.dobMinutes);
  }
}


function loadCheckBoxes()
{
  var dobTimeCheckbox = document.querySelector('input[id=dobTimeCheckbox]');
  if (localStorage.getItem("dobTimeSet") == "YES") {
    dobTimeCheckbox.checked = true;
  }
  showDOBTimeSelectorIf(dobTimeCheckbox.checked);

  dobTimeCheckbox.addEventListener('change', function () {
    showDOBTimeSelectorIf(dobTimeCheckbox.checked);
    localStorage.setItem("dobTimeSet", dobTimeCheckbox.checked?"YES":"NO");
  });

  var dodTimeCheckbox = document.querySelector('input[id=dodTimeCheckbox]');
  if (localStorage.getItem("dodTimeSet") == "YES") {
    dodTimeCheckbox.checked = true;
  }
  showDODTimeSelectorIf(dodTimeCheckbox.checked);

  dodTimeCheckbox.addEventListener('change', function () {
    showDODTimeSelectorIf(dodTimeCheckbox.checked);
    localStorage.setItem("dodTimeSet", dodTimeCheckbox.checked?"YES":"NO");
  });

  var takeSurveyCheckbox = document.querySelector('input[id=takeSurveyCheckbox]');
  if (localStorage.getItem("surveyDOD") == "YES") {
    takeSurveyCheckbox.checked = true;
  }
  showSurveyIf(takeSurveyCheckbox.checked);

  takeSurveyCheckbox.addEventListener('change', function () {
    showSurveyIf(takeSurveyCheckbox.checked);
    localStorage.setItem("surveyDOD", takeSurveyCheckbox.checked?"YES":"NO");
  });

  var dailyCountdownCheckbox = document.querySelector('input[id=dailyCountdownCheckbox]');
  if (localStorage.getItem("dailyCountdown") == "YES") {
    dailyCountdownCheckbox.checked = true;
  }
  disableDODDateIf(dailyCountdownCheckbox.checked);

  dailyCountdownCheckbox.addEventListener('change', function () {
    disableDODDateIf(dailyCountdownCheckbox.checked);
    localStorage.setItem("dailyCountdown", dailyCountdownCheckbox.checked?"YES":"NO");
  });

  var hideProgressCheckbox = document.querySelector('input[id=hideProgressCheckbox]');
  if (localStorage.getItem("hideProgress") == "YES") {
    hideProgressCheckbox.checked = true;
  }

  hideProgressCheckbox.addEventListener('change', function () {
    localStorage.setItem("hideProgress", hideProgressCheckbox.checked?"YES":"NO");
  });

  var twentyFourCheckbox = document.querySelector('input[id=twentyFourCheckbox]');
  if (localStorage.getItem("twentyFour") == "YES") {
    twentyFourCheckbox.checked = true;
  }

  twentyFourCheckbox.addEventListener('change', function () {
    localStorage.setItem("twentyFour", twentyFourCheckbox.checked?"YES":"NO");
  });
}
