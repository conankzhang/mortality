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
  loadCountdownCheckboxes();
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

function loadCountdownCheckboxes()
{
  var toggleCountdownCheckbox = document.querySelector('input[id=toggleCountdown-checkbox]');
  if (localStorage.getItem("countdownEnabled") == "YES") {
    toggleCountdownCheckbox.checked = true;
  }
  showCountdownIf(toggleCountdownCheckbox.checked);
  //Show the message selector if the checkbox isn't checked
  showCountdownTimeUpMessageSelectorIf(!toggleCountdownCheckbox.checked);

  toggleCountdownCheckbox.addEventListener('change', function () {
    showCountdownIf(toggleCountdownCheckbox.checked);
    showCountdownTimeUpMessageSelectorIf(!toggleCountdownCheckbox.checked);
  });

  var specificTimeCheckbox = document.querySelector('input[id=specifyCountdown-checkbox]');
  if (localStorage.getItem("specificTimeSet") == "YES") {
    specificTimeCheckbox.checked = true;
  }
  showSpecificTimeSettingsIf(specificTimeCheckbox.checked);

  specificTimeCheckbox.addEventListener('change', function () {
    showSpecificTimeSettingsIf(specificTimeCheckbox.checked);
  });



  var countdownTimeCheckbox = document.querySelector('input[id=countdown-addTime-checkbox]');
  if (localStorage.getItem("countdownTimeSet") == "YES") {
    countdownTimeCheckbox.checked = true;
  }
  showCountdownTimeSelectorIf(countdownTimeCheckbox.checked);

  countdownTimeCheckbox.addEventListener('change', function () {
    showCountdownTimeSelectorIf(countdownTimeCheckbox.checked);
  });

  var countdownDailyCheckbox = document.querySelector('input[id=countdown-daily-checkbox]');
  if (localStorage.getItem("countdownDaily") == "YES") {
    countdownDailyCheckbox.checked = true;
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

  var timerSettingsSegmentedControl1 = $("#timerSettingsSegmentedControl > input:nth-child(1)");
  var timerSettingsSegmentedControl2 = $("#timerSettingsSegmentedControl > input:nth-child(2)");
  var timerSettingsSegmentedControl3 = $("#timerSettingsSegmentedControl > input:nth-child(3)");

  timerSettingsSegmentedControl1.change( function () {
    if( timerSettingsSegmentedControl1.is(":checked") ) {
      $("#extraTimerSettingsSegmentedControl").fadeOut(1);
    }
  });

  timerSettingsSegmentedControl2.change( function () {
    if( timerSettingsSegmentedControl2.is(":checked") ) {
      $("#extraTimerSettingsSegmentedControl").fadeOut(1);
    }
  });

  timerSettingsSegmentedControl3.change( function () {
    if( timerSettingsSegmentedControl3.is(":checked") ) {
      $("#extraTimerSettingsSegmentedControl").addClass("borderless-segmented-control");
      $("#extraTimerSettingsSegmentedControl").hide().fadeIn(500);
      $("#extraTimerSettingsSegmentedControl").removeClass("borderless-segmented-control");
    }
  });


  var chapterLengthSegmentedControl1 = $("#chapterLengthSegmentedControl > input:nth-child(1)");
  var chapterLengthSegmentedControl2 = $("#chapterLengthSegmentedControl > input:nth-child(2)");

  chapterLengthSegmentedControl1.change( function () {
    if( chapterLengthSegmentedControl1.is(":checked") ) {
      $("#chapterLengthsFixedContainer").fadeOut(1, function() {
        $("#chapterLengthsSpecifyContainer").fadeIn(1);
      });
    }
  });

  chapterLengthSegmentedControl2.change( function () {
    if( chapterLengthSegmentedControl2.is(":checked") ) {
      $("#chapterLengthsSpecifyContainer").fadeOut(1);
      $("#chapterLengthsFixedContainer").fadeIn(1);
    }
  });

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
  document.getElementById('timeInput').value = getTimeStringFromMinutes(dobMinutes);

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



  [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
    new SelectFx(el);
  } );
}

function loadCheckBoxes()
{
  var timeCheckbox = document.querySelector('input[id=timeCheckbox]');
  if (localStorage.getItem("dobTimeSet") == "YES") {
    timeCheckbox.checked = true;
  }
  showTimeSelectorIf(timeCheckbox.checked);

  timeCheckbox.addEventListener('change', function () {
    showTimeSelectorIf(timeCheckbox.checked);
  });

//SET HIDE FLAGS
  // var hideAgeCheckbox = document.querySelector('input[id=hideAge-checkbox]');
  // if (localStorage.getItem("hideAge") == "YES") {
  //   hideAgeCheckbox.checked = true;
  // }

  // hideAgeCheckbox.addEventListener('change', function () {
  //   var hideCirclesCheckbox = document.querySelector('input[id=hideCircles-checkbox]');
  //   if(hideCirclesCheckbox.checked == true) {
  //     hideCirclesCheckbox.checked = false;
  //   }
  // });

  // var hideCirclesCheckbox = document.querySelector('input[id=hideCircles-checkbox]');
  // if (localStorage.getItem("hideCircles") == "YES") {
  //   hideCirclesCheckbox.checked = true;
  // }

  // hideCirclesCheckbox.addEventListener('change', function () {
  //   var hideAgeCheckbox = document.querySelector('input[id=hideAge-checkbox]');
  //   if(hideAgeCheckbox.checked == true) {
  //     hideAgeCheckbox.checked = false;
  //   }
  // });
}

function setDropdownWithCurrentTheme(){
  var theme = localStorage.getItem("colorTheme");
  if (theme != null) {
    document.getElementById("theme-dropdown").value = theme;
  }
}

function showTimeSelectorIf(isChecked)
{
  if (isChecked) {
      document.getElementById("timeInput").style.display = "block";
  } else {
      document.getElementById("timeInput").style.display = "none";
  }
}
