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

function showDOBTimeSelectorIf(isChecked)
{
  if (isChecked) {
      $('#dobTimeInput').show();
  } else {
      $('#dobTimeInput').hide();
  }
}

function showDODTimeSelectorIf(isChecked)
{
  if (isChecked) {
      $('#dodTimeInput').show();
      $('#dailyCountdownCheckboxContainer').show();
  } else {
      $('#dailyCountdownCheckbox').prop('checked', false);
      disableDODDateIf(false);
      localStorage.setItem("dailyCountdown", "NO");
      $('#dodTimeInput').hide();
      $('#dailyCountdownCheckboxContainer').hide();
  }
}

function disableDODDateIf(isChecked)
{
  if (isChecked) {
      $('#dodInput').prop('disabled', true);
      $('#dodLabel').addClass("DisabledLabel");
  } else {
      $('#dodInput').prop('disabled', false);
      $('#dodLabel').removeClass("DisabledLabel");
  }
}

function showSurveyIf(isChecked)
{
  if( isChecked ) {
    $('#specifyDeathContainer').hide();
    $('#surveyDeathContainer').show();
  } else {
    $('#surveyDeathContainer').hide();
    $('#specifyDeathContainer').show();
  }
}

function swapPrecisionSelect(timerType)
{
  if( timerType == "timer" )
  {
    $("#timerPrecisionContainer").show();
    $("#clockPrecisionContainer").hide();
    $("#populationPrecisionContainer").hide();
  }
  else if( timerType == "clock" )
  {
    $("#timerPrecisionContainer").hide();
    $("#clockPrecisionContainer").show();
    $("#populationPrecisionContainer").hide();
  }
  else if( timerType == "population")
  {
    $("#timerPrecisionContainer").hide();
    $("#clockPrecisionContainer").hide();
    $("#populationPrecisionContainer").show();
  }
}

function displayExtraSettingsContainer()
{
  var extraTimerSettingsSegmentedControl1 = $("#extraTimerSettingsSegmentedControl > input:nth-child(1)");
  var extraTimerSettingsSegmentedControl2 = $("#extraTimerSettingsSegmentedControl > input:nth-child(2)");
  var extraTimerSettingsSegmentedControl3 = $("#extraTimerSettingsSegmentedControl > input:nth-child(3)");

  if( extraTimerSettingsSegmentedControl1.is(":checked") ) {
    $("#spentTimerContainer").hide();
    $("#leftTimerContainer").hide();
    $("#peopleTimerContainer").hide();
    $("#clockTimerContainer").show();
    $("#precisionContainer").show();
    $("#precisionLabel").text("Clock Precision");
    swapPrecisionSelect("clock");
    localStorage.setItem("timerSetting", "clock");
  }

  else if( extraTimerSettingsSegmentedControl2.is(":checked") ) {
    $("#spentTimerContainer").hide();
    $("#leftTimerContainer").hide();
    $("#clockTimerContainer").hide();
    $("#peopleTimerContainer").show();
    $("#precisionContainer").show();
    $("#precisionLabel").text("Population Precision");
    swapPrecisionSelect("population");
    localStorage.setItem("timerSetting", "population");
  }

  else if( extraTimerSettingsSegmentedControl3.is(":checked") ) {
    $("#spentTimerContainer").hide();
    $("#leftTimerContainer").hide();
    $("#clockTimerContainer").hide();
    $("#peopleTimerContainer").hide();
    $("#precisionContainer").hide();
    localStorage.setItem("timerSetting", "hide");
  }
}

