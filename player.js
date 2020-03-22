// gets the json file 
var script = document.createElement('script');
script.src = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867?callback=__5szm2kaj';

document.getElementsByTagName('head')[0].appendChild(script);

function __5szm2kaj(data)
{
    // checks the json opened successfully
    console.log(data.data);
    
    // setting the json file
    var json = data.data;
    
    // ----------- adding the css file to google html ----------- //
    addsCSS(json.css);
    
    // ----------- render first tip ----------- ֿֿ//

    var tip = json.structure.steps[0];
    var id = tip.id;
    var type = tip.action.type;
    var text = tip.action.contents["#content"];
    var numberOfSteps = json.structure.steps.length;
    var stepNum = tip.action.stepOrdinal;

    // ----- finding the classes ----- //
    var tipClasses = classes(tip);

    // ----- creating the divs ----- //
    var sttip = document.createElement("div");
    var tooltip = document.createElement("div")
    var panelContainer = document.createElement("div");
    var guideContent = document.createElement("div");
    var popoverInner = document.createElement("div");

    // bulding the divs
    buildDivs(sttip, tooltip, panelContainer, guideContent, popoverInner, tipClasses);
    
    // ----- choosing the correct type and inserts to the html ----- // 
    var tiplates = json.tiplates;
    insertType(type, tiplates, popoverInner);

    // render on screen
    document.querySelector("body").appendChild(sttip);

    // adding tip text
    addText(text);

    // adding step num out of number of steps 
    addStepsCounter(stepNum, numberOfSteps)
}

//adds stpes counter
function addStepsCounter(stepNum, numberOfSteps){
    var stepsCounter = document.querySelector("[data-iridize-role='stepCount']");
    stepsCounter.textContent = stepNum;
    document.querySelector("span [data-iridize-role='stepCount']+span").textContent = numberOfSteps;
}

// builds the divs
function buildDivs(sttip, tooltip, panelContainer, guideContent, popoverInner, tipClasses){
    
    // adding classes
    sttip.classList.add("sttip");

    tooltip.classList.add("tooltip");
    tooltip.classList.add("in");

    // adding the tip classes
    for (var i = 0; i < tipClasses.length; i++){
        tooltip.classList.add(tipClasses[i]);
    }

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
function insertType(type, tiplates, popoverInner){
    // get the types names
    var keys = Object.keys(tiplates);

    // search which type is tip type
    for(var i = 0; i < keys.length; i++){
        // this is the type
        if(type == keys[i]){
            // add type pattern to div
            popoverInner.innerHTML = tiplates[keys[i]];
        }
    }
}

// adds the css to google html
function addsCSS(css){
    var node = document.createElement("style");
    node.appendChild(document.createTextNode(css));
    document.querySelector("head").appendChild(node);
}

// return all tip classes
function classes(tip){
    var arr = [tip.action.placement];

    // adding classes from "classes"
    // if there are more than one class
    if(Array.isArray(tip.action.classes)){
        for(var i = 0; i < tip.action.classes.length; i++){
            arr.push(tip.action.classes[i]);
        }
    } else {
        arr.push(tip.action.classes);
    }

    return arr;
}

