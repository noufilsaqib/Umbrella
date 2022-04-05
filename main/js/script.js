$(".um-btn-sos").mouseup(function() {
    clearTimeout(pressTimer);
    console.log("You have to press and hold the SOS button")
    return false;
}).mousedown(function() {
    pressTimer = window.setTimeout(function() {
        saveUserSafeStatus();
        $("#umModal").modal('show');
    }, 2500)
    return false;
});
