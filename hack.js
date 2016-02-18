var locals = {
	lis : [],
	done: false,
	download_links: [],
	todo: undefined
};


var log = function(a,b,c){
	console.log(a,b,c);
}


function store(ob,cb){
	//overwrite the local store, then save
	for(var k in ob )
		locals[ k ] = ob[k];

	delog(locals);
	chrome.storage.sync.set(locals ,function(){
		//now save it to the local variable store
		cb();
	});
}


var delog = function(a,b,c){
	console.log(a,b,c);
}

var map = {
    up : {
    "A": "Bb",
    "B": "C",
    "C": "C#",
    "D": "D#",
    "E": "F",
    "F": "F#",
    "G": "G#",

    "A#": "B",
    "B#": "C#",
    "C#": "D",
    "D#": "E",
    "E#": "F#",
    "F#": "G",
    "G#": "A",

    "Ab": "A",
    "Bb": "B",
    "Cb": "C",
    "Db": "D",
    "Eb": "E",
    "Fb": "F",
    "Gb": "G"
  } , 
  down: {
    "A": "Ab",
    "B": "Bb",
    "C": "B",
    "D": "Db",
    "E": "Eb",
    "F": "E",
    "G": "Gb",

    "A#": "A",
    "B#": "B",
    "C#": "C",
    "D#": "D",
    "E#": "E",
    "F#": "F",
    "G#": "G",

    "Ab": "G",
    "Bb": "A",
    "Cb": "Bb",
    "Db": "C",
    "Eb": "D",
    "Fb": "Eb",
    "Gb": "F"
  } 
}

function ab(){
  jQuery("script").remove();
  jQuery("head meta").remove();
  jQuery("head link").remove();
  var title = jQuery("h1[itemprop]").text();
  var a = jQuery("pre.js-tab-content").html(); 
  var pre = jQuery("<pre></pre>");
  var hdr = jQuery("<h2>"+title+"</h2>");
  var upbtn= jQuery("<button>Half Step Up</button>");
  var downbtn = jQuery("<button>Half Step Down</button>");
  var sbtn = jQuery("<button>Scroll</button>");
  var sec = jQuery("<input value='30' id='seconds'/>");

  downbtn.bind("click", downstep);
  upbtn.bind("click", upstep);
  sbtn.bind("click", scroll);
  console.log(hdr);
  console.log(upbtn);

  pre.html(a);

  jQuery("body").attr("background","").css("background-color","#fff").css("margin","20px")
  .html(hdr)
  .append(upbtn)
  .append(downbtn)
  .append(sec)
  .append(sbtn)
  .append(pre);
}

function upstep(){ step('up') }
function downstep(){ step('down') }
function step(way){
  jQuery("span").each(function(idx,el){
    var chord =  jQuery(el).text().trim();
    console.log("old:",chord);
    var mm = chord.match( /[A-G][#b]{0,1}/g );
    mm.forEach(function(m){
      chord = chord.replace(m, map[way][m]);
    });
    console.log("new:",chord);
    jQuery(el).text(chord);
  });
}

function scroll() {

  var element = jQuery("body");
  var seconds = parseInt( jQuery("#seconds").val(), 10 );
  var speed=1000*60*seconds;
  console.log("Scrolling over " + speed + " seconds");
  element.animate({ scrollTop: $(document).height() }, speed,'linear', function() {
    $(this).animate({ scrollTop: 0 }, speed, 'linear', scroll(element, speed));
  });

}

function init(){
	console.log("init fired, load locals from chrome store");
  $(".t_header").css("cursor","pointer").bind("click",ab);
  return;
}



setTimeout(init, 2000);

