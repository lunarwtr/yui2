/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * The static Number class provides helper functions to deal with data of type
 * Number.
 *
 * @namespace YAHOO.util
 * @requires yahoo
 * @class Number
 * @static
 */
 YAHOO.util.Number = {
 
     /**
     * Takes a native JavaScript Number and formats to string for display to user.
     *
     * @method format
     * @param nData {Number} Number.
     * @param oConfig {Object} (Optional) Optional configuration values:
     *  <dl>
     *   <dt>prefix {String}</dd>
     *   <dd>String prepended before each number, like a currency designator "$"</dd>
     *   <dt>decimalPlaces {Number}</dd>
     *   <dd>Number of decimal places to round.</dd>
     *   <dt>decimalSeparator {String}</dd>
     *   <dd>Decimal separator</dd>
     *   <dt>thousandsSeparator {String}</dd>
     *   <dd>Thousands separator</dd>
     *   <dt>suffix {String}</dd>
     *   <dd>String appended after each number, like " items" (note the space)</dd>
     *  </dl>
     * @return {String} Formatted number for display.
     */
    format : function(nData, oConfig) {
        oConfig = oConfig || {};
        
        if(!YAHOO.lang.isNumber(nData)) {
            nData *= 1;
        }

        if(YAHOO.lang.isNumber(nData)) {
            var bNegative = (nData < 0);
            var sOutput = nData + "";
            var sDecimalSeparator = (oConfig.decimalSeparator) ? oConfig.decimalSeparator : ".";
            var nDotIndex;

            // Manage decimals
            if(YAHOO.lang.isNumber(oConfig.decimalPlaces)) {
                // Round to the correct decimal place
                var nDecimalPlaces = oConfig.decimalPlaces;
                var nDecimal = Math.pow(10, nDecimalPlaces);
                sOutput = Math.round(nData*nDecimal)/nDecimal + "";
                nDotIndex = sOutput.lastIndexOf(".");

                if(nDecimalPlaces > 0) {
                    // Add the decimal separator
                    if(nDotIndex < 0) {
                        sOutput += sDecimalSeparator;
                        nDotIndex = sOutput.length-1;
                    }
                    // Replace the "."
                    else if(sDecimalSeparator !== "."){
                        sOutput = sOutput.replace(".",sDecimalSeparator);
                    }
                    // Add missing zeros
                    while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
                        sOutput += "0";
                    }
                }
            }
            
            // Add the thousands separator
            if(oConfig.thousandsSeparator) {
                var sThousandsSeparator = oConfig.thousandsSeparator;
                nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
                nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
                var sNewOutput = sOutput.substring(nDotIndex);
                var nCount = -1;
                for (var i=nDotIndex; i>0; i--) {
                    nCount++;
                    if ((nCount%3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
                        sNewOutput = sThousandsSeparator + sNewOutput;
                    }
                    sNewOutput = sOutput.charAt(i-1) + sNewOutput;
                }
                sOutput = sNewOutput;
            }

            // Prepend prefix
            sOutput = (oConfig.prefix) ? oConfig.prefix + sOutput : sOutput;

            // Append suffix
            sOutput = (oConfig.suffix) ? sOutput + oConfig.suffix : sOutput;

            return sOutput;
        }
        // Still not a Number, just return unaltered
        else {
            return nData;
        }
    }
 };



/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

