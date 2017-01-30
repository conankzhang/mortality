(function(){

  var $  = document.getElementById.bind(document);

  var dayMS = 86400000;
  var hourMS = 3600000;
  var minuteMS = 60000;
  var secondMS = 1000;

  var App = function(appElement)
  {
    this.appElement = appElement;
    this.load();

    /* #VERSIONING ===================================================*/
    if(localStorage.getItem("version") != "4.1.0") {
      document.getElementById("updateBadge").style.display = "block";
    }
    else
    {
      document.getElementById("updateBadge").style.display = "none";
    }
    /*================================================================*/

    this.initializeTimer();
  };

  App.fn = App.prototype;

  App.fn.load = function()
  {
    this.dob = getDOB();
    this.deathDate = getDOD();
    if( this.dob.dst() )
    {
      this.dob.setHours(this.dob.getHours()+1);
    }
    this.dobMinutes = localStorage.dobMinutes || 0;

    if (localStorage.getItem("specificTimeSet") == "YES")
    {
      this.deathTime = localStorage.deathTime || 0;
      this.deathDate.setMinutes(parseInt(this.deathTime));
    }
    else
    {
      this.deathDate = new Date(this.dob.getTime());

      var ageDiffMS = Date.now() - this.dob.getTime();
      var ageDate = new Date(ageDiffMS);
      var ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);

      //https://en.wikipedia.org/wiki/List_of_countries_by_life_expectancy
      var yearOffset = 79.3;
      var surveyGender = localStorage.getItem("surveyGender");
      if( surveyGender == "male" )
      {
        yearOffset -= 2.4;
      }
      else if( surveyGender == "female" )
      {
        yearOffset += 2.3;
      }

      //http://kff.org/other/state-indicator/life-expectancy-by-re/?currentTimeframe=0&selectedRows=%7B%22wrapups%22:%7B%22united-states%22:%7B%7D%7D%7D&sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D
      var surveyEthnicity = localStorage.getItem("surveyEthnicity");
      if( surveyEthnicity == "white" )
      {
        yearOffset -= 0.4;
      }
      else if( surveyEthnicity == "black" )
      {
        yearOffset -= 4.7;
      }
      else if( surveyEthnicity == "latino" )
      {
        yearOffset += 3.5;
      }
      else if( surveyEthnicity == "asian" )
      {
        yearOffset += 7.2;
      }
      else if( surveyEthnicity == "native")
      {
        yearOffset -= 2.4;
      }

      //https://www.myabaris.com/tools/life-expectancy-calculator-how-long-will-i-live/results?id=eyJnZW5kZXIiOiJNQUxFIiwicmFjZSI6IldISVRFIiwiaGVpZ2h0Ijo1LjU4MzMzLCJjdXJyZW50X2FnZSI6NjAsIndlaWdodCI6MTUwLCJlZHVjYXRpb24iOiJfOF9UT18xMSIsIm1hcml0YWxfc3RhdHVzIjoiTUFSUklFRCIsImluY29tZSI6IjQwTUlOVVMiLCJpbmNvbWVTdGF0dXMiOiJXT1JLSU5HIiwiZXhlcmNpc2UiOiJfMV9UT18yX1BFUl9XRUVLIiwiaGVhbHRoIjoiR09PRCIsImRpYWJldGVzIjpmYWxzZSwiYWxjb2hvbCI6Il9MVF8xX1BFUl9EQVkiLCJzbW9raW5nIjoiTk9OX1NNT0tFUiIsInVzX3VuaXRzIjp0cnVlLCJvcHRJbiI6ZmFsc2UsInNtb2tpbmdTdGF0dXMiOiJORVZFUl9TTU9LRUQiLCJzbW9raW5nUXVpdCI6bnVsbCwic21va2luZ0Ftb3VudCI6bnVsbCwiaGVpZ2h0X3R5cGUiOiJJTVBFUklBTCIsIndlaWdodF90eXBlIjoiSU1QRVJJQUwifQ&lc_r=y
      var surveyDrinking = localStorage.getItem("surveyDrinking");
      if( surveyDrinking == "monthly" )
      {
        yearOffset += 1.6;
      }
      else if( surveyDrinking == "weekly" )
      {
        yearOffset += 1.9;
      }
      else if( surveyDrinking == "daily" )
      {
        yearOffset += 1.2;
      }
      else if( surveyDrinking == "never" )
      {
        yearOffset += 0;
      }

      var surveySmoking = localStorage.getItem("surveySmoking");
      if( surveySmoking == "drinking" )
      {
        surveySmoking = surveyDrinking;
      }
      if( surveySmoking == "monthly" )
      {
        yearOffset -= 5.6;
      }
      else if( surveySmoking == "weekly" )
      {
        yearOffset -= 7.7;
      }
      else if( surveySmoking == "daily" )
      {
        yearOffset -= 9.8;
      }
      else if( surveySmoking == "never" )
      {
        yearOffset += 0;
      }
      else if( surveySmoking == "marijuana" )
      {
        //http://www.marijuanadetoxguide.com/life-expectancy-of-smokers-how-soon-before-weed-kills-you/
        yearOffset += 2;
      }

      //https://www.myabaris.com/tools/life-expectancy-calculator-how-long-will-i-live
      var surveyExercise = localStorage.getItem("surveyExercise");
      if( surveyExercise == "never" )
      {
        yearOffset += 0;
      }
      else if( surveyExercise == "rarely" )
      {
        yearOffset += 1.1;
      }
      else if( surveyExercise == "onetwo" )
      {
        yearOffset += 2.5;
      }
      else if( surveyExercise == "threefour" )
      {
        yearOffset += 3.0;
      }
      else if( surveyExercise == "fiveplus" )
      {
        yearOffset += 3.0;
      }

      //https://www.ncbi.nlm.nih.gov/books/NBK62367/
      var surveyHeightFeet = parseInt(localStorage.getItem("surveyHeightFeet"));
      var surveyHeightInches = parseInt(localStorage.getItem("surveyHeightInches"));
      var surveyWeight = parseInt(localStorage.getItem("surveyWeight"));
      surveyHeightInches += surveyHeightFeet*12;
      var surveyWeightKG = surveyWeight*0.45;
      var surveyHeightCMSquared = (surveyHeightInches*0.025)*(surveyHeightInches*0.025);
      var BMI = surveyWeightKG/surveyHeightCMSquared;
      if( BMI < 18.5 )
      {
        yearOffset -= (((18.5 - BMI)/10)*1.5);
      }
      else if( BMI >= 18.5 && BMI <= 25 )
      {
        yearOffset += 0;
      }
      else if( BMI > 25 && BMI <= 30 )
      {
        yearOffset -= ((((BMI+5)-30)/5)*0.5);
      }
      else if( BMI > 30 && BMI <= 35 )
      {
        yearOffset -= ((((BMI+5)-35)/5)*1);
      }
      else if( BMI > 35 && BMI <= 40 )
      {
        yearOffset -= ((((BMI+5)-40)/5)*3);
      }
      else if( BMI > 40 && BMI <= 55 )
      {
        yearOffset -= ((((BMI+5)-55)/15)*7);
      }
      else if( BMI > 55 )
      {
        yearOffset -= 14;
      }

      //http://apps.who.int/gho/data/view.main.YLLRATEREG6AMRV
      if( localStorage.getItem("surveyHeartDisease") == "true" )
      {
        yearOffset -= (ageYears/2)*0.077;
      }

      if( localStorage.getItem("surveyClumsiness") == "true" )
      {
        yearOffset -= (ageYears/3)*0.055;
      }

      this.deathDate.setDate(this.deathDate.getDate() + Math.round(yearOffset*365));
    }

    if (localStorage.getItem("hideCircles") === null)
    {
      var monthBorn = this.dob.getMonth();
      var chaptersArray = getChapters(monthBorn);

      this.documentCircle = document.querySelector('#circles');

      var startMoment = moment(this.dob);
      var endMoment = moment();
      var numberMonths = endMoment.diff(startMoment, 'months');

      this.generateCircleLoops(numberMonths, chaptersArray);
    }
  };

  App.fn.initializeTimer = function()
  {
    var savedTheme = localStorage.getItem("colorTheme");
    var whiteFlag, blackFlag;
    if( savedTheme == "light" || savedTheme == "rainbowl" || savedTheme == "sky" )
    {
      document.body.style.backgroundColor = "#F5F5F5";
      document.body.style.color = "#424242";
      document.querySelector("#menu-button").className = "BlackMenu";
      whiteFlag = "YES";
    }
    else
    {
      document.body.style.backgroundColor = "#1d1d1d";
      document.body.style.color = "#eff4ff";
      document.querySelector("#menu-button").className = "WhiteMenu";
      blackFlag = "YES";
    }

    if( localStorage.getItem("hideAge") === null )
    {
      var duration, startMoment, endMoment;
      if( localStorage.getItem("showCurrentTime") === null )
      {
        var interval = minuteMS;
        var savedPrecision = localStorage.getItem("precision");
        if( savedPrecision == "sec" )
        {
          interval = secondMS;
        }
        else if( savedPrecision == "ms" || savedPrecision === null )
        {
          interval = 113;
        }

        var currentMoment = moment();
        var deadlineMoment = moment(this.deathDate);
        var birthMoment = moment(this.dob);
        if( localStorage.getItem("countdownEnabled") == "YES" )
        {
          if( localStorage.getItem("countdownDaily") == "YES" && localStorage.getItem("specificTimeSet") == "YES" )
          {
            deadlineMoment = moment();
            var timeInput = localStorage.deathTime;
            if( timeInput === null )
            {
              deadlineMoment.hour(0);
              deadlineMoment.minute(0);
              deadlineMoment.second(0);
              deadlineMoment.day(deadlineMoment.day()+1);
            }
            else
            {
              var hours = Math.floor(timeInput/60);
              var minutes = timeInput % 60;
              deadlineMoment.hour(hours);
              deadlineMoment.minute(minutes);
              deadlineMoment.second(0);
              if( timeInput == 0 )
              {
                deadlineMoment.day(deadlineMoment.day()+1);
              }
            }
          }

          this.deadlineMoment = deadlineMoment;
          duration = deadlineMoment - currentMoment;
          if( duration <= 0 )
          {
            this.setAppElementHTML(this.getTemplateScript('timeup')({
              white: whiteFlag,
              black: blackFlag,
              message: localStorage.timeupMessage
            }));
            interval = secondMS;
            setInterval(this.renderTimeUp.bind(this),interval);
            return;
          }
          startMoment = currentMoment;
          endMoment = deadlineMoment;
        }
        else
        {
          duration  = currentMoment - birthMoment - (parseInt(this.dobMinutes)*minuteMS);
          startMoment = birthMoment;
          endMoment = currentMoment;
        }

        setInterval(this.renderAge.bind(this),interval);
      }
      else
      {
        this.renderTime();
        setInterval(this.renderTime.bind(this),secondMS);
        return;
      }

      var savedPrecision = localStorage.getItem("precision");
      while(true)
      {
        var years = endMoment.diff(startMoment, 'years');
        var yearString = zeroFill(years.toString(), 2);
        if (savedPrecision == "year") {
          break;
        }
        startMoment.add(years, 'years');
        var months = endMoment.diff(startMoment, 'months');
        var monthString = zeroFill(months.toString(), 2);
        if (savedPrecision == "month") {
          break;
        }
        var days = endMoment.diff(startMoment, 'days');

        if( months > 0 )
        {
          var monthIndexOffset = months;
          for( indexOffset = 0; indexOffset != monthIndexOffset; indexOffset++ )
          {
            var currentIndexMonthDays = startMoment.daysInMonth();
            days -= currentIndexMonthDays;
            startMoment.month(startMoment.month()+1);
          }
        }
        var dayString = zeroFill(days.toString(), 2);
        if (savedPrecision == "day") {
          break;
        }

        duration = (duration % dayMS);
        var hours = Math.floor(duration / hourMS);
        var hourString = zeroFill(hours.toString(), 2);
        if (savedPrecision == "hour") {
          break;
        }
        duration = (duration % hourMS);
        var minutes = Math.floor(duration / minuteMS);
        var minuteString = zeroFill(minutes.toString(), 2);
        if (savedPrecision == "min") {
          break;
        }
        duration = (duration % minuteMS);
        var seconds = Math.floor(duration / secondMS);
        var secondString = zeroFill(seconds.toString(), 2);
        if (savedPrecision == "sec") {
          break;
        }
        duration = (duration % secondMS);
        var milliseconds = Math.floor(duration / 10);
        var msString = zeroFill(milliseconds.toString(), 2);
        break;
      }

      this.setAppElementHTML(this.getTemplateScript('age')(
      {
        white: whiteFlag,
        black: blackFlag,
        year: yearString,
        month: monthString,
        day: dayString,
        hour: hourString,
        minute: minuteString,
        second: secondString,
        ms: msString
      }));
    }
  };

  App.fn.generateCircleLoops = function(numberMonths, chaptersArray)
  {
    for (var chapter = 0; chapter < chaptersArray.length; chapter++) {
      var startMonth = chaptersArray[chapter][0] + 1;
      var endMonth = chaptersArray[chapter][1];
      var bkgdColor = getColorTheme()[chapter];

      var x;
      if( numberMonths > endMonth ) {
        for(x = startMonth ; x <= endMonth ; x++) {
          this.createCircle(bkgdColor, '1.00');
        }
      }
      else if( numberMonths > (startMonth-1) && numberMonths <= endMonth ){
        for(x = startMonth ; x < numberMonths ; x++) {
          this.createCircle(bkgdColor, '1.00');
        }

        var pie = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        pie.setAttribute("class","pie");
        pie.setAttribute("opacity","1.0");

        var circle;
        var path;
        if(localStorage.getItem("shape") == "square") {
          circle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          path = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        }
        else {
          circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        }
        circle.id = 'piecircle';
        circle.setAttribute("fill", bkgdColor);
        circle.setAttribute("fill-opacity","0.25");
        path.setAttribute("fill",bkgdColor);
        path.id = 'path';
        pie.appendChild(circle);
        pie.appendChild(path);
        this.documentCircle.appendChild(pie);

        for(x = (numberMonths+1) ; x <= endMonth ; x++) {
          this.createCircle(bkgdColor, '0.25');
        }
      }
      else
      {
        for(x = startMonth ; x <= endMonth ; x++) {
          this.createCircle(bkgdColor, '0.25');
        }
      }
    }
  };

  App.fn.createCircle = function(bkgdColor, opacity) {
    var circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.backgroundColor = bkgdColor;
    circle.style.opacity = opacity;
    this.documentCircle.appendChild(circle);
  };

  App.fn.saveDeath = function(deathDate)
  {
    var deathInput = $('countdownDate-input');

    if( !deathInput.valueAsDate ) return;

    this.deathDate = deathInput.valueAsDate;

    localStorage.setItem("deathDate", this.deathDate.getTime()+(this.deathDate.getTimezoneOffset() * minuteMS));

    var deathTimeCheckbox = document.querySelector('input[id=countdown-addTime-checkbox]');
    if( deathTimeCheckbox )
    {
      var deathTimeChecked = deathTimeCheckbox.checked;
      if( deathTimeChecked )
      {
        this.deathTime = localStorage.deathTime;
      }
      else
      {
        this.deathTime = 0;
        localStorage.removeItem("deathTimeSet");
        localStorage.removeItem("deathTime");
      }
    }
    else
    {
      this.deathTime = 0;
      localStorage.removeItem("deathTimeSet");
      localStorage.removeItem("deathTime");
    }
  };

  App.fn.renderTimeUp = function()
  {
    var timeup = $('white-timeup');
    if( !timeup )
    {
      timeup = $('black-timeup');
    }
    this.bubbleNumber(timeup, 1.05);
  };

  App.fn.renderAge = function()
  {
    var duration, startMoment, endMoment;
    var currentMoment = moment();
    var deadlineMoment = this.deadlineMoment;
    var birthMoment = moment(this.dob);
    if( localStorage.getItem("countdownEnabled") == "YES" )
    {
      duration = deadlineMoment - currentMoment;
      if( duration <= 0 )
      {
        location.reload();
        return;
      }
      startMoment = currentMoment;
      endMoment = deadlineMoment;
    }
    else
    {
      duration  = currentMoment - birthMoment - (parseInt(this.dobMinutes)*minuteMS);
      startMoment = birthMoment;
      endMoment = currentMoment;
    }

    var savedPrecision = localStorage.getItem("precision");
    while(true)
    {
      var years = endMoment.diff(startMoment, 'years');
      var yearString = zeroFill(years.toString(), 2);
      if (savedPrecision == "year") {
        break;
      }
      startMoment.add(years, 'years');
      var months = endMoment.diff(startMoment, 'months');
      var monthString = zeroFill(months.toString(), 2);
      if (savedPrecision == "month") {
        break;
      }
      var days = endMoment.diff(startMoment, 'days');

      if( months > 0 )
      {
        var monthIndexOffset = months;
        for( indexOffset = 0; indexOffset != monthIndexOffset; indexOffset++ )
        {
          var currentIndexMonthDays = startMoment.daysInMonth();
          days -= currentIndexMonthDays;
          startMoment.month(startMoment.month()+1);
        }
      }
      var dayString = zeroFill(days.toString(), 2);
      if (savedPrecision == "day") {
        break;
      }

      duration = (duration % dayMS);
      var hours = Math.floor(duration / hourMS);
      var hourString = zeroFill(hours.toString(), 2);
      if (savedPrecision == "hour") {
        break;
      }
      duration = (duration % hourMS);
      var minutes = Math.floor(duration / minuteMS);
      var minuteString = zeroFill(minutes.toString(), 2);
      if (savedPrecision == "min") {
        break;
      }
      duration = (duration % minuteMS);
      var seconds = Math.floor(duration / secondMS);
      var secondString = zeroFill(seconds.toString(), 2);
      if (savedPrecision == "sec") {
        break;
      }
      duration = (duration % secondMS);
      var milliseconds = Math.floor(duration / 10);
      var msString = zeroFill(milliseconds.toString(), 2);
      break;
    }
    var notBubbled = true;

    var year = $('year-number');
    if(year) {
      var yearFlag = year.innerHTML != yearString;
    }
    if(yearFlag) {
      year.innerHTML = yearString;
      this.bubbleNumber(year, 2.1);
      notBubbled = false;
    }

    var month = $('month-number');
    if(month) {
      var monthFlag = month.innerHTML != monthString;
    }
    if(monthFlag) {
      month.innerHTML = monthString;
      if(notBubbled) {
        this.bubbleNumber(month, 1.9);
        notBubbled = false;
      }
    }

    var day = $('day-number');
    if(day) {
      var dayFlag = day.innerHTML != dayString;
    }
    if(dayFlag) {
      day.innerHTML = dayString;
      if(notBubbled) {
        this.bubbleNumber(day, 1.7);
        notBubbled = false;
      }
    }

    var hour = $('hour-number');
    if(hour) {
      var hourFlag = hour.innerHTML != hourString;
    }
    if(hourFlag) {
      hour.innerHTML = hourString;
      if(notBubbled) {
        this.bubbleNumber(hour, 1.5);
        notBubbled = false;
      }
    }

    var minute = $('minute-number');
    if(minute) {
      var minuteFlag = minute.innerHTML != minuteString;
    }
    if(minuteFlag) {
      minute.innerHTML = minuteString;
      if(notBubbled) {
        this.bubbleNumber(minute, 1.3);
        notBubbled = false;
      }
    }

    var second = $('second-number');
    if(second) {
      second.innerHTML = secondString;
    }

    var millisecond = $('milli-number');
    if(millisecond) {
      millisecond.innerHTML = msString;
    }

  };


  App.fn.bubbleNumber = function(numberElement, scale)
  {
    requestAnimationFrame(function()
    {
      numberElement.style.webkitTransition=".1s ease-in-out";
      numberElement.style.webkitTransform="scale("+scale.toString()+")";
      setTimeout(function(){
        numberElement.style.webkitTransition=".8s ease-in-out";
        numberElement.style.webkitTransform="scale(1)";
      }, 80);
    }.bind(this));
  }


  App.fn.renderTime = function()
  {
    var now = new Date();
    var ampmString = "AM";
    var hour = now.getHours();
    if( hour > 11 ) {
      ampmString = "PM";
      hour = hour % 12;
    }
    if( hour == 0 ) {
      hour = 12;
    }
    var hourString = zeroFill(hour.toString(), 2);
    var minuteString = zeroFill(now.getMinutes().toString(), 2);
    var secondString = zeroFill(now.getSeconds().toString(), 2);

    var savedTheme = localStorage.getItem("colorTheme");
    if(savedTheme == "light" || savedTheme == "rainbowl" || savedTheme == "sky") {
      var whiteFlag = "YES";
    }
    else {
      var blackFlag = "YES";
    }

    requestAnimationFrame(function()
    {
      this.setAppElementHTML(this.getTemplateScript('clock')(
      {
        white: whiteFlag,
        black: blackFlag,
        hour: hourString,
        minute: minuteString,
        second: secondString,
        ampm: ampmString
      }));
    }.bind(this));
  };

  App.fn.setAppElementHTML = function(html){
    this.appElement.innerHTML = html;
  };

  App.fn.getTemplateScript = function(name){
    var templateElement = $(name + '-template');
    return Handlebars.compile(templateElement.innerHTML);
  };

  window.app = new App($('app'))

})();












