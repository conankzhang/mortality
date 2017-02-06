
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
  var savedChapterLengths;
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


  if( localStorage.fixedChapters == "YES" )
  {
    var years = localStorage.chapterPrecisionYear;
    if( typeof years === 'string' ) {
      years = parseInt(years);
    }
    var months = localStorage.chapterPrecisionMonth;
    if( typeof months === 'string' ) {
      months = parseInt(months);
    }
    savedChapterLengths = [];
    var iterations = Math.ceil(totalProgressUnits/years);
    for( var i=0; i<iterations; i++ )
    {
      savedChapterLengths.push(Math.floor((years+(months/12))*multiplier));
    }
  }

  else
  {
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
    for( var j=0; j<savedChapterMonthLengths.length; j++ )
    {
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
  if( chapterPrecision == "weeks" ) {
    educationStartOffset *= 4;
  }
  else if( chapterPrecision == "years" ) {
    educationStartOffset /= 12;
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

function getPopulationDictionary()
{
  return {
    "1950":2525149000,
    "1951":2571868000,
    "1952":2617940000,
    "1953":2664029000,
    "1954":2710678000,
    "1955":2758315000,
    "1956":2807246000,
    "1957":2857663000,
    "1958":2909651000,
    "1959":2963216000,
    "1960":3018344000,
    "1961":3075073000,
    "1962":3133554000,
    "1963":3194075000,
    "1964":3256989000,
    "1965":3322495000,
    "1966":3390686000,
    "1967":3461343000,
    "1968":3533967000,
    "1969":3607866000,
    "1970":3682488000,
    "1971":3757735000,
    "1972":3833595000,
    "1973":3909722000,
    "1974":3985734000,
    "1975":4061399000,
    "1976":4136542000,
    "1977":4211322000,
    "1978":4286282000,
    "1979":4362190000,
    "1980":4439632000,
    "1981":4518602000,
    "1982":4599003000,
    "1983":4681211000,
    "1984":4765658000,
    "1985":4852541000,
    "1986":4942056000,
    "1987":5033805000,
    "1988":5126633000,
    "1989":5218978000,
    "1990":5309668000,
    "1991":5398329000,
    "1992":5485115000,
    "1993":5570045000,
    "1994":5653316000,
    "1995":5735123000,
    "1996":5815392000,
    "1997":5894155000,
    "1998":5971883000,
    "1999":6049205000,
    "2000":6126622000,
    "2001":6204311000,
    "2002":6282302000,
    "2003":6360765000,
    "2004":6439842000,
    "2005":6519636000,
    "2006":6600220000,
    "2007":6681607000,
    "2008":6763733000,
    "2009":6846480000,
    "2010":6929725000,
    "2011":7013427000,
    "2012":7097500000,
    "2013":7181715000,
    "2014":7265786000,
    "2015":7349472000,
    "2016":7404976783,
    "2017":7515280000
  }
}

function getBirthRateDictionary()
{
  return {
    "1950":487364,
    "1951":487364,
    "1952":487364,
    "1953":487364,
    "1954":487364,
    "1955":512937,
    "1956":512937,
    "1957":512937,
    "1958":512937,
    "1959":512937,
    "1960":561133,
    "1961":561133,
    "1962":561133,
    "1963":561133,
    "1964":561133,
    "1965":597172,
    "1966":597172,
    "1967":597172,
    "1968":597172,
    "1969":597172,
    "1970":611176,
    "1971":611176,
    "1972":611176,
    "1973":611176,
    "1974":611176,
    "1975":607056,
    "1976":607056,
    "1977":607056,
    "1978":607056,
    "1979":607056,
    "1980":646459,
    "1981":646459,
    "1982":646459,
    "1983":646459,
    "1984":646459,
    "1985":698317,
    "1986":698317,
    "1987":698317,
    "1988":698317,
    "1989":698317,
    "1990":676437,
    "1991":676437,
    "1992":676437,
    "1993":676437,
    "1994":676437,
    "1995":650312,
    "1996":650312,
    "1997":650312,
    "1998":650312,
    "1999":650312,
    "2000":658430,
    "2001":658430,
    "2002":658430,
    "2003":658430,
    "2004":658430,
    "2005":680567,
    "2006":680567,
    "2007":680567,
    "2008":680567,
    "2009":680567,
    "2010":699214,
    "2011":699214,
    "2012":699214,
    "2013":699214,
    "2014":699214,
    "2015":703126,
    "2016":703126,
    "2017":703126
  }
}
