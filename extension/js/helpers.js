Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
};

function daysInMonth(year, month) {
  return new Date(year, month+1, 0).getDate();
}

Date.prototype.getMonthsDaysPassed = function() {
  var currentDate = new Date();

  var monthDifference = currentDate.getMonth() - this.getMonth();

  //var numLeapDaysPassed =  Math.floor(currentDate.getFullYear()/4)- Math.floor(this.getFullYear()/4);

  var msDifference = currentDate - this;
  var dayDifference = Math.floor((msDifference % 31556952000)/86400000);
  if( dayDifference >= 365 )
  {
    dayDifference -= 365;
  }
  //dayDifference -= numLeapDaysPassed;
  var i = this.getMonth();
  var year = this.getYear();
  var end = currentDate.getMonth();

  var loop = 0;
  if( i == end && currentDate.getDate() >= this.getDate() )
  {
    dayDifference = currentDate.getDate() - this.getDate();
  }
  if( i == end && currentDate.getDate() < this.getDate() )
  {
    var loop = 12;
  }

  while( i != end || loop > 0 )
  {
    dayDifference -= daysInMonth(year, i);
    i += 1;
    if( i == 12 )
    {
      i = 0;
      year += 1;
    }
    loop-=1;
  }

  if( dayDifference < 0 )
  {
    dayDifference = daysInMonth(year, i-1) + dayDifference;
    monthDifference -= 1;
  }

  if( monthDifference < 0 )
  {
    monthDifference += 12;
  }

  if( dayDifference > 31 )
  {
    dayDifference = dayDifference % 31;
  }
  else if( dayDifference < 0 )
  {
    dayDifference = (-1*dayDifference) % 31;
  }
  return [monthDifference, dayDifference];
};

Date.prototype.getMonthsDaysLeft = function() {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getYear();
  var deathMonth = this.getMonth();
  var deathYear = this.getYear();

//0, 8 - 8
  var monthDifference = deathMonth - currentMonth;
  var msDifference = this - currentDate;
// 1
  var dayDifference = Math.floor((msDifference % 31556952000)/86400000);
  if( dayDifference < daysInMonth(currentYear, currentMonth) ) //Within the ~31 days (month) of current month
  {
    monthDifference = 0;
    return [monthDifference, dayDifference];
  }

  var loop = 0;
  var sameMonth = (deathMonth == currentMonth);
  if( sameMonth && this.getDate() >= currentDate.getDate() )
  {
    //This just guarantees the dayDifference is correct if within same month
    dayDifference = this.getDate() - currentDate.getDate();
    return [monthDifference, dayDifference];
  }
  if( sameMonth && this.getDate() < currentDate.getDate() )
  {
    //Within same month, but deathDay is before the currentDay.  Need to wrap around
    var loop = 12;
  }

  var iterator = currentMonth;
  while( iterator != deathMonth || loop > 0 )
  {
    dayDifference -= daysInMonth(currentYear, iterator);
    iterator += 1;
    if( iterator == 12 )
    {
      iterator = 0;
      currentYear += 1;
    }
    loop-=1;
  }

  // if( dayDifference < 0 )
  // {
  //   dayDifference = daysInMonth(deathYear, i-1) + dayDifference;
  //   monthDifference -= 1;
  // }

  // if( monthDifference < 0 )
  // {
  //   monthDifference += 12;
  // }

  // if( dayDifference > 31 )
  // {
  //   dayDifference = dayDifference % 31;
  // }
  // else if( dayDifference < 0 )
  // {
  //   dayDifference = (-1*dayDifference) % 31;
  // }
  return [monthDifference, dayDifference];
};

Date.prototype.stdTimezoneOffset = function() {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function() {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

function getTimeStringFromMinutes(totalMinutes) {
  var hours = Math.floor(totalMinutes/60);
  var minutes = totalMinutes%60;
  return zeroFill(hours,2)+":"+zeroFill(minutes,2)+":00";
}

function zeroFill(number, width)
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + "";
}