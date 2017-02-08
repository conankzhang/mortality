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

function setupCountdown()
{
    var timeInput = document.getElementById("countdownTime-input").value;
    var timeArray = timeInput.split(":");
    localStorage.deathTime = timeArray[0]*60 + timeArray[1]*1;
}

function setupThemes()
{
  setDropdownWithCurrentTheme();
}

function setupSettings()
{
  convertIMG2SVG();
  loadCheckBoxes();
  loadRadioButtons();
  loadDropdowns();
  loadSegmentedControls();
  loadSurvey();
  loadChapterPrecision();
  loadChapters();
  loadTextFields();
  loadDOB();
  loadDOD();

  // $("#submit-button").click(function(){
  //   saveTheme();
  // });
}

function setDropdownWithCurrentTheme(){
  var theme = localStorage.getItem("colorTheme");
  if (theme != null) {
    document.getElementById("theme-dropdown").value = theme;
  }
}