/*********************
// Window Functions
**********************/

function animate(theta, radius) {
  if( isNaN(parseFloat(radius)) )
  {
    return;
  }
  var path = document.getElementById('path');
  var piecircle = document.getElementById('piecircle');
  if(path && piecircle) {
    if (localStorage.getItem("shape") == "square") {
      piecircle.setAttribute("height", (2 * radius));
      piecircle.setAttribute("width", (2 * radius));
      var fraction = theta/360;
      path.setAttribute("height", (2*radius));
      path.setAttribute("width", (fraction*(2*radius)));
    }
    else {
      piecircle.setAttribute("cx", radius);
      piecircle.setAttribute("cy", radius);
      piecircle.setAttribute("r", radius);

      theta += 0.5;
      theta %= 360;
      var x = Math.sin(theta * Math.PI / 180) * radius;
      var y = Math.cos(theta * Math.PI / 180) * -radius;
      var d = 'M0,0 v' + -radius + 'A' + radius + ',' + radius + ' 1 ' + ((theta > 180) ? 1 : 0) + ',1 ' + x + ',' + y + 'z';
      path.setAttribute('d', d);
      path.setAttribute('transform', 'translate(' + radius + ',' + radius + ')');
    }
  }
  setTimeout(animate, 7200000); // 1/360 of a month in ms
}


