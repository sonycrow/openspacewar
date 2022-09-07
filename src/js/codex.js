$(document).ready( function () {
    $('#codex').DataTable({
        "lengthMenu": [
            [50, 100, 300, -1],
            [50, 100, 300, "All"]
        ],
        "pageLength": 50,
        "columnDefs": [
            { "width": "128px", "targets": 0 }
        ]
    });
});

window.onload = function() {
    $('td.skill').each(function () {
        $(this).html($(this).html()
            .replaceAll(/{(.*?)\|(.*?)}/gmi, "<span class='skill skill-$1'>$2</span>")
            .replaceAll(/\[(.*?)\|(.*?)]/gmi, "<span class='trait trait-$1'>$2</span>")
            .replaceAll(/#atk#/gmi, "<span class='atk'>&nbsp;&nbsp;</span>")
            .replaceAll(/#def#/gmi, "<span class='def'>&nbsp;&nbsp;</span>")
            .replaceAll(/#technologic#/gmi, "<span class='technologic'>&nbsp;&nbsp;</span>")
            .replaceAll(/#biologic#/gmi, "<span class='biologic'>&nbsp;&nbsp;</span>")
            .replaceAll(/#espectral#/gmi, "<span class='espectral'>&nbsp;&nbsp;</span>")
            .replaceAll(/#dimensional#/gmi, "<span class='dimensional'>&nbsp;&nbsp;</span>")
        );
    });
};