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

  $("#countdown-submit-button").click(function(){
    var toggleCountdownCheckbox = document.querySelector('input[id=toggleCountdown-checkbox]');

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

function setupThemes()
{
  setDropdownWithCurrentTheme();
}

function setupSettings(dob, dobMinutes)
{
  convertIMG2SVG();
  loadCheckBoxes();
  loadRadioButtons();
  loadDropdowns();
  loadSegmentedControls();
  loadSurvey();
  loadChapterPrecision();
  loadChapters();

  document.getElementById('dobInput').value = dob.yyyymmdd();
  document.getElementById('dobTimeInput').value = getTimeStringFromMinutes(dobMinutes);

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
