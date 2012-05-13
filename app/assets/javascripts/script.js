/* ------------------------------------------------------------------------
    ***OJO*** Leopoldo Silva: Esto es una extracción
    del archivo javascript de TinyDoodle (http://tinydoodle.appspot.com/)
    A continuación se muestra el encabezado que traía el documento a modo de hacer
    referencia al sitio de donde se sacó y bajo que condiciones se sacó.
    
     


    Title:          Tiny Doodle
    
    Version:        0.2
    URL:            http://tinydoodle.com/
    
    Description:
        Tiny Doodle is an exercise in learning about <canvas>.
        Event handlers are attached the to <canvas> elemet for both
        mouse and touch input devices. The user can doodle away on the
        <canvas>, clear and save the resulting doodle.
        
        Saving the doodle extracts the canvas data in base64 format,
        POST's the string to a Python service which stores it in a 
        database.
    
    Author:         Andrew Mason
    Contact:        a.w.mason at gmail dot com
    Author's Site:  http://coderonfire.com/
    
    Requirements:
        * Jquery 1.3+
    
    Changelog:
        0.1 (28th May 2009)
            - First demo build
        0.2 (30th May 2009)
            - Addded Pen and Eraser
            - Commented code
            - 
    
    Todo:
        * Error checking and handling
        * Clean up code
        * Add yellow throber to indicate added images
        * Add share links
    
    Licence:
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

------------------------------------------------------------------------ */

// Run once the DOM is ready
$(document).ready(function () {
//Acordeon de elements

if($('canvas').exists()){doodle.init(); alert("doodle prendido!")}

$('#menu > li > ul').hide().click(function(e) {
e.stopPropagation();
});

$('#menu > li').toggle(
function() {$(this).css('background-position', 'right -20px').find('ul').slideDown();}, 
function() {$(this).css('background-position', 'right top').find('ul').slideUp();});

$('#menu > li').hover(function() {
$(this).addClass('waiting');
setTimeout(function() {$('#menu .waiting').click().removeClass('waiting');}, 600);},
function() {$('#menu .waiting').removeClass('waiting');});

});



var doodle = {
    // Define some variables
    'drawing':          false,
    'linethickness':    1,
    'updating':         false,
    'saveID':           '#save',
    'newID':            '#new',
    'penID':            '#pen',
    'eraserID':         '#eraser',
    'colour':           '#000',
    'noticeID':         '#notification',
    'loaded_id':         false
    
};

doodle.init = function() {
    // Collect elements from the DOM and set-up the canvas
    doodle.canvas = $('#canvas1')[0];
    doodle.context = doodle.canvas.getContext('2d');
    doodle.oldState = doodle.context.getImageData(0, 0, 800, 600);
        
    
    // Mouse based interface
    $(doodle.canvas).bind('mousedown', doodle.drawStart);
    $(doodle.canvas).bind('mousemove', doodle.draw);
    $(doodle.canvas).bind('mouseup', doodle.drawEnd);
    $(doodle.canvas).bind('mouseleave', function() {
        doodle.context.putImageData(doodle.oldState, 0, 0);
    });
    $('body').bind('mouseup', doodle.drawEnd);   
};


doodle.drawStart = function(ev) {
    ev.preventDefault();
    // Calculate the current mouse X, Y coordinates with canvas offset
    var x, y;
    x = ev.pageX - $(doodle.canvas).offset().left;
    y = ev.pageY - $(doodle.canvas).offset().top;
    doodle.drawing = true;
    doodle.context.lineWidth = doodle.linethickness;

    // Store the current x, y positions
    doodle.oldX = x;
    doodle.oldY = y;
}

doodle.draw = function(event) {

    // Calculate the current mouse X, Y coordinates with canvas offset
    var x, y;
    x = event.pageX - $(doodle.canvas).offset().left;
    y = event.pageY - $(doodle.canvas).offset().top;
    
    // If the mouse is down (drawning) then start drawing lines
    if(doodle.drawing) {
        doodle.context.putImageData(doodle.oldState, 0, 0);
        doodle.context.strokeStyle = doodle.colour;
        doodle.context.beginPath();
        doodle.context.moveTo(doodle.oldX, doodle.oldY);
        doodle.context.lineTo(x, y);
        doodle.context.closePath();
        doodle.context.stroke();
        doodle.oldState = doodle.context.getImageData(0, 0, 800, 600);
    } else {
    
        doodle.context.putImageData(doodle.oldState, 0, 0);
        
        doodle.context.beginPath();
        doodle.context.arc(x, y, doodle.linethickness, 0, 2 * Math.PI, false);
        
        doodle.context.lineWidth = 3;
        doodle.context.strokeStyle = '#fff';
        doodle.context.stroke();
     
        doodle.context.lineWidth = 1;
        doodle.context.strokeStyle = '#000';
        doodle.context.stroke();
    
    }
    
    // Store the current X, Y position
    doodle.oldX = x;
    doodle.oldY = y;
    
};


// Finished drawing (mouse up)
doodle.drawEnd = function(ev) {
    doodle.drawing = false;
}

// Set the drawing method to pen
doodle.pen = function() {
    // Check if pen is already selected
    if($(doodle.penID).hasClass('active')) {
        return;
    }
    // Change color and thickness of the line
    doodle.colour = '#000000';
    
    // Flag that pen is now active
    $(doodle.penID).toggleClass('active');
    
    // Remove active state from eraser
    $(doodle.eraserID).removeClass('active');
}

// Set the drawing method to eraser
doodle.eraser = function() {
    // Check if pen is already selected
    if($(doodle.eraserID).hasClass('active')) {
        return;
    }
    // Change color and thickness of the line
    doodle.colour = '#FFFFFF';
    
    // Flag that eraser is now active
    $(doodle.eraserID).toggleClass('active');
    
    // Remove active state from pen
    $(doodle.penID).removeClass('active');
}








