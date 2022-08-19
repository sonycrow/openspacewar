import domtoimage from "dom-to-image";
import saveAs from "file-saver";

let $ = require("jquery");

window.onload = function() {

    let skills = document.getElementsByClassName('skill-text');
    for (let elem of skills) {
        elem.lastChild.lastChild.innerHTML = elem.lastChild.lastChild.innerHTML
            .replaceAll(/{(.*?)}/gmi, "<span class='skill'>$1</span>")
            .replaceAll(/\[(.*?)]/gmi, "<span class='trait'>$1</span>")
            .replaceAll(/#atk#/gmi, "<span class='atk'>&nbsp;&nbsp;</span>")
            .replaceAll(/#def#/gmi, "<span class='def'>&nbsp;&nbsp;</span>")
            .replaceAll(/#technologic#/gmi, "<span class='technologic'>&nbsp;&nbsp;</span>")
            .replaceAll(/#biologic#/gmi, "<span class='biologic'>&nbsp;&nbsp;</span>")
            .replaceAll(/#espectral#/gmi, "<span class='espectral'>&nbsp;&nbsp;</span>")
            .replaceAll(/#dimensional#/gmi, "<span class='dimensional'>&nbsp;&nbsp;</span>");
    }

    let traits = document.getElementsByClassName('skills-traits');
    for (let elem of traits) {
        elem.innerHTML = elem.innerHTML
            .replaceAll(/{(.*?)}/gmi, "<span class='skill'>$1</span>")
            .replaceAll(/\[(.*?)]/gmi, "<span class='trait'>$1</span>");
    }

    let nodes = document.getElementsByClassName('card');
    for (let node of nodes) {

        let number = node.getAttribute('data-number');

        /*
        domtoimage.toBlob(node)
            .then(function (blob) {
                saveAs(blob, number + ".png");
            });

        */
        //domtoimage.toJpeg(node, { quality: 1 })

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

    }

};