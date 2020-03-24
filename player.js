//adding jQuery script to html
var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.js"
integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
crossorigin="anonymous";

script.onload = function(){
    // when jQuery loads start 
    start();
}
document.getElementsByTagName('head')[0].appendChild(script);  

function start(){

    // gets the json file 
    var script = document.createElement('script');
    // json link
    script.src = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867?callback=__5szm2kaj';
    
    document.getElementsByTagName('head')[0].appendChild(script);
}

function __5szm2kaj(data){

    if(data == null){
        window.alert(`JSON file is null`);
        return;
    }
    
    // setting the json file
    json = data.data;
    // setting the number of steps 
    numberOfSteps = parseInt(json.structure.steps.length);
    
    // ----------- adding the css file to google html ----------- //
    addsCSS(json.css);
    
    // checks if this is the first run
    let id = sessionStorage.getItem('id') ?
    sessionStorage.getItem('id') : null;

    // this is the first run
    if (id == null){

       // ----------- render first tip ----------- ֿֿ//
        renderTip(json.structure.steps[0]); 
    } 
    // this is not the first run
    else {

        // render tip number "id"
        renderNextTipFromStorage(id);
    }
}

// render tip
function renderTip(tip){

    if(tip == null){
        window.alert(`You sent a null tip`);
        return;
    }

    // ----- Variables ----- //
    var id = tip.id;
    var type = tip.action.type;
    var text = tip.action.contents["#content"];
    var next = tip.followers[0].next;
    var selector = tip.action.selector;
    var tiplates = json.tiplates;

    if(id == null || type == null || text == null || next == null || selector == null || tiplates == null){
        window.alert(`json is missing arguments in tip ${id}`);
        return;
    }


    // ----- creating the divs ----- //
    var sttip = document.createElement("div");
    var tooltip = document.createElement("div")
    var panelContainer = document.createElement("div");
    var guideContent = document.createElement("div");
    var popoverInner = document.createElement("div");

    // bulding the divs
    buildDivs(tip, sttip, tooltip, panelContainer, guideContent, popoverInner);
    
    // ----- choosing the correct type and inserts to the html ----- // 
    // if it returns false - the type was not found - nothing to render
    if(!insertType(type, tiplates, popoverInner)){
        return;
    }

    // renders on screen
    document.querySelector("body").appendChild(sttip);

    // adds tip text
    addText(text);

    // adds step num out of number of steps 
    addStepsCounter(id, numberOfSteps - 1);

    // adds the close btn 
    addClosingBtn(document.querySelector("[data-iridize-role='closeBt']"), sttip);
    
    // adds "remind me later" btn
    addClosingBtn(document.querySelector("[data-iridize-role='laterBt']"), sttip);

    // adds prev btn
    var prevBtn = document.querySelector("[data-iridize-role='prevBt']");
    prevBtn.addEventListener("click", function(){
        prevTip(id);
    });

    // if this is the last tip
    // pushing next btn wont render next tip
    if(isLast(id)){
        // next btn 
        var nextbtn = document.querySelector("[data-iridize-role='nextBt']");
        nextbtn.setAttribute("href", `javascript:lastTip();`);

        var selectorBtn = $(selector);

        //if the selector was found
        // set tip to be in selector position
        if(selectorBtn.length){
            
            // gets selector position
            var leftPos  = selectorBtn.offset().left;
            var topPos   = selectorBtn.offset().top;
            // sets tip position
            $(".sttip").offset({top:topPos,left:leftPos});
        }

        $(selectorBtn).click(function() {
            lastTip(next);
        });
    }
    // this is not the last tip
    else{
        // next btn 
        var nextbtn = document.querySelector("[data-iridize-role='nextBt']");
        nextbtn.setAttribute("href", `javascript:nextTip(${next});`);

        // selector 
        // in the next page the code will be reloaded
        var selectorBtn = $(selector);

        //if the selector was found
        // set tip to be in selector position
        if(selectorBtn.length){
            
            // gets selector position
            var leftPos  = selectorBtn.offset().left;
            var topPos   = selectorBtn.offset().top;
            // sets tip position
            $(".sttip").offset({top:topPos,left:leftPos});
        }
     
        $(selectorBtn).click(function() {
            // the btn will link to a new page where the code will reload
            // need to save the state in the sessionStorage
            if(selectorBtn.attr("href") != null){
                sessionStorage.setItem("id", next);
            }
            // the button will not link to a new page
            // render next tip
            else {
                nextTip(next);
            }

        }); 
    } 
}

