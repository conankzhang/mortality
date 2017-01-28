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
    var timeInput = document.getElementById("countdownTime-input").value;
    var timeArray = timeInput.split(":");
    localStorage.deathTime = timeArray[0]*60 + timeArray[1]*1;
    window.app.saveDeath();
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
  // });
}

function setDropdownWithCurrentTheme(){
  var theme = localStorage.getItem("colorTheme");
  if (theme != null) {
    document.getElementById("theme-dropdown").value = theme;
  }
}
