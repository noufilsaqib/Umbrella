$(".um-btn-sos").mouseup(function() {
    clearTimeout(pressTimer)
    return false;
}).mousedown(function() {
    pressTimer = window.setTimeout(function() {
        // Add code here
        $("#umModal").modal('show');
    }, 2500)
    return false;
});