// adds event for closing btn
function addClosingBtn(btn, sttip){
    btn.addEventListener("click", function(){
        close(sttip);
    });
}

// renders a messege on the screen
function lastTip(){
        window.alert("This is the last tip");
}

// checks if tip'id' is the last tip
// return true if it is
function isLast(id){
    if(stepNumCounter(id)==numberOfSteps - 1){
        return true;
    }
    else{
        return false;
    }
}

// renders the tip when script is reloaded
function renderNextTipFromStorage(id){
    sendToRender(id);
}

// sends the correct tip given it's id to render
function sendToRender(id){
    // render tip <id>
    for (var i = 0; i < numberOfSteps; i++){
        if(json.structure.steps[i].id == id){
            renderTip(json.structure.steps[i]);
        }
    }
}

// handels the rendring of the next string 
function nextTip(id){
    // close prev tip
    var lastTip = document.querySelector(".sttip");
    close(lastTip);

    // renders this tip
    sendToRender(id);
}

// handels the rendring of the prev tip
function prevTip(id){
    
    var prevTipIndex;

    for (var i = 0; i < numberOfSteps; i++){
        if(json.structure.steps[i].id == id){
            prevTipIndex = i - 1;
            break;
        }
    }
    // the current tip is not the first one
    if(prevTipIndex != -1){
        // closing current tip
        var currentTip = document.querySelector(".sttip");
        close(currentTip);

        // rendring prev tip
        renderTip(json.structure.steps[prevTipIndex]);

    }
    // the current tip is the first tip
    else {
        window.alert("This is the first tip");
        return;
    }   
}

// closes the window
function close(sttip){
    sttip.parentNode.removeChild(sttip);
}

//adds stpes counter
function addStepsCounter(id, numberOfSteps){
    var stepNum = stepNumCounter(id);

    var stepsCounter = document.querySelector("[data-iridize-role='stepCount']");
    stepsCounter.textContent = stepNum;
    document.querySelector("span [data-iridize-role='stepCount']+span").textContent = numberOfSteps;
}

// count which step number is this tip
function stepNumCounter(id){
    var counter = 0;
    for(var i = 0; i < numberOfSteps; i++){
        counter = counter + 1;
        if(json.structure.steps[i].id == id){
            return counter;
        }
    }
    return counter;
}



// builds the divs
function buildDivs(tip, sttip, tooltip, panelContainer, guideContent, popoverInner){
    
    // adding classes
    sttip.classList.add("sttip");

    // classes are the tip classes
    tooltip.setAttribute("class", `tooltip in ${classes(tip)}`);

    panelContainer.classList.add("panel-container");
    guideContent.classList.add("guide-content");
    popoverInner.classList.add("popover-inner");

    // appending the divs
    guideContent.appendChild(popoverInner);
    panelContainer.appendChild(guideContent);
    tooltip.appendChild(panelContainer);
    sttip.appendChild(tooltip);
}

// adding tip text
function addText(text){
    var contentDiv = document.querySelector("[data-iridize-id='content']");
    contentDiv.innerHTML = text;
}

// choosing the correct type and inserting the html
// if no type matches - it is the last tip - return false
function insertType(type, tiplates, popoverInner){
    // get the types names
    var keys = Object.keys(tiplates);

    // search which type is tip type
    for(var i = 0; i < keys.length; i++){
        // this is the type
        if(type == keys[i]){
            // add type pattern to div
            popoverInner.innerHTML = tiplates[keys[i]];
            return true;
        }
    }
    return false;
}

// adds the css to google html
function addsCSS(css){
    var node = document.createElement("style");
    node.appendChild(document.createTextNode(css));
    document.querySelector("head").appendChild(node);
}

// return all tip classes in a string
function classes(tip){
    var str = tip.action.placement.concat(` ${tip.action.classes}`);
    return str;
}

