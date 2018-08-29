// ==UserScript==
// @name        PresentStudents
// @namespace   schoolsoft
// @include     https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @author      David Lundholm
// @version     0.11
// @match       https://sms.schoolsoft.se/nti/jsp/teacher/right_teacher_lesson_status.jsp?lesson*
// @match       https://sms11.schoolsoft.se/nti/jsp/teacher/right_teacher_lesson_status.jsp?lesson*
// @grant       none
function copyToClipboard() {
    var students = [];
    var present = [];

    $('#right .longlist tr td:nth-child(2)').each(function () {
        students.push($(this).text().trim());
    });
    students.splice(0, 1);
    students.splice(students.length - 1, 1);

    $('#right .longlist tr td:nth-child(3) select option:selected').each(
        function (index) {
            if ( $(this).text() === '-' || $(this).text() === 'Sen ankomst') {
                present.push(students[index]);
            }
        });

    $('<textarea>').attr('id', 'clipboard').text(present.join('\n')).appendTo($('body')).select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    $('#clipboard').remove();
}
$(document).ready(function(){
    $('#right tr > .xinput').each(
        function () {
            $('<input type="button">').attr('value', 'Kopiera närvarande').on('click', copyToClipboard).appendTo($(this));
        });
});
// ==/UserScript==