function loadSegmentedControls()
{
  var timerSettingsSegmentedControl1 = $("#timerSettingsSegmentedControl > input:nth-child(1)");
  var timerSettingsSegmentedControl2 = $("#timerSettingsSegmentedControl > input:nth-child(2)");
  var timerSettingsSegmentedControl3 = $("#timerSettingsSegmentedControl > input:nth-child(3)");

  var extraTimerSettingsSegmentedControl1 = $("#extraTimerSettingsSegmentedControl > input:nth-child(1)");
  var extraTimerSettingsSegmentedControl2 = $("#extraTimerSettingsSegmentedControl > input:nth-child(2)");
  var extraTimerSettingsSegmentedControl3 = $("#extraTimerSettingsSegmentedControl > input:nth-child(3)");

  timerSettingsSegmentedControl1.change( function () {
    if( timerSettingsSegmentedControl1.is(":checked") ) {
      $("#extraTimerSettingsSegmentedControl").fadeOut(1);
      $("#spentTimerContainer").show();
      $("#leftTimerContainer").hide();
      $("#peopleTimerContainer").hide();
      $("#clockTimerContainer").hide();
      $("#precisionContainer").show();
      $("#precisionLabel").text("Timer Precision");
      swapPrecisionSelect("timer");
      localStorage.setItem("timerSetting", "spent");
    }
  });

  timerSettingsSegmentedControl2.change( function () {
    if( timerSettingsSegmentedControl2.is(":checked") ) {
      $("#extraTimerSettingsSegmentedControl").fadeOut(1);
      $("#spentTimerContainer").fadeOut(1);
      $("#leftTimerContainer").fadeIn(1);
      $("#peopleTimerContainer").hide();
      $("#clockTimerContainer").hide();
      $("#precisionContainer").show();
      $("#precisionLabel").text("Timer Precision");
      swapPrecisionSelect("timer");
      localStorage.setItem("timerSetting", "left");
    }
  });

  timerSettingsSegmentedControl3.change( function () {
    if( timerSettingsSegmentedControl3.is(":checked") ) {
      $("#extraTimerSettingsSegmentedControl").addClass("borderless-segmented-control");
      $("#extraTimerSettingsSegmentedControl").hide().fadeIn(500);
      $("#extraTimerSettingsSegmentedControl").removeClass("borderless-segmented-control");
      displayExtraSettingsContainer();
    }
  });

  extraTimerSettingsSegmentedControl1.change( function () {
    displayExtraSettingsContainer();
  });

  extraTimerSettingsSegmentedControl2.change( function () {
    displayExtraSettingsContainer();
  });

  extraTimerSettingsSegmentedControl3.change( function () {
    displayExtraSettingsContainer();
  });

  if( localStorage.getItem("timerSetting") == "left" ) {
      $('#timerSettingsSegmentedControl > input:nth-child(2)').prop('checked', true);
      $("#spentTimerContainer").fadeOut(1);
      $("#leftTimerContainer").fadeIn(1);
      $("#precisionContainer").show();
      $("#precisionLabel").text("Timer Precision");
      swapPrecisionSelect("timer");
  }
  else if( localStorage.getItem("timerSetting") == "clock" || localStorage.getItem("timerSetting") == "population" || localStorage.getItem("timerSetting") == "hide" ) {
    $('#timerSettingsSegmentedControl > input:nth-child(3)').prop('checked', true);
    $("#extraTimerSettingsSegmentedControl").addClass("borderless-segmented-control");
    $("#extraTimerSettingsSegmentedControl").hide().fadeIn(500);
    $("#extraTimerSettingsSegmentedControl").removeClass("borderless-segmented-control");

    if( localStorage.getItem("timerSetting") == "population" ) {
      $('#extraTimerSettingsSegmentedControl > input:nth-child(2)').prop('checked', true);
    }
    else if( localStorage.getItem("timerSetting") == "hide" ) {
      $('#extraTimerSettingsSegmentedControl > input:nth-child(3)').prop('checked', true);
    }
    displayExtraSettingsContainer();
  }
  var chapterPrecisionSegmentedControl1 = $("#chapterPrecisionSegmentedControl > input:nth-child(1)");
  var chapterPrecisionSegmentedControl2 = $("#chapterPrecisionSegmentedControl > input:nth-child(2)");
  var chapterPrecisionSegmentedControl3 = $("#chapterPrecisionSegmentedControl > input:nth-child(3)");
  var chapterPrecisionSegmentedControl4 = $("#chapterPrecisionSegmentedControl > input:nth-child(4)");

  if( localStorage.getItem("chapterPrecision") === null ){
    localStorage.setItem("chapterPrecision", "months");
  }

  chapterPrecisionSegmentedControl1.change( function () {
    if( chapterLengthSegmentedControl1.is(":checked") ) {
      localStorage.setItem("chapterPrecision", "days");
    }
  });

  chapterPrecisionSegmentedControl2.change( function () {
    if( chapterPrecisionSegmentedControl2.is(":checked") ) {
      localStorage.setItem("chapterPrecision", "weeks");
    }
  });

  chapterPrecisionSegmentedControl3.change( function () {
    if( chapterPrecisionSegmentedControl3.is(":checked") ) {
      localStorage.setItem("chapterPrecision", "months");
    }
  });

  chapterPrecisionSegmentedControl4.change( function () {
    if( chapterPrecisionSegmentedControl4.is(":checked") ) {
      localStorage.setItem("chapterPrecision", "years");
    }
  });

  if( localStorage.getItem("chapterPrecision") == "days" ) {
      $('#chapterPrecisionSegmentedControl > input:nth-child(1)').prop('checked', true);
  }
  else if( localStorage.getItem("chapterPrecision") == "weeks" ) {
      $('#chapterPrecisionSegmentedControl > input:nth-child(2)').prop('checked', true);
  }
  else if( localStorage.getItem("chapterPrecision") == "months" ) {
      $('#chapterPrecisionSegmentedControl > input:nth-child(3)').prop('checked', true);
  }
  else if( localStorage.getItem("chapterPrecision") == "years" ) {
      $('#chapterPrecisionSegmentedControl > input:nth-child(4)').prop('checked', true);
  }

  var chapterLengthSegmentedControl1 = $("#chapterLengthSegmentedControl > input:nth-child(1)");
  var chapterLengthSegmentedControl2 = $("#chapterLengthSegmentedControl > input:nth-child(2)");

  chapterLengthSegmentedControl1.change( function () {
    if( chapterLengthSegmentedControl1.is(":checked") ) {
      $("#chapterLengthsFixedContainer").fadeOut(1, function() {
        $("#chapterLengthsSpecifyContainer").fadeIn(1);
        localStorage.setItem("fixedChapters", "NO");
      });
    }
  });

  chapterLengthSegmentedControl2.change( function () {
    if( chapterLengthSegmentedControl2.is(":checked") ) {
      $("#chapterLengthsSpecifyContainer").fadeOut(1);
      $("#chapterLengthsFixedContainer").fadeIn(1);
      localStorage.setItem("fixedChapters", "YES");
    }
  });

  if( localStorage.getItem("fixedChapters") == "YES" )
  {
    $('#chapterLengthSegmentedControl > input:nth-child(2)').prop('checked', true);
    $("#chapterLengthsSpecifyContainer").fadeOut(1);
    $("#chapterLengthsFixedContainer").fadeIn(1);
  }
}