(function () {

var xPad=function (x, pad, r)
{
    if(typeof r === 'undefined')
    {
        r=10;
    }
    for( ; parseInt(x, 10)<r && r>1; r/=10) {
        x = pad.toString() + x;
    }
    return x.toString();
};


/**
 * The static Date class provides helper functions to deal with data of type Date.
 *
 * @namespace YAHOO.util
 * @requires yahoo
 * @class Date
 * @static
 */
 var Dt = {
    formats: {
        a: function (d, l) { return l.a[d.getDay()]; },
        A: function (d, l) { return l.A[d.getDay()]; },
        b: function (d, l) { return l.b[d.getMonth()]; },
        B: function (d, l) { return l.B[d.getMonth()]; },
        C: function (d) { return xPad(parseInt(d.getFullYear()/100, 10), 0); },
        d: ['getDate', '0'],
        e: ['getDate', ' '],
        g: function (d) { return xPad(parseInt(Dt.formats.G(d)%100, 10), 0); },
        G: function (d) {
                var y = d.getFullYear();
                var V = parseInt(Dt.formats.V(d), 10);
                var W = parseInt(Dt.formats.W(d), 10);
    
                if(W > V) {
                    y++;
                } else if(W===0 && V>=52) {
                    y--;
                }
    
                return y;
            },
        H: ['getHours', '0'],
        I: function (d) { var I=d.getHours()%12; return xPad(I===0?12:I, 0); },
        j: function (d) {
                var gmd_1 = new Date('' + d.getFullYear() + '/1/1 GMT');
                var gmdate = new Date('' + d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' GMT');
                var ms = gmdate - gmd_1;
                var doy = parseInt(ms/60000/60/24, 10)+1;
                return xPad(doy, 0, 100);
            },
        k: ['getHours', ' '],
        l: function (d) { var I=d.getHours()%12; return xPad(I===0?12:I, ' '); },
        m: function (d) { return xPad(d.getMonth()+1, 0); },
        M: ['getMinutes', '0'],
        p: function (d, l) { return l.p[d.getHours() >= 12 ? 1 : 0 ]; },
        P: function (d, l) { return l.P[d.getHours() >= 12 ? 1 : 0 ]; },
        s: function (d, l) { return parseInt(d.getTime()/1000, 10); },
        S: ['getSeconds', '0'],
        u: function (d) { var dow = d.getDay(); return dow===0?7:dow; },
        U: function (d) {
                var doy = parseInt(Dt.formats.j(d), 10);
                var rdow = 6-d.getDay();
                var woy = parseInt((doy+rdow)/7, 10);
                return xPad(woy, 0);
            },
        V: function (d) {
                var woy = parseInt(Dt.formats.W(d), 10);
                var dow1_1 = (new Date('' + d.getFullYear() + '/1/1')).getDay();
                // First week is 01 and not 00 as in the case of %U and %W,
                // so we add 1 to the final result except if day 1 of the year
                // is a Monday (then %W returns 01).
                // We also need to subtract 1 if the day 1 of the year is 
                // Friday-Sunday, so the resulting equation becomes:
                var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
                if(idow === 53 && (new Date('' + d.getFullYear() + '/12/31')).getDay() < 4)
                {
                    idow = 1;
                }
                else if(idow === 0)
                {
                    idow = Dt.formats.V(new Date('' + (d.getFullYear()-1) + '/12/31'));
                }
    
                return xPad(idow, 0);
            },
        w: 'getDay',
        W: function (d) {
                var doy = parseInt(Dt.formats.j(d), 10);
                var rdow = 7-Dt.formats.u(d);
                var woy = parseInt((doy+rdow)/7, 10);
                return xPad(woy, 0, 10);
            },
        y: function (d) { return xPad(d.getFullYear()%100, 0); },
        Y: 'getFullYear',
        z: function (d) {
                var o = d.getTimezoneOffset();
                var H = xPad(parseInt(Math.abs(o/60), 10), 0);
                var M = xPad(o%60, 0);
                return (o>0?'-':'+') + H + M;
            },
        Z: function (d) { return d.toString().replace(/^.*\(([^)]+)\)$/, '$1'); },
        '%': function (d) { return '%'; }
    },

    aggregates: {
        c: 'locale',
        D: '%m/%d/%y',
        F: '%Y-%m-%d',
        h: '%b',
        n: '\n',
        r: 'locale',
        R: '%H:%M',
        t: '\t',
        T: '%H:%M:%S',
        x: 'locale',
        X: 'locale'
        //'+': '%a %b %e %T %Z %Y'
    },

     /**
     * Takes a native JavaScript Date and formats to string for display to user.
     *
     * @method format
     * @param oDate {Date} Date.
     * @param oConfig {Object} (Optional) Optional configuration values:
     *  <dl>
     *   <dt>format {String}</dt>
     *   <dd>Any format defined by strftime is supported</dd>
     *  </dl>
     *  strftime has several format specifiers defined by the Open group at 
     *  http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
     *
     *  PHP added a few of its own, defined at http://www.php.net/strftime
     *
     *  This javascript implementation supports all the PHP specifiers and a few more.
     *
     *  @arg \%a - abbreviated weekday name according to the current locale
     *  @arg \%A - full weekday name according to the current locale
     *  @arg \%b - abbreviated month name according to the current locale
     *  @arg \%B - full month name according to the current locale
     *  @arg \%c - preferred date and time representation for the current locale
     *  @arg \%C - century number (the year divided by 100 and truncated to an integer, range 00 to 99)
     *  @arg \%d - day of the month as a decimal number (range 01 to 31)
     *  @arg \%D - same as %m/%d/%y
     *  @arg \%e - day of the month as a decimal number, a single digit is preceded by a space (range ' 1' to '31')
     *  @arg \%F - same as %Y-%m-%d (ISO 8601 date format)
     *  @arg \%g - like %G, but without the century
     *  @arg \%G - The 4-digit year corresponding to the ISO week number
     *  @arg \%h - same as %b
     *  @arg \%H - hour as a decimal number using a 24-hour clock (range 00 to 23)
     *  @arg \%I - hour as a decimal number using a 12-hour clock (range 01 to 12)
     *  @arg \%j - day of the year as a decimal number (range 001 to 366)
     *  @arg \%k - hour as a decimal number using a 24-hour clock (range 0 to 23); single digits are preceded by a blank. (See also %H.)
     *  @arg \%l - hour as a decimal number using a 12-hour clock (range 1 to 12); single digits are preceded by a blank. (See also %I.) 
     *  @arg \%m - month as a decimal number (range 01 to 12)
     *  @arg \%M - minute as a decimal number
     *  @arg \%n - newline character
     *  @arg \%p - either `AM' or `PM' according to the given time value, or the corresponding strings for the current locale
     *  @arg \%P - like %p, but lower case
     *  @arg \%r - time in a.m. and p.m. notation equal to %I:%M:%S %p
     *  @arg \%R - time in 24 hour notation equal to %H:%M
     *  @arg \%s - number of seconds since the Epoch, ie, since 1970-01-01 00:00:00 UTC
     *  @arg \%S - second as a decimal number
     *  @arg \%t - tab character
     *  @arg \%T - current time, equal to %H:%M:%S
     *  @arg \%u - weekday as a decimal number [1,7], with 1 representing Monday
     *  @arg \%U - week number of the current year as a decimal number, starting with
     *             the first Sunday as the first day of the first week
     *  @arg \%V - The ISO 8601:1988 week number of the current year as a decimal number,
     *             range 01 to 53, where week 1 is the first week that has at least 4 days
     *             in the current year, and with Monday as the first day of the week.
     *  @arg \%w - day of the week as a decimal, Sunday being 0
     *  @arg \%W - week number of the current year as a decimal number, starting with the
     *             first Monday as the first day of the first week
     *  @arg \%x - preferred date representation for the current locale without the time
     *  @arg \%X - preferred time representation for the current locale without the date
     *  @arg \%y - year as a decimal number without a century (range 00 to 99)
     *  @arg \%Y - year as a decimal number including the century
     *  @arg \%z - numerical time zone representation
     *  @arg \%Z - time zone name or abbreviation
     *  @arg \%% - a literal `\%' character
     * @param sLocale {String} (Optional) The locale to use when displaying days of week,
     *  months of the year, and other locale specific strings.  The following locales are
     *  built in:
     *  <dl>
     *   <dt>en</dt>
     *   <dd>English</dd>
     *   <dt>en-US</dt>
     *   <dd>US English</dd>
     *   <dt>en-GB</dt>
     *   <dd>British English</dd>
     *   <dt>en-AU</dt>
     *   <dd>Australian English (identical to British English)</dd>
     *  </dl>
     *  More locales may be added by subclassing of YAHOO.util.DateLocale.
     *  See YAHOO.util.DateLocale for more information.
     * @return {String} Formatted date for display.
     * @sa YAHOO.util.DateLocale
     */
    format : function (oDate, oConfig, sLocale) {
        oConfig = oConfig || {};
        
        if(!(oDate instanceof Date)) {
            return YAHOO.lang.isValue(oDate) ? oDate : "";
        }

        var format = oConfig.format || "%m/%d/%Y";

        // Be backwards compatible, support strings that are
        // exactly equal to YYYY/MM/DD, DD/MM/YYYY and MM/DD/YYYY
        if(format === 'YYYY/MM/DD') {
            format = '%Y/%m/%d';
        } else if(format === 'DD/MM/YYYY') {
            format = '%d/%m/%Y';
        } else if(format === 'MM/DD/YYYY') {
            format = '%m/%d/%Y';
        }
        // end backwards compatibility block
 
        sLocale = sLocale || "en";

        // Make sure we have a definition for the requested locale, or default to en.
        if(!(sLocale in YAHOO.util.DateLocale)) {
            if(sLocale.replace(/-[a-zA-Z]+$/, '') in YAHOO.util.DateLocale) {
                sLocale = sLocale.replace(/-[a-zA-Z]+$/, '');
            } else {
                sLocale = "en";
            }
        }

        var aLocale = YAHOO.util.DateLocale[sLocale];

        var replace_aggs = function (m0, m1) {
            var f = Dt.aggregates[m1];
            return (f === 'locale' ? aLocale[m1] : f);
        };

        var replace_formats = function (m0, m1) {
            var f = Dt.formats[m1];
            if(typeof f === 'string') {             // string => built in date function
                return oDate[f]();
            } else if(typeof f === 'function') {    // function => our own function
                return f.call(oDate, oDate, aLocale);
            } else if(typeof f === 'object' && typeof f[0] === 'string') {  // built in function with padding
                return xPad(oDate[f[0]](), f[1]);
            } else {
                return m1;
            }
        };

        // First replace aggregates (run in a loop because an agg may be made up of other aggs)
        while(format.match(/%[cDFhnrRtTxX]/)) {
            format = format.replace(/%([cDFhnrRtTxX])/g, replace_aggs);
        }

        // Now replace formats (do not run in a loop otherwise %%a will be replace with the value of %a)
        var str = format.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, replace_formats);

        replace_aggs = replace_formats = undefined;

        return str;
    }
 };
 
 YAHOO.namespace("YAHOO.util");
 YAHOO.util.Date = Dt;

