const scriptspan = document.getElementById("scriptSpan"); // REMOVE: for exper only, remove in final
const body = document.getElementById("body");
const eyeL = document.getElementById("eyeL");
const eyeR = document.getElementById("eyeR");
const button = document.getElementById("button");

var hidden = false;
var widened = false;
var moving = false;

addEventListener("mousemove", (event) => {
    if (hidden) return;

    var cX = event.clientX;
    var cY = event.clientY;

    var wCen = body.offsetLeft + body.offsetWidth / 2;
    var hCen = body.offsetTop + (body.offsetHeight*236.5)/1080;

    var distX = (wCen - cX)/wCen*-1;
    var distY = (hCen - cY)/hCen*-1;

    var touchingFace = cX >= wCen-(wCen*.075) && cX <= wCen+(wCen*.075) && cY >= hCen-(hCen*.125) && cY <= hCen+(hCen*.125);

    eyeL.style.transform = `translate(${distX}%,${distY}%)`;
    eyeR.style.transform = `translate(${distX}%,${distY}%)`;

    if (touchingFace && !widened && !moving) {
        moving = true;
        function openEye(i) {
            body.src = window.location.origin + `/img/eyetrack/body_eyes_t${i}.png`;
            if(i<8) setTimeout(function(){openEye(i+1)}, 1);
            else {
                widened = true;
                moving = false;
            };
        }
        setTimeout(function(){openEye(1)}, 1)
    } else if (!touchingFace && widened && !moving) {
        moving = true;
        function closeEye(i) {
            if (i!=0) body.src = window.location.origin + `/img/eyetrack/body_eyes_t${i}.png`;
            if(i>=1) setTimeout(function(){closeEye(i-1)}, 1);
            else {
                body.src = window.location.origin + `/img/eyetrack/body.png`;
                widened = false;
                moving = false;
            };
        }
        setTimeout(function(){closeEye(8)}, 1)
    }

    // REMOVE: for exper only, remove in final
    scriptspan.innerText = `CLIENT COORDS: ${event.clientX}, ${event.clientY}\nELEMENT CENTER: ${wCen}, ${hCen}\nDISTANCE TO CENTER: ${distX}, ${distY}\nFACE BOUNDS: (${faceBoundL} - ${faceBoundR}), (${faceBoundT} - ${faceBoundB})`;
});

// REMOVE: for exper only, remove in final
var buttonIgnore = false;

function toggleHide() {
    if (hidden) {
        // REMOVE: for exper only, remove in final
        buttonIgnore = true;
        
        function showBody(i) {
            if (i!=25) body.src = window.location.origin + `/img/eyetrack/body_hide_t${i}.png`;
            if(i<24) setTimeout(function(){showBody(i+1)}, 1);
            else {
                body.src = window.location.origin + `/img/eyetrack/body.png`;
                eyeL.style.display = "block";
                eyeR.style.display = "block";
                // REMOVE: for exper only, remove in final
                buttonIgnore = false;
                hidden = false;
            };
        }
        setTimeout(function(){showBody(1)}, 1)
    } else {
        // REMOVE: for exper only, remove in final
        buttonIgnore = true;
        eyeL.style.display = "none";
        eyeR.style.display = "none";
        function hideBody(i) {
            if (i!=0) body.src = window.location.origin + `/img/eyetrack/body_hide_t${i}.png`;
            if(i>=1) setTimeout(function(){hideBody(i-1)}, 1);
            else {
                body.src = window.location.origin + `/img/eyetrack/body_hidden.png`;
                // REMOVE: for exper only, remove in final
                buttonIgnore = false;
                hidden = true;
            };
        }
        setTimeout(function(){hideBody(24)}, 1)
    }
}

// REMOVE: for exper only, remove in final
button.onclick = function() {
    if (buttonIgnore) return;
    if (hidden) button.innerText = "Hide Person";
    else button.innerText = "Show Person";
    toggleHide();
}