global.$ = global.jQuery = require('jquery');
let dt   = require( 'datatables.net' );

import domtoimage from "dom-to-image";
import saveAs from "file-saver";

window.onload = function() {

    let skills = document.getElementsByClassName('skill-text');
    for (let elem of skills) {
        elem.lastChild.lastChild.innerHTML = elem.lastChild.lastChild.innerHTML
            .replaceAll(/{(.*?)\|(.*?)}/gmi, "<span class='skill skill-$1'>$2</span>")
            .replaceAll(/\[(.*?)\|(.*?)]/gmi, "<span class='trait trait-$1'>$2</span>")
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
            .replaceAll(/{(.*?)\|(.*?)}/gmi, "<span class='skill skill-$1'>$2</span>")
            .replaceAll(/\[(.*?)\|(.*?)]/gmi, "<span class='trait trait-$1'>$2</span>")
    }

    let nodes = document.getElementsByClassName('card');
    for (let node of nodes) {
        let number = node.getAttribute('data-number');
        let cardid = node.getAttribute('data-cardid');

        // domtoimage.toBlob(node)
        //     .then(function (blob) {
        //         saveAs(blob, number + ".png");
        //     });

        // domtoimage.toJpeg(node, { quality: 1 })
        //     .then(function (blob) {
        //         saveAs(blob, cardid + ".jpg");
        //     });

        // domtoimage.toPng(node)
        //     .then(function (dataUrl) {
        //         var img = new Image();
        //         img.setAttribute("id", "card" + number);
        //         img.setAttribute("data-order", number);
        //         img.setAttribute("data-cardid", cardid);
        //         img.src = dataUrl;
        //
        //         node.remove();
        //         document.getElementById("cards").appendChild(img);
        //     })
        //     .catch(function (error) {
        //         console.error('oops, something went wrong!', error);
        //     });
    }

    $('#cards').click(function() {
        let sorted_cards,
            getSorted = function (selector, attrName) {
                return $(
                    $(selector).toArray().sort(function (a, b) {
                        let aVal = parseInt(a.getAttribute(attrName)), bVal = parseInt(b.getAttribute(attrName));
                        return aVal - bVal;
                    })
                );
            };

        sorted_cards = getSorted('img', 'data-order').clone();
        $('#cards').html(sorted_cards);
    });

};