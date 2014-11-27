// array of get params 
function getParams(){
    var p = window.location.search.substring(1);
    var result = {};
    var cases = p.split('&');
    for (var i=0; i<cases.length; i++) {
        var pair = cases[i].split('=');
        var inners = [];
        var name = decodeURIComponent(pair[0]), value = decodeURIComponent(pair[1]);
        var name = name.replace(/\[([^\]]*)\]/g, function(k, inc) { inners.push(inc); return ""; });
        inners.unshift(name);
        var o = result;
        for (var j=0; j<inners.length-1; j++) {
            var inc = inners[j];
            var nextinc = inners[j+1];
            if (!o[inc]) {
                if ((nextinc == "") || (/^[0-9]+$/.test(nextinc)))
                    o[inc] = [];
                else
                    o[inc] = {};
            }
            o = o[inc];
        }
        inc = inners[inners.length-1];
        if (inc == "")
            o.push(value);
        else
            o[inc] = value;
    }
    return result;
}
// add some param get TODO create new for inners arrays
function addParam(param,value,attr){
    var params = getParams();
    if(!attr){                                    
        params[param] = value;    
         
    }
    else{
        try {
            if(params['attr'].length==0){
               params['attr']=[];
            }
        }
        catch(err) {
            params['attr']=[];
        }
        var info =param+":"+value;
        var boolAdd=true;                                    
        for(var i = params['attr'].length - 1; i >= 0; i--) {
            if(params['attr'][i] === info) {
               console.log(params['attr'][i]);
               params['attr'].splice(i, 1);
               boolAdd = false;
            }
        }

        if(boolAdd){                                        
            params['attr'].push(info);
        }
    }
    push(params);   
}

// Add new parameters or update existing ones                            
function push(params){
    location.search = $.param(params); 
}
