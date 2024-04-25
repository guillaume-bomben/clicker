import { instantiateCursor,cursorPerLV } from "./addCursor.js";

$(document).ready(function(){
    $('.merge_cursors').click(function(){
        if ($('.lv1').length >= 3) {
            $('.lv1').slice(0,3).remove();
            cursorPerLV[0] -= 3;
            cursorPerLV[1] += 1;
            instantiateCursor();
        }
        else if ($('.lv2').length >= 3) {
            $('.lv2').slice(0,3).remove();
            cursorPerLV[1] -= 3;
            cursorPerLV[2] += 1;
            instantiateCursor();
        }
        else if ($('.lv3').length >= 3) {
            $('.lv3').slice(0,3).remove();
            cursorPerLV[2] -= 3;
            cursorPerLV[3] += 1;
            instantiateCursor();
        }
        else if ($('.lv4').length >= 3) {
            $('.lv4').slice(0,3).remove();
            cursorPerLV[3] -= 3;
            cursorPerLV[4] += 1;
            instantiateCursor();
        }
    });
});