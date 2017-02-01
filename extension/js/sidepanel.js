//DELETE MAYBE?

  // var birthDate = getDOB();
  // if(birthDate.dst())
  // {
  //   birthDate.setHours(birthDate.getHours()+1);
  // }
  // var birthMinutes = localStorage.dobMinutes || 0;

  // var yearMS = 31556952000;
  // var minuteMS = 60000;
  // var deathDate = 80*yearMS + (birthDate - (parseInt(birthMinutes)*minuteMS));

  // localStorage.setItem("surveyDeathDate", deathDate);

function openNav()
{
  document.getElementById("theSidePanel").style.width = "50vw";
  document.getElementById("main").style.marginLeft = "50vw";
  $('.timer').animate({
    'font-size':'3vw'
  },1000);
  $('.timer-container').animate({
    'left':'75%'
  },1000);

  $('.timer-labels').animate({
    'font-size':'0.8vw'
  },1000);
  $('.timer-labels').animate({
    'margin-left':'-0.5vw'
  },1000);
  $('.circle').css('width','0.95vw');
  $('.circle').css('height','0.95vw');
  $('.pie').css('width','0.95vw');
  $('.pie').css('height','0.95vw');
  updateProgressUnit();
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
  $('.circle').css('width','1.9vw');
  $('.circle').css('height','1.9vw');
  $('.pie').css('width','1.9vw');
  $('.pie').css('height','1.9vw');
  updateProgressUnit();
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
    setButtonPressed(3);
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

    setupSettings();
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
  if (localStorage.getItem("shape") == "circle") {
    circleOption.checked = true;
  }
  else {
    squareOption.checked = true;
  }

  circleOption.addEventListener('change', function () {
    localStorage.setItem("shape", circleOption.checked?"circle":"square");
    $(".circle").css("borderRadius","50%");
    updateProgressUnit();
  });

  squareOption.addEventListener('change', function () {
    localStorage.setItem("shape", squareOption.checked?"square":"circle");
    $(".circle").css("borderRadius","0");
    updateProgressUnit();
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
    if( !dobTimeCheckbox.checked ) {
      localStorage.dobMinutes = 0;
      window.app.dobMinutes = 0;
    }
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
    if( hideProgressCheckbox.checked ) {
      $('#circles').css('opacity',0);
    }
    else {
      $('#circles').css('opacity',1);
    }
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
      window.app.initializeTimer();
      $('.timer').css('font-size','3vw');
      $('.timer-container').css('left','75%');
      $('.timer-labels').css('font-size','0.8vw');
      $('.timer-labels').css('margin-left','-0.5vw');
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
  var surveyGender = localStorage.getItem("surveyGender");
  var surveyGenderDropdown = $("#gender-dropdown");
  if (surveyGender !== null) {
    surveyGenderDropdown.val(surveyGender);
  }
  surveyGenderDropdown.change(function() {
    localStorage.surveyGender = surveyGenderDropdown.val();
  });

  var surveyEthnicity = localStorage.getItem("surveyEthnicity");
  var surveyEthnicityDropdown = $("#ethnicity-dropdown");
  if (surveyEthnicity !== null) {
    surveyEthnicityDropdown.val(surveyEthnicity);
  }
  surveyEthnicityDropdown.change(function() {
    localStorage.surveyEthnicity = surveyEthnicityDropdown.val();
  });

  var surveyDrinking = localStorage.getItem("surveyDrinking");
  var surveyDrinkingDropdown = $("#drinking-dropdown");
  if (surveyDrinking !== null) {
    surveyDrinkingDropdown.val(surveyDrinking);
  }
  surveyDrinkingDropdown.change(function() {
    localStorage.surveyDrinking = surveyDrinkingDropdown.val();
  });

  var surveySmoking = localStorage.getItem("surveySmoking");
  var surveySmokingDropdown = $("#smoking-dropdown");
  if (surveySmoking !== null) {
    surveySmokingDropdown.val(surveySmoking);
  }
  surveySmokingDropdown.change(function() {
    localStorage.surveySmoking = surveySmokingDropdown.val();
  });

  var surveyExercise = localStorage.getItem("surveyExercise");
  var surveyExerciseDropdown = $("#exercise-dropdown");
  if (surveyExercise !== null) {
    surveyExerciseDropdown.val(surveyExercise);
  }
  surveyExerciseDropdown.change(function() {
    localStorage.surveyExercise = surveyExerciseDropdown.val();
  });

  var surveyHeightFeet = localStorage.getItem("surveyHeightFeet");
  var surveyHeightFeetDropdown = $("#heightFeet-dropdown");
  if (surveyHeightFeet !== null) {
    surveyHeightFeetDropdown.val(surveyHeightFeet);
  }
  surveyHeightFeetDropdown.change(function() {
    localStorage.surveyHeightFeet = surveyHeightFeetDropdown.val();
  });

  var surveyHeightInches = localStorage.getItem("surveyHeightInches");
  var surveyHeightInchesDropdown = $("#heightInches-dropdown");
  if (surveyHeightInches !== null) {
    surveyHeightInchesDropdown.val(surveyHeightInches);
  }
  surveyHeightInchesDropdown.change(function() {
    localStorage.surveyHeightInches = surveyHeightInchesDropdown.val();
  });

  var surveyWeight = localStorage.getItem("surveyWeight");
  var surveyWeightTextfield = $("#weightTextfield");
  if (surveyWeight !== null) {
    surveyWeightTextfield.val(surveyWeight);
  }
  surveyWeightTextfield.on('input',function(e){
    localStorage.surveyWeight = surveyWeightTextfield.val();
  });

  var surveyHeartCheckbox = document.querySelector('input[id=heartDisease-checkbox]');
  if (localStorage.getItem("surveyHeartDisease") == "YES") {
    surveyHeartCheckbox.checked = true;
  }
  surveyHeartCheckbox.addEventListener('change', function () {
    localStorage.setItem("surveyHeartDisease", surveyHeartCheckbox.checked?"YES":"NO");
  });

  var surveyClumsinessCheckbox = document.querySelector('input[id=clumsiness-checkbox]');
  if (localStorage.getItem("surveyClumsiness") == "YES") {
    surveyClumsinessCheckbox.checked = true;
  }
  surveyClumsinessCheckbox.addEventListener('change', function () {
    localStorage.setItem("surveyClumsiness", surveyClumsinessCheckbox.checked?"YES":"NO");
  });
}

function loadChapterPrecision()
{
  var chapterPrecisionYear = localStorage.getItem("chapterPrecisionYear");
  var chapterPrecisionYearTextfield = $("#fixedYearsInput");
  if (chapterPrecisionYear === null) {
    localStorage.chapterPrecisionYear = "10";
    chapterPrecisionYearTextfield.val("10");
  }
  else {
    chapterPrecisionYearTextfield.val(chapterPrecisionYear);
  }
  chapterPrecisionYearTextfield.on('input',function(e){
    localStorage.chapterPrecisionYear = chapterPrecisionYearTextfield.val();
  });

  var chapterPrecisionMonth = localStorage.getItem("chapterPrecisionMonth");
  var chapterPrecisionMonthTextfield = $("#fixedMonthsInput");
  if (chapterPrecisionMonth === null) {
    localStorage.chapterPrecisionMonth = "0";
    chapterPrecisionMonthTextfield.val("0");
  }
  else {
    chapterPrecisionMonthTextfield.val(chapterPrecisionMonth);
  }
  chapterPrecisionMonthTextfield.on('input',function(e){
    localStorage.chapterPrecisionMonth = chapterPrecisionMonthTextfield.val();
  });
}

function loadChapters()
{
  if( localStorage.getItem("chapterNum") === null) {
    localStorage.setItem("chapterNum", 7);
  }

  numberOfChapters = localStorage.chapterNum;
  for( i=1; i<numberOfChapters; i++ )
  {
    chapterNum = parseInt(i+1);
    var chapterNumString = getOrdinal(chapterNum);
    $('#chapterLengthStackView').append('<div class="chapter"><div class="chapterNum">{0}</div><input type="number" id="chapterYear{1}" class="yearsInput" min="0" max="100"><input type="number" id="chapterMonth{1}" class="monthsInput" min="0" max="11"></div>'.format(chapterNumString, chapterNum))
  }

  $('#addChapterButton').on( "click", function() {
    var chapterValue = localStorage.getItem("chapterNum");
    chapterNum = parseInt(chapterValue);
    var chapterNumOffset = chapterNum + 1;
    var chapterNumString = getOrdinal(chapterNum+1);
    $('#chapterLengthStackView').append('<div class="chapter"><div class="chapterNum">{0}</div><input type="number" id="chapterYear{1}" class="yearsInput" min="0" max="100" value="0"><input type="number" id="chapterMonth{1}" class="monthsInput" min="0" max="11" value="0"></div>'.format(chapterNumString, chapterNumOffset))
    chapterNum+=1;
    localStorage.setItem("chapterNum", chapterNum);

    var newChapterYearsInput = $('#chapterYear{0}'.format(chapterNumOffset));
    newChapterYearsInput.on('input',function(e){
      var savedChapterYearLengths = JSON.parse(localStorage.getItem("chapterYearLengths"));
      yearNumber = e.currentTarget.id.slice(-1);
      savedChapterYearLengths[yearNumber - 1] = e.currentTarget.value;
      localStorage.setItem("chapterYearLengths", JSON.stringify(savedChapterYearLengths));
    });

    var newChapterMonthsInput = $('#chapterMonth{0}'.format(chapterNumOffset));
    newChapterMonthsInput.on('input',function(e){
      var savedChapterMonthLengths = JSON.parse(localStorage.getItem("chapterMonthLengths"));
      monthNumber = e.currentTarget.id.slice(-1);
      savedChapterMonthLengths[monthNumber - 2] = e.currentTarget.value;
      localStorage.setItem("chapterMonthLengths", JSON.stringify(savedChapterMonthLengths));
    });

  });

  $('#removeChapterButton').on( "click", function() {
    var chapterValue = localStorage.getItem("chapterNum");
    chapterNum = parseInt(chapterValue);
    if( chapterNum > 1 )
    {
      $('#chapterLengthStackView .chapter').last().remove();
      chapterNum-=1;
      localStorage.setItem("chapterNum", chapterNum);
    }

    var savedChapterYearLengths = JSON.parse(localStorage.getItem("chapterYearLengths"));
    savedChapterYearLengths[chapterNum] = 0;
    localStorage.setItem("chapterYearLengths", JSON.stringify(savedChapterYearLengths));

    var savedChapterMonthLengths = JSON.parse(localStorage.getItem("chapterMonthLengths"));
    savedChapterMonthLengths[chapterNum-1] = 0;
    localStorage.setItem("chapterMonthLengths", JSON.stringify(savedChapterMonthLengths));
  });


  var savedChapterYearLengths = JSON.parse(localStorage.getItem("chapterYearLengths"));
  if( savedChapterYearLengths === null ) {
    savedChapterYearLengths = [5,7,2,4,4,43,15];
    localStorage.setItem("chapterYearLengths", JSON.stringify(savedChapterYearLengths));
  }
  var savedChapterMonthLengths = JSON.parse(localStorage.getItem("chapterMonthLengths"));
  if( savedChapterMonthLengths === null ) {
    savedChapterMonthLengths = [0,0,0,0,0,0];
    localStorage.setItem("chapterMonthLengths", JSON.stringify(savedChapterMonthLengths));
  }

  $("#firstChapterYearsInput").val(savedChapterYearLengths[0]);
  for( j=1; j<numberOfChapters; j++ )
  {
    var chapterNum = parseInt(j+1);
    yearValue = savedChapterYearLengths[j];
    if( typeof yearValue === 'undefined' || !yearValue ) {
      yearValue = 0;
    }
    $('#chapterYear{0}'.format(chapterNum)).val(yearValue);
  }
  for( k=1; k<numberOfChapters; k++ )
  {
    var chapterNum = parseInt(k+1);
    monthValue = savedChapterMonthLengths[k-1];
    if( typeof monthValue === 'undefined' || !monthValue ) {
      monthValue = 0;
    }
    $('#chapterMonth{0}'.format(chapterNum)).val(monthValue);
  }

  var chapterYearInputs = $('.yearsInput');
  chapterYearInputs.on('input',function(e){
    var savedChapterYearLengths = JSON.parse(localStorage.getItem("chapterYearLengths"));
    yearNumber = e.currentTarget.id.slice(-1);
    savedChapterYearLengths[yearNumber - 1] = e.currentTarget.value;
    localStorage.setItem("chapterYearLengths", JSON.stringify(savedChapterYearLengths));
  });

  var chapterMonthInputs = $('.monthsInput');
  chapterMonthInputs.on('input',function(e){
    var savedChapterMonthLengths = JSON.parse(localStorage.getItem("chapterMonthLengths"));
    monthNumber = e.currentTarget.id.slice(-1);
    savedChapterMonthLengths[monthNumber - 2] = e.currentTarget.value;
    localStorage.setItem("chapterMonthLengths", JSON.stringify(savedChapterMonthLengths));
  });
}

function loadDOB()
{
  var dobDate = getDOB();
  var dobDateInput = $("#dobInput");
  dobDateInput.val(dobDate.yyyymmdd());

  $('#dobInput').on('focusin', function(){
      $(this).data('val', $(this).val());
  });

  dobDateInput.on('input',function(e){
    var dobDateInputDOM = document.getElementById("dobInput");
    if( !dobDateInputDOM.valueAsDate) {
      var prev = $(this).data('val');
      if( prev ) {
        $(this).val(prev);
      }
      else {
        var newDate = new Date();
        localStorage.dob = newDate.getTime();
      }
    }
    else {
      var dobDateFromInput = dobDateInputDOM.valueAsDate;
      var newDOBDate = dobDateFromInput.getTime()+(dobDateFromInput.getTimezoneOffset() * 60000);
      localStorage.dob = newDOBDate;
      window.app.dob = newDOBDate;
      $(this).data('val', $(this).val());
    }

    window.app.generateLifeProgress();
    $('.circle').css('width','0.95vw');
    $('.circle').css('height','0.95vw');
    $('.pie').css('width','0.95vw');
    $('.pie').css('height','0.95vw');
    if(localStorage.getItem("shape") == "square") {
      $('.circle').css('borderRadius',0);
    }
    else {
      $('.circle').css('borderRadius','50%');
    }

    updateProgressUnit();
  });

  // window.app.dobMinutes = localStorage.dobMinutes || 0;
  var dobMinutes = localStorage.dobMinutes || 0;
  var dobTimeInput = $("#dobTimeInput");
  dobTimeInput.val(getTimeStringFromMinutes(dobMinutes));

  dobTimeInput.on('input',function(e){
    var dobTimeInputDOM = document.getElementById("dobTimeInput");
    if( !dobTimeInputDOM.valueAsDate ) {
      localStorage.dobMinutes = 0;
    }
    else {
      var timeArray = dobTimeInputDOM.value.split(":");
      var newDOBTime = timeArray[0]*60 + timeArray[1]*1;
      localStorage.dobMinutes = newDOBTime;
      window.app.dobMinutes = newDOBTime;
    }
  });
}

function loadDOD()
{
  var dodDate = getDOD();
  var dodDateInput = $("#dodInput");
  dodDateInput.val(dodDate.yyyymmdd());

  dodDateInput.on('input',function(e){
    var dodDateInputDOM = document.getElementById("dodInput");
    if( !dodDateInputDOM.valueAsDate) {
      var newDate = new Date();
      localStorage.dod = newDate.getTime();
    }
    else {
      var dodDateFromInput = dodDateInputDOM.valueAsDate;
      localStorage.setItem("dod", dodDateFromInput.getTime()+(dodDateFromInput.getTimezoneOffset() * 60000));
    }
  });

  // window.app.dobMinutes = localStorage.dobMinutes || 0;
  var dodMinutes = localStorage.dodMinutes || 0;
  var dodTimeInput = $("#dodTimeInput");
  dodTimeInput.val(getTimeStringFromMinutes(dodMinutes));

  dodTimeInput.on('input',function(e){
    var dodTimeInputDOM = document.getElementById("dodTimeInput");
    if( !dodTimeInputDOM.valueAsDate ) {
      localStorage.dodMinutes = 0;
    }
    else {
      var timeArray = dodTimeInputDOM.value.split(":");
      localStorage.dodMinutes = timeArray[0]*60 + timeArray[1]*1;
    }
  });
}
