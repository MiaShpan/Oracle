This code renders guide tips on the google.com page.

jQuery is loaded to the HTML of google.com

The code reads the given JSON file from the URL ("https://guidedlearning.oracle..."), where each step in the file represents a tip.

The CSS given in the JSON file is loaded into the HTML of google.com

If it is the first run of the code (nothing stored in sessionStorage), The first tip is rendered.

If it is not the first run of the code, the tip with the id that is saved in the sessionStorage is rendered.

The tips are rendered through the renderTip() function.

For each tip, based on the tip type, an HTML element will 
be created and added to the HTML page of google.com.

The element is taken from the tiplates in the JSON file and based on the tip "type".

This element is wrapped in divs with classes taken from the CSS to match the style, as well as the "placement" and "classes" from the tip "action".

The text of the tip and step number is also taken from the JSON file and rendered on the screen.

The tip position is set to be its "selector" position.

If the next button is shown (no class specify to hide the button), when the user presses the next button, a function is called that finds the next tip and sends it to the renderTip() function, same for the back button.

If the tip was the first tip or the last one and there is no previous or next tip, a message will be shown on the screen.

Based on the "selector" of the tip, an element in the google.com page will be chosen and will be considered as a "next" button as well.

If a class that hides the next button is specified only the selector will act as a next button.

If the "selector" directs to a new page, the id of the tip that needs to be rendered is saved in sessionStorage and will be loaded and rendered when the code is reloaded.

For setting up just copy the player.js code and paste it in the chrome js console and press enter(:
For automatic loading of the script use Tampermonkey for the URLs: 
* https://www.google.com/
* https://www.google.com/imghp?hl=en&tab=wi&ogbl 
If you are redirected to a new page:
1. Make sure you are in the same domain (google.com and not co.il)
2. Paste the code again in the console and press enter

To test the solution you can  write your own newTip in the console after loading the code and closing the rendered tip, then call the renderTip(newTip). 
Try sending a null tip, changing selectors, text, classes, placements and removing some needed attributes. 
Make sure you use the same pattern as in the json file.
{
    "id": "", 
    "action": {
        "type": "", 
        "contents": {
            "#content": "<p></p>\n"
        }, 
        "placement": "", 
        "classes": "", 
        "selector": "", 
        }, 
    "followers": [
        {
            "next": ""
        }
    ]
}
You can also insert a different link in the code under "// json link", or change the json file in the original link.
(Make sure the first line in the file is __5szm2kaj({)