/**
 * The DateLocale class is a container and base class for all
 * localised date strings used by YAHOO.util.Date. It is used
 * internally, but may be extended to provide new date localisations.
 *
 * @namespace YAHOO.util
 * @requires yahoo
 * @class DateLocale
 *
 * To create your own DateLocale, follow these steps:
 * <ol>
 *  <li>Find an existing locale that matches closely with your needs</li>
 *  <li>Use this as your base class.  Use YAHOO.util.DateLocale if nothing
 *   matches.</li>
 *  <li>Create your own class as an extension of the base class using
 *   YAHOO.lang.merge, and add your own localisations where needed.
 * </ol>
 * See the YAHOO.util.DateLocale['en-US'] and YAHOO.util.DateLocale['en-GB']
 * classes which extend YAHOO.util.DateLocale['en'].
 *
 * For example, to implement locales for French french and Canadian french,
 * we would do the following:
 * <ol>
 *  <li>For French french, we have no existing similar locale, so use
 *   YAHOO.util.DateLocale as the base, and extend it:
 *   <pre>
 *      YAHOO.util.DateLocale['fr'] = YAHOO.lang.merge(YAHOO.util.DateLocale, {
 *          a: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
 *          A: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
 *          b: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'déc'],
 *          B: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
 *          c: '%a %d %b %Y %T %Z',
 *          p: ['', ''],
 *          P: ['', ''],
 *          x: '%d.%m.%Y',
 *          X: '%T'
 *      });
 *   </pre>
 *  </li>
 *  <li>For Canadian french, we start with French french and change the meaning of \%x:
 *   <pre>
 *      YAHOO.util.DateLocale['fr-CA'] = YAHOO.lang.merge(YAHOO.util.DateLocale['fr'], {
 *          x: '%Y-%m-%d'
 *      });
 *   </pre>
 *  </li>
 * </ol>
 *
 * With that, you can use your new locales:
 * <pre>
 *    var d = new Date("2008/04/22");
 *    YAHOO.util.Date.format(d, {format: "%A, %d %B == %x"}, "fr");
 * </pre>
 * will return:
 * <pre>
 *    mardi, 22 avril == 22.04.2008
 * </pre>
 * And
 * <pre>
 *    YAHOO.util.Date.format(d, {format: "%A, %d %B == %x"}, "fr-CA");
 * </pre>
 * Will return:
 * <pre>
 *   mardi, 22 avril == 2008-04-22
 * </pre>
 */
 YAHOO.util.DateLocale = {
        a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        B: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        c: '%a %d %b %Y %T %Z',
        p: ['AM', 'PM'],
        P: ['am', 'pm'],
        r: '%I:%M:%S %p',
        x: '%d/%m/%y',
        X: '%T'
 };

 YAHOO.util.DateLocale['en'] = YAHOO.lang.merge(YAHOO.util.DateLocale, {});

 YAHOO.util.DateLocale['en-US'] = YAHOO.lang.merge(YAHOO.util.DateLocale['en'], {
        c: '%a %d %b %Y %I:%M:%S %p %Z',
        x: '%m/%d/%Y',
        X: '%I:%M:%S %p'
 });

 YAHOO.util.DateLocale['en-GB'] = YAHOO.lang.merge(YAHOO.util.DateLocale['en'], {
        r: '%l:%M:%S %P %Z'
 });
 YAHOO.util.DateLocale['en-AU'] = YAHOO.lang.merge(YAHOO.util.DateLocale['en']);

})();