(function() {
  window.onresize= function() {
    var div = document.querySelector('#circles');
    var circleWidth = div.childNodes[0].offsetWidth;
    circle.style.height= circleWidth +'px';
    if(localStorage.getItem("shape") == "square") {
      circle.style.borderRadius = 0;
    }
    var radius = circle.style.height;
    pie.style.width = radius;
    pie.style.height = radius;

    var tempDoB = localStorage.dob;
    var tempDateDoB;
    if( tempDoB != 'null') {
      tempDateDoB = new Date(parseInt(tempDoB));
    }

    var currentDate = new Date;
    var oneDay = 24*60*60*1000;

    var diffDays = Math.round(Math.abs((currentDate.getTime() - tempDateDoB.getTime())/(oneDay)));
    var fractionOfMonth = ((diffDays%30)/30.0)*360;

    animate(fractionOfMonth, circleWidth/2);
  };

  var styleSheets = document.styleSheets,
      circle,
      pie,
      i, j, k;
  k = 0;
  var rules;
  for (i = 0; i < styleSheets.length; i++) {
    rules = styleSheets[i].rules ||
    styleSheets[i].cssRules;
    for (j = 0; j < rules.length; j++) {
      if (rules[j].selectorText === '.circle') {
        circle = rules[j];
        k++;
        if (k > 1) {
          break;
        }
      }
      else if (rules[j].selectorText === '.pie') {
        pie = rules[j];
        k++;
        if (k > 1) {
          break;
        }
      }
    }
  }
})();

(function($) {
    $(window).load(function () {
      if(localStorage.getItem("dob")===null)
      {
        $("#menu-button")[0].click();
      }
    });
})(jQuery);

(function() {
  [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
    new SelectFx(el);
  } );
})();

window.onresize();

