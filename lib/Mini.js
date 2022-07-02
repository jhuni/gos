Array.prototype.toString=function(){return this.join(",");};Array.prototype.reverse=function(){var start=0;var end=this.length-1;while(start<end){var endingValue=this[end];this[end]=this[start];this[start]=endingValue;start++;end--;}
return this;};Array.prototype.join=function(seperator){var rval='';var mylen=this.length;for(var i=0;i<mylen;i++){rval+=this[i];if(i!=mylen-1){rval+=seperator;}}
return rval;};Array.prototype.sort=function(compareFunction){if(typeof compareFunction=='undefined'){compareFunction=function(a,b){if(a.toString()>b.toString()){return 1;}else{return-1;}}}
var elems=this.length-1;while(1){var swappedYet=false;for(var i=0;i<elems;i++){var result=compareFunction(this[i],this[i+1]);if(result>0){var temp=this[i+1];this[i+1]=this[i];this[i]=temp;swappedYet=true;}}
if(!swappedYet){break;}}};Array.prototype.pop=function(){if(this.length==0){return undefined;}
var end=this.length-1;var temp=this[end];delete this[end];this.length=this.length-1;return temp;};Array.prototype.shift=function(){var mylen=this.length;if(mylen==0){return undefined;}
var temp=this[0];for(var i=1;i<mylen;i++){this[i-1]=this[i];}
delete[mylen-1];this.length=this.length-1;return temp;};Array.prototype.push=function(){var mylen=this.length;var arglen=arguments.length;for(var i=0;i<arglen;i++){this[mylen+i]=arguments[i];}
return this.length;};Array.prototype.unshift=function(){var arglen=arguments.length;var mylen=this.length;for(var i=mylen-1;i>=0;i--){this[i+arglen]=this[i];}
for(var i=0;i<arglen;i++){this[i]=arguments[i];}
return this.length;};Array.prototype.slice=function(begin,end){var len=this.length;if(typeof(begin)=='undefined'||begin==null){begin=0;}else if(0>begin){begin+=len;}
if(typeof(end)=='undefined'){end=len;}else if(0>end){end+=len;}
if(end>this.length){end=this.length;}
var rval=[];var currentIndex=0;for(var i=begin;i<end;i++){rval[currentIndex]=this[i];currentIndex++;}
return rval;};Array.prototype.concat=function(){var arglen=arguments.length;var mylen=this.length;var rval=new Array();for(var i=0;i<mylen;i++){rval[i]=this[i];}
var arrayOffset=mylen;for(var i=0;i<arglen;i++){var currentArg=arguments[i];if(currentArg.constructor.toString().indexOf("Array")==-1){rval[arrayOffset+i]=currentArg;}else{var subArrayLen=currentArg.length;for(var si=0;si<subArrayLen;si++){rval[arrayOffset+i]=currentArg[si];arrayOffset++;}
arrayOffset--;}}
return rval;};Array.prototype.splice=function(index,howMany){if(arguments.length==0){return arguments.callee;}
var len=this.length;var insertionCount=arguments.length-2;if(typeof howMany=='undefined'){howMany=len;insertionCount++;}
if(0>howMany){howMany=0;}
if(0>index){index+=len;}
var rval=this.slice(index,index+howMany);for(var i=index;i<len-howMany;i++){this[i]=this[i+howMany];}
this.length-=howMany;this.length+=insertionCount;for(var i=this.length-1;i>index;i--){this[i]=this[i-insertionCount];}
var argn=0;for(var i=0;i<insertionCount;i++){this[index+i]=arguments[2+argn++];}
return rval;};Number.prototype.toExponential=function(){var points=(this.toString().split('.'))[0].length-1;var newValue=this.valueOf();newValue/=Math.pow(10,points);var decimalPoints=arguments[0];if(typeof decimalPoints=='undefined'){decimalPoints=(this.toString().length)-2;if(0>decimalPoints){decimalPoints=0;}}
newValue*=Math.pow(10,decimalPoints);newValue=Math.round(newValue);newValue/=Math.pow(10,decimalPoints);return(newValue+"e+"+points);};Number.prototype.toFixed=function(decimalPoints){if(typeof decimalPoints=='undefined'){decimalPoints=0;}
var len=this.toString().length;var spaces=this.toString().split('.');var currentDec=len-spaces[0].length-1;var rval='';if(decimalPoints>currentDec){rval=this.toString();for(var i=0;i<(decimalPoints-currentDec);i++){rval+='0';}}else{rval+=spaces[0];if(decimalPoints!=0&&spaces.length!=1){rval+='.';for(var i=0;i<decimalPoints;i++){rval+=spaces[1].charAt(i);}}}
return rval;};Number.prototype.toPrecision=function(precision){if(typeof precision=='undefined'){return this.toString();}
if(precision.toString().indexOf(".")!=-1){precision=Math.floor(precision);}
if(0>=precision||precision>=101){throw new RangeError('precision '+precision+' out of range');}
var rval='';var spaces=this.toString().split('.');var decimalPoints=0;if(typeof spaces[1]!='undefined'){decimalPoints=spaces[1].length;}
var currentPoints=spaces[0].length+decimalPoints;var newDecimalPoints=precision-spaces[0].length;if(newDecimalPoints>decimalPoints){var zeroCount=precision-currentPoints;rval+=this.toString()
if(decimalPoints==0){rval+='.';}
for(var i=0;i<zeroCount;i++){rval+='0';}}else{if(newDecimalPoints>0){rval=this.toString().substr(0,precision+1);}else{var value=parseInt(spaces[0]);if(spaces[0].length==precision){return(value.toString());}
return(value.toExponential(precision-1));}}
return rval;};Array.prototype.indexOf=function(elt){var len=this.length;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from+=len;}
for(;from<len;from++){if(from in this&&this[from]===elt){return from;}}
return-1;};Array.prototype.lastIndexOf=function(elt)
{var len=this.length;var from=Number(arguments[1]);if(isNaN(from)){from=len-1;}else{from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from+=len;}else if(from>=len){from=len-1;}}
for(;from>-1;from--){if(from in this&&this[from]===elt){return from;}}
return-1;};Array.prototype.every=function(fun)
{var len=this.length;if(typeof fun!="function"){throw new TypeError();}
var thisp=arguments[1];for(var i=0;i<len;i++)
{if(i in this&&!fun.call(thisp,this[i],i,this)){return false;}}
return true;};Array.prototype.filter=function(fun)
{var len=this.length;if(typeof fun!="function"){throw new TypeError();}
var res=new Array();var thisp=arguments[1];for(var i=0;i<len;i++){if(i in this){var val=this[i];if(fun.call(thisp,val,i,this)){res.push(val);}}}
return res;};Array.prototype.forEach=function(fun)
{var len=this.length;if(typeof fun!="function"){throw new TypeError();}
var thisp=arguments[1];for(var i=0;i<len;i++)
{if(i in this){fun.call(thisp,this[i],i,this);}}};Array.prototype.map=function(fun)
{var len=this.length;if(typeof fun!="function"){throw new TypeError();}
var res=new Array(len);var thisp=arguments[1];for(var i=0;i<len;i++)
{if(i in this){res[i]=fun.call(thisp,this[i],i,this);}}
return res;};Array.prototype.some=function(fun)
{var len=this.length;if(typeof fun!="function"){throw new TypeError();}
var thisp=arguments[1];for(var i=0;i<len;i++){if(i in this&&fun.call(thisp,this[i],i,this)){return true;}}
return false;};Array.prototype.reduce=function(fun)
{var len=this.length;if(typeof fun!="function"){throw new TypeError();}
if(len==0&&arguments.length==1){throw new TypeError();}
var i=0;if(arguments.length>=2){var rv=arguments[1];}else{do{if(i in this){rv=this[i++];break;}
if(++i>=len){throw new TypeError();}}while(true);}
for(;i<len;i++){if(i in this){rv=fun.call(null,rv,this[i],i,this);}}
return rv;};Array.prototype.reduceRight=function(fun)
{var len=this.length;if(typeof fun!="function"){throw new TypeError();}
if(len==0&&arguments.length==1){throw new TypeError();}
var i=len-1;if(arguments.length>=2){var rv=arguments[1];}else{do{if(i in this){rv=this[i--];break;}
if(--i<0){throw new TypeError();}}while(true);}
for(;i>=0;i--){if(i in this){rv=fun.call(null,rv,this[i],i,this);}}
return rv;};String.prototype.anchor=function(href){return'<a name="'+href+'">'+this+'</a>';};String.prototype.bold=function(){return'<b>'+this+'</b>';};String.prototype.big=function(){return'<big>'+this+'</big>';};String.prototype.blink=function(){return'<blink>'+this+'</blink>';};String.prototype.fixed=function(){return'<tt>'+this+'</tt>';};String.prototype.fontcolor=function(color){return'<font color="'+color+'">'+this+'</font>';};String.prototype.fontsize=function(size){return'<font size="'+size+'">'+this+'</font>';};String.prototype.italics=function(){return'<i>'+this+'</i>';};String.prototype.small=function(){return'<small>'+this+'</small>';};String.prototype.strike=function(){return'<strike>'+this+'</strike>';};String.prototype.sub=function(){return'<sub>'+this+'</sub>';};String.prototype.sup=function(){return'<sup>'+this+'</sup>';};