function loadRadioButtons()
{
  var youngerOption = document.querySelector('input[id=youngerOption]');
  var olderOption = document.querySelector('input[id=olderOption]');
  if (localStorage.getItem("youngerOption") == "YES") {
    youngerOption.checked = true;
  }
  else {
    olderOption.checked = true;
  }

  youngerOption.addEventListener('change', function () {
    localStorage.setItem("youngerOption", youngerOption.checked?"YES":"NO");
  });

  olderOption.addEventListener('change', function () {
    localStorage.setItem("youngerOption", olderOption.checked?"NO":"YES");
  });


  var circleOption = document.querySelector('input[id=circleOption]');
  var squareOption = document.querySelector('input[id=squareOption]');
  if (localStorage.getItem("circleOption") == "YES") {
    circleOption.checked = true;
  }
  else {
    squareOption.checked = true;
  }

  circleOption.addEventListener('change', function () {
    localStorage.setItem("circleOption", circleOption.checked?"YES":"NO");
  });

  squareOption.addEventListener('change', function () {
    localStorage.setItem("circleOption", squareOption.checked?"NO":"YES");
  });
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

function loadDropdowns()
{
  timerPrecision = localStorage.timerPrecision;
  timerPrecisionDropdown = $('#timerPrecisionDropdown');
  if( timerPrecision != null ) {
    timerPrecisionDropdown.val(timerPrecision);
  }
  else {
    timerPrecision = "ms";
    localStorage.timerPrecision = "ms";
  }

  clockPrecision = localStorage.clockPrecision;
  clockPrecisionDropdown = $('#clockPrecisionDropdown');
  if( clockPrecision != null ) {
    clockPrecisionDropdown.val(clockPrecision);
  }
  else {
    clockPrecision = "min";
    localStorage.clockPrecision = "min";
  }

  populationPrecision = localStorage.populationPrecision;
  populationPrecisionDropdown = $('#populationPrecisionDropdown');
  if( populationPrecision != null ) {
    populationPrecisionDropdown.val(populationPrecision);
  }
  else {
    populationPrecision = "one";
    localStorage.populationPrecision = "one";
  }

  timeupMessage = localStorage.timeupMessage;
  timeupMessageDropdown = $('#timeupMessageDropdown');
  if( timeupMessage != null ) {
    timeupMessageDropdown.val(timeupMessage);
  }
  else {
    timeupMessage = "¯\\_(ツ)_/¯";
    localStorage.timeupMessage = "¯\\_(ツ)_/¯";
  }

  [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
    new SelectFx(el);
  } );

  selectTimer = $( "#timerPrecisionContainer > div" );
  selectTimerValue = $( "#timerPrecisionContainer > div > span" );
  currentTimerValue = $("#timerPrecisionDropdown option[value='" + timerPrecision + "']").text();
  selectTimerValue.text(currentTimerValue);
  selectTimer.click(function() {
    localStorage.timerPrecision = timerPrecisionDropdown.val();
  });

  selectClock = $( "#clockPrecisionContainer > div" );
  selectClockValue = $( "#clockPrecisionContainer > div > span" );
  currentClockValue = $("#clockPrecisionDropdown option[value='" + clockPrecision + "']").text();
  selectClockValue.text(currentClockValue);
  selectClock.click(function() {
    localStorage.clockPrecision = clockPrecisionDropdown.val();
  });

  selectPopulation = $( "#populationPrecisionContainer > div" );
  selectPopulationValue = $( "#populationPrecisionContainer > div > span" );
  currentPopulationValue = $("#populationPrecisionDropdown option[value='" + populationPrecision + "']").text();
  selectPopulationValue.text(currentPopulationValue);
  selectPopulation.click(function() {
    localStorage.populationPrecision = populationPrecisionDropdown.val();
  });

  selectTimeupMessage = $( "#timeupMessageContainer > div" );
  selectTimeupMessageValue = $( "#timeupMessageContainer > div > span" );
  selectTimeupMessageValue.text(timeupMessage);
  selectTimeupMessage.click(function() {
    localStorage.timeupMessage = timeupMessageDropdown.val();
  });
}

function loadSurvey()
{

}



