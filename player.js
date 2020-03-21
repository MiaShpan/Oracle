// gets the json file 
var script = document.createElement('script');
script.src = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867?callback=__5szm2kaj';

document.getElementsByTagName('head')[0].appendChild(script);

function __5szm2kaj(data)
{
    // checks the json opened successfully
    console.log(data.data);
}