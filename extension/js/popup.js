$('#inline-popup').magnificPopup({
  removalDelay: 800,
  callbacks: {
    beforeOpen: function() {
       this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
  closeBtnInside: false,
  focus: 'link-input',
  midClick: true
});

function getOrdinal(n) {
   var s=["th","st","nd","rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
}

String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

function setupCountdown()
{
  var toggleCountdownCheckbox = document.querySelector('input[id=toggleCountdown-checkbox]');
  if( toggleCountdownCheckbox.checked )
  {
    var specifyCountdownCheckbox = document.querySelector('input[id=specifyCountdown-checkbox]');
    if( specifyCountdownCheckbox.checked )
    {
      loadCountdownDate();

      var countdownTimeCheckbox = document.querySelector('input[id=countdown-addTime-checkbox]');
      if( countdownTimeCheckbox.checked )
      {
        loadCountdownTime();
      }
    }
    else
    {
      loadSurveyAnswers();
    }
  }
  else
  {
    var loadedTimeupMessage = localStorage.getItem("timeupMessage");
    if( loadedTimeupMessage != null ) {
      document.getElementById("timeup-selector-dropdown").value = loadedTimeupMessage;
    }
    else
    {
      localStorage.timeupMessage = document.getElementById("timeup-selector-dropdown").value;
    }
  }

  $("#countdown-submit-button").click(function(){
    var toggleCountdownCheckbox = document.querySelector('input[id=toggleCountdown-checkbox]');
    if( toggleCountdownCheckbox.checked )
    {
      localStorage.setItem("countdownEnabled", "YES");
      var specifyCountdownCheckbox = document.querySelector('input[id=specifyCountdown-checkbox]');
      if( specifyCountdownCheckbox.checked )
      {
        var timeInput = document.getElementById("countdownTime-input").value;
        var timeArray = timeInput.split(":");
        localStorage.deathTime = timeArray[0]*60 + timeArray[1]*1;

        saveCountdownDeath();

        localStorage.setItem("specificTimeSet", "YES");
        var countdownTimeCheckbox = document.querySelector('input[id=countdown-addTime-checkbox]');
        if( countdownTimeCheckbox.checked )
        {
          localStorage.setItem("countdownTimeSet", "YES");
        }
        else
        {
          localStorage.removeItem("countdownTimeSet");
        }
        var countdownDailyCheckbox = document.querySelector('input[id=countdown-daily-checkbox]');
        if( countdownDailyCheckbox.checked )
        {
          localStorage.setItem("countdownDaily", "YES");
        }
        else
        {
          localStorage.removeItem("countdownDaily");
        }
      }
      else
      {
        localStorage.removeItem("specificTimeSet");
        saveSurveyAnswers();
      }
    }
    else
    {
      localStorage.removeItem("countdownEnabled");
      var timeupMessage = document.getElementById("timeup-selector-dropdown").value;
      localStorage.setItem("timeupMessage", timeupMessage);
    }
    $("#info-popup").magnificPopup('close');
  });

  $("#countdown-cancel-button").click(function(){
    $("#info-popup").magnificPopup('close');
  });

}

function loadCountdownTime()
{
  var deathTime = localStorage.getItem("deathTime");
  if( deathTime === null )
  {
    document.getElementById('countdownTime-input').value = "00:00";
    localStorage.deathTime = "0";
  }
  else
  {
    document.getElementById('countdownTime-input').value = getTimeStringFromMinutes(deathTime);
  }
}

function saveCountdownDeath()
{
  window.app.saveDeath();
}

function loadCountdownDate()
{
  var deathDate = localStorage.getItem("deathDate");
  if( deathDate === null )
  {
    document.getElementById('countdownDate-input').value = new Date();
  }
  else
  {
    document.getElementById('countdownDate-input').value = new Date(parseInt(deathDate)).yyyymmdd();
  }
}

function showCountdownIf(isChecked)
{
  if (isChecked) {
      document.getElementById("countdown-container").style.display = "block";
  } else {
      document.getElementById("countdown-container").style.display = "none";
  }
}

function showCountdownTimeSelectorIf(isChecked)
{
  if (isChecked) {
      document.getElementById("countdownTime-input").style.display = "block";
      document.getElementById("countdown-daily-label").style.display = "block";
  } else {
      document.getElementById("countdownTime-input").style.display = "none";
      document.getElementById("countdown-daily-label").style.display = "none";
  }
}

function showSpecificTimeSettingsIf(isChecked)
{
  if (isChecked) {
      document.getElementById("specific-container").style.display = "block";
      document.getElementById("survey-container").style.display = "none";
      loadCountdownDate();
      loadCountdownTime();

  } else {
      document.getElementById("specific-container").style.display = "none";
      document.getElementById("survey-container").style.display = "block";
      loadSurveyAnswers();
  }
}

function showCountdownTimeUpMessageSelectorIf(isChecked)
{
  if (isChecked) {
      document.getElementById("timeup-selector-container").style.display = "block";
  } else {
      document.getElementById("timeup-selector-container").style.display = "none";
  }
}

function setupThemes()
{
  setDropdownWithCurrentTheme();
}



function setupSettings(dob, dobMinutes)
{
  localStorage.setItem("chapterNum", 2);
  convertIMG2SVG();
  loadCheckBoxes();
  loadRadioButtons();
  loadDropdowns();
  loadSegmentedControls();


  $('#addChapterButton').on( "click", function() {
    var chapterValue = localStorage.getItem("chapterNum");
    chapterNum = parseInt(chapterValue);
    var chapterNumString = getOrdinal(chapterNum);
    $('#chapterLengthStackView').append('<div class="chapter"><div class="chapterNum">{0}</div><input type="text" class="yearsInput"><input type="text" class="monthsInput"></div>'.format(chapterNumString))
    chapterNum+=1;
    localStorage.setItem("chapterNum", chapterNum);
  });

  $('#removeChapterButton').on( "click", function() {
    var chapterValue = localStorage.getItem("chapterNum");
    chapterNum = parseInt(chapterValue);
    if( chapterNum > 2 )
    {
      $('#chapterLengthStackView .chapter').last().remove();
      chapterNum-=1;
      localStorage.setItem("chapterNum", chapterNum);
    }
  });

  document.getElementById('dobInput').value = dob.yyyymmdd();
  document.getElementById('dobTimeInput').value = getTimeStringFromMinutes(dobMinutes);

  var savedPrecision = localStorage.getItem("precision");
  if (savedPrecision != null) {
    document.getElementById("precisionDropdown").value = savedPrecision;
  }

  var savedChapterLengths = JSON.parse(localStorage.getItem("chapterLengths"));
  if( savedChapterLengths === null )
  {
    savedChapterLengths = [5,7,2,4,4,43,15,0];
  }

  $("#first-chapter-input").val(savedChapterLengths[0]);
  $("#second-chapter-input").val(savedChapterLengths[1]);
  $("#third-chapter-input").val(savedChapterLengths[2]);
  $("#fourth-chapter-input").val(savedChapterLengths[3]);
  $("#fifth-chapter-input").val(savedChapterLengths[4]);
  $("#sixth-chapter-input").val(savedChapterLengths[5]);
  $("#seventh-chapter-input").val(savedChapterLengths[6]);
  $("#eighth-chapter-input").val(savedChapterLengths[7]);


  // $("#submit-button").click(function(){
  //   window.app.saveDob();
  //   saveTheme();
  //   savePrecision();
  //   saveChapterLengths();
  //   $("#info-popup").magnificPopup('close');
  // });




}

function setDropdownWithCurrentTheme(){
  var theme = localStorage.getItem("colorTheme");
  if (theme != null) {
    document.getElementById("theme-dropdown").value = theme;
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



