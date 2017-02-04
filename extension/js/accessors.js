
function getDOB()
{
  var savedDoB = localStorage.getItem("dob");
  if( savedDoB === null) {
    return new Date();
  }
  else {
    return new Date(parseInt(savedDoB));
  }
}

function getDOD()
{
  var savedDOD = localStorage.getItem("dod");
  if( savedDOD === null) {
    return new Date();
  }
  else {
    return new Date(parseInt(savedDOD));
  }
}

function getChapters()
{
  var chapterPrecision = localStorage.chapterPrecision;
  var totalProgressUnits = localStorage.idealDeathYears;
  var multiplier = 1;
  if( chapterPrecision == "weeks" ) {
    multiplier = 52;;
  }
  else if( chapterPrecision == "months" ) {
    multiplier = 12;
  }
  totalProgressUnits *= multiplier;


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

  savedChapterLengths = [savedChapterYearLengths[0]*multiplier];
  for( var j=0; j<savedChapterMonthLengths.length; j++ ) {
    var years = savedChapterYearLengths[j+1];
    if( typeof years === 'string' ) {
      years = parseInt(years);
    }
    var months = savedChapterMonthLengths[j];
    if( typeof months === 'string' ) {
      months = parseInt(months);
    }
    savedChapterLengths.push(Math.floor((years+(months/12))*multiplier));
  }

  var index = 0;
  var totalMonths = 0;
  for( index; index<savedChapterYearLengths; index++ ) {
    if((totalMonths+savedChapterLengths[index]) > totalProgressUnits) {
      savedChapterLengths[index] = (totalProgressUnits-totalMonths);
    }
    totalMonths += savedChapterLengths[index];
  }

  var beginningChapter = 0;
  var firstChapter = savedChapterLengths[0];
  var educationStartOffset = 0;
  var monthBorn = getDOB().getMonth();
  if(monthBorn == 11)
  {
   educationStartOffset = 8;
  }
  else
  {
   educationStartOffset = (7-monthBorn);
  }
  firstChapter += educationStartOffset;
  if( firstChapter > totalProgressUnits ) firstChapter = totalProgressUnits;
  var secondChapter = firstChapter + (savedChapterLengths[1]);
  if( secondChapter > totalProgressUnits ) secondChapter = totalProgressUnits;
  var thirdChapter = secondChapter + (savedChapterLengths[2]);
  if( thirdChapter > totalProgressUnits ) thirdChapter = totalProgressUnits;
  var fourthChapter = thirdChapter + (savedChapterLengths[3]);
  if( fourthChapter > totalProgressUnits ) fourthChapter = totalProgressUnits;
  var fifthChapter = fourthChapter + (savedChapterLengths[4]);
  if( fifthChapter > totalProgressUnits ) fifthChapter = totalProgressUnits;
  //540
  var sixthChapter = fifthChapter + (savedChapterLengths[5]);
  if( sixthChapter > totalProgressUnits ) sixthChapter = totalProgressUnits;
  //141
  var seventhChapter = sixthChapter + (savedChapterLengths[6]);
  if( seventhChapter > totalProgressUnits ) seventhChapter = totalProgressUnits;
  var eighthChapter = totalProgressUnits;

  return [[beginningChapter, firstChapter], [firstChapter, secondChapter], [secondChapter, thirdChapter]
    ,[thirdChapter, fourthChapter], [fourthChapter, fifthChapter]
    ,[fifthChapter, sixthChapter], [sixthChapter, seventhChapter]
    ,[seventhChapter, eighthChapter]];
}

function saveChapterLengths()
{
  var chapterLengths = [
    $("#first-chapter-input").val(),
    $("#second-chapter-input").val(),
    $("#third-chapter-input").val(),
    $("#fourth-chapter-input").val(),
    $("#fifth-chapter-input").val(),
    $("#sixth-chapter-input").val(),
    $("#seventh-chapter-input").val(),
    $("#eighth-chapter-input").val()
  ];
  localStorage.setItem("chapterLengths", JSON.stringify(chapterLengths));
}


function getColorTheme()
{
  var themes = {
    "def" : ['#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#2E2E2E'],
    "light" : ['#212121', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD', '#E0E0E0', '#ECECEC'],
    "dawn" : ['#FFEB3B', '#FBC02D', '#F9A825', '#FF9800', '#F57C00', '#E65100', '#795548', '#4E342E'],
    "dusk" : ['#391003', '#5D1A25', '#722007','#ab300a', '#bf360c', '#cb5e3c', '#C47A6F', '#df9a85'],
    "twilight" : ['#4527A0', '#283593', '#3F51B5', '#5C6BC0', '#8c97d2', '#78909C', '#B0BEC5', '#ECEFF1'],
    "retro" : ['#D4184E', '#FF984C', '#00E8BB', '#18CAD4','#D4184E', '#FF984C', '#00E8BB', '#18CAD4'],
    "rainbowl" : ['#B71C1C', '#E65100', '#FFD600', '#1B5E20', '#004D40', '#3378af', '#673AB7', '#482880'],
    "rainbowd" : ['#ee4035', '#f37736', '#fcec4d', '#7bc043', '#009688', '#0392cf', '#644ca2', '#482880'],
    "cupid" : ['#ef95b4', '#ea729b', '#e54f83', '#c91e5a', '#AF2B5B', '#7C465D', '#543544', '#2B242A'],
    "rasta" : ['#156900', '#1E9600', '#61b54c', '#ccc100', '#FFF200', '#b20000', '#FF0000', '#FF3232'],
    "sky" : ['#007dff', '#009fff', '#00aaff', '#00d2ff', '#77dcf2', '#a0e7db', '#c9ead2', '#e7ffcb']
  };

  var savedTheme = localStorage.getItem("colorTheme");

  if (savedTheme === null)
  {
    return themes.def;
  }
  else
  {
    switch (savedTheme)
    {
      case "default":
        return themes.def;
      case "dark":
        //Dark removed
        return themes.def;
      case "light":
        return themes.light;
      case "dawn":
        return themes.dawn;
      case "dusk":
        return themes.dusk;
      case "twilight":
        return themes.twilight;
      case "retro":
        return themes.retro;
      case "rainbowd":
        return themes.rainbowd;
      case "rainbowl":
        return themes.rainbowl;
      case "cupid":
        return themes.cupid;
      case "rasta":
        return themes.rasta;
      case "sky":
        return themes.sky;
      default:
        return themes.def;
    }
  }
}

function saveTheme()
{
  var savedTheme = localStorage.getItem("colorTheme");
  var selectedTheme = document.getElementById("theme-dropdown").value;

  if (savedTheme != selectedTheme)
  {
    localStorage.setItem("colorTheme", selectedTheme);
  }
}

function savePrecision()
{
  var selectedPrecision = document.getElementById("precisionDropdown").value;
  localStorage.setItem("precision", selectedPrecision);
}

function loadSurveyAnswers()
{

}

function saveSurveyAnswers()
{

}
