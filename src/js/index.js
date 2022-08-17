import domtoimage from "dom-to-image";
import saveAs from "file-saver";

let $ = require("jquery");

window.onload = function() {

    var elements = document.getElementsByClassName('skill-text');
    for (let elem of elements) {
        elem.lastChild.lastChild.innerHTML = elem.lastChild.lastChild.innerHTML
            .replaceAll(/{(.*?)}/gmi, "<span class='skill'>$1</span>")
            .replaceAll(/\[(.*?)]/gmi, "<span class='trait'>$1</span>")
            .replaceAll(/#ko#/gmi, "<span class='ko'>&nbsp;&nbsp;&nbsp;</span>")
            .replaceAll(/#atk#/gmi, "<span class='atk'>&nbsp;&nbsp;</span>")
            .replaceAll(/#def#/gmi, "<span class='def'>&nbsp;&nbsp;</span>")
            .replaceAll(/#tech#/gmi, "<span class='tech'>&nbsp;&nbsp;</span>")
            .replaceAll(/#science#/gmi, "<span class='science'>&nbsp;&nbsp;</span>")
            .replaceAll(/#mutant#/gmi, "<span class='mutant'>&nbsp;&nbsp;</span>")
            .replaceAll(/#warrior#/gmi, "<span class='warrior'>&nbsp;&nbsp;</span>")
            .replaceAll(/#cosmic#/gmi, "<span class='cosmic'>&nbsp;&nbsp;</span>");
    }

    var elements = document.getElementsByClassName('skills-traits');
    for (let elem of elements) {
        elem.innerHTML = elem.innerHTML
            .replaceAll(/{(.*?)}/gmi, "<span class='skill'>$1</span>")
            .replaceAll(/\[(.*?)]/gmi, "<span class='trait'>$1</span>");
    }

    var cards = document.getElementById('cards');
    var nodes = document.getElementsByClassName('card');
    for (let node of nodes) {

        let number = node.getAttribute('data-number');

        /*
        domtoimage.toBlob(node)
            .then(function (blob) {
                saveAs(blob, number + ".png");
            });

        */
        //domtoimage.toJpeg(node, { quality: 1 })
        /*
        domtoimage.toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                img.setAttribute("id", "card" + number);
                img.src = dataUrl;
                cards.appendChild(img);
                node.remove();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
*/
    }


};