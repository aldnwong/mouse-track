const photoLocation = window.location.origin + "/img/eyetrack/";

function preload(url) {
    let img = new Image();
    img.src = url;
}

// NORMAL BODY
preload(photoLocation + "body.png");

// EYES
preload(photoLocation + "eye_L.png");
preload(photoLocation + "eye_R.png");

// EYE WIDE
preload(photoLocation + "body_eyes_wide.png");

// EYE TRANSITIONS
for (var i = 1; i <= 8; i++) {
    preload(photoLocation+"body_eyes_t"+i+".png")
}

// BODY HIDDEN
preload(photoLocation + "body_hidden.png");

// BODY TRANSITIONS
for (var i = 1; i <= 24; i++) {
    preload(photoLocation+"body_hide_t"+i+".png")
}