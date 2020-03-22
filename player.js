// gets the json file 
var script = document.createElement('script');
script.src = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867?callback=__5szm2kaj';

document.getElementsByTagName('head')[0].appendChild(script);

function __5szm2kaj(data)
{
    // checks the json opened successfully
    console.log(data.data);
    
    // setting the json file
    json = data.data;
    
    // ---------- adding the css file to google html ---------- //
    css = json.css;
    var node = document.createElement("style");
    node.appendChild(document.createTextNode(css));
    document.querySelector("head").appendChild(node);

    // ----------- render first tip ----------- ֿֿ//

    var tip1 = json.structure.steps[0];
    var id = tip1.id;
    var type = tip1.action.type;
    var text = tip1.action.contents["#content"];
    var numberOfSteps = json.structure.steps.length;
    var stepNum = tip1.action.stepOrdinal;

    
    // ----- finding the classes ----- //
    
    //adding "placment" class
    var tipClasses = [tip1.action.placement];

    // adding classes from "classes"
    // if there are more than one class
    if(Array.isArray(tip1.action.classes)){
        for(var i = 0; i < tip1.action.classes.length; i++){
            tipClasses.push(tip1.action.classes[i]);
        }
    } else {
        tipClasses.push(tip1.action.classes);
    }


    // ----- creating the divs ----- //
    var sttip = document.createElement("div");
    sttip.classList.add("sttip");
    
    var tooltip = document.createElement("div")
    tooltip.classList.add("tooltip");
    tooltip.classList.add("in");
    
    // adding the tip classes
    for (var i = 0; i < tipClasses.length; i++){
        tooltip.classList.add(tipClasses[i]);
    }

    var panelContainer = document.createElement("div");
    panelContainer.classList.add("panel-container");
    var guideContent = document.createElement("div");
    guideContent.classList.add("guide-content");
    var popoverInner = document.createElement("div");
    popoverInner.classList.add("popover-inner");

    // bulding the divs
    guideContent.appendChild(popoverInner);
    panelContainer.appendChild(guideContent);
    tooltip.appendChild(panelContainer);
    sttip.appendChild(tooltip);

    // ----- choosing the correct type ----- // 
    var tiplates = json.tiplates;

    // get the types names
    var keys = Object.keys(tiplates);
    
    // search which type is tip1 type
    for(var i = 0; i < keys.length; i++){
        // this is the type
        if(type == keys[i]){
            // add type pattern to div
            popoverInner.innerHTML = tiplates[keys[i]];
        }
    }

    // render on screen
    document.querySelector("body").appendChild(sttip);

    // adding tip text
    var contentDiv = document.querySelector("[data-iridize-id='content']");
    contentDiv.innerHTML = text;

    // adding step num out of number of steps 
    var stepsCounter = document.querySelector("[data-iridize-role='stepCount']");
    stepsCounter.textContent = stepNum;
    document.querySelector("span [data-iridize-role='stepCount']+span").textContent = numberOfSteps;
  
}