$( document ).ready(function() {
    var base_color = "rgb(235,235,235)";
    var active_color = "#44c6b0";
    
    var child = 1;
    var length = $("section").length - 1;

    $("#prev").addClass("disabled");
    $("#submit").addClass("disabled");
    
    $("section").not("section:nth-of-type(1)").hide();
    $("section").not("section:nth-of-type(1)").css('transform','translateX(100px)');
    
    var svgWidth = length * 200 + 24;

    $("#um-steps").html(
        '<svg version="1.1" id="um-steps-indicator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + svgWidth + ' 24" xml:space="preserve"></svg>'
    );
    
    function makeSVG(tag, attrs) {
        var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    
    for (i = 0; i < length; i++) {
        var positionX = 12 + i * 200;
        var rect = makeSVG("rect", { x: positionX, y: 9, width: 200, height: 6 });
        document.getElementById("um-steps-indicator").appendChild(rect);
        var circle = makeSVG("circle", {
            cx: positionX,
            cy: 12,
            r: 12,
            width: positionX,
            height: 6
        });
        document.getElementById("um-steps-indicator").appendChild(circle);
    }
    
    var circle = makeSVG("circle", {
        cx: positionX + 200,
        cy: 12,
        r: 12,
        width: positionX,
        height: 6
    });

    document.getElementById("um-steps-indicator").appendChild(circle);
    
    $('#um-steps-indicator rect').css('fill',base_color);
    $('#um-steps-indicator circle').css('fill',base_color);
    $("circle:nth-of-type(1)").css("fill", active_color);
    
     
    $(".um-btn-secondary, .um-btn-primary").click(function () {
        $("#um-steps-indicator rect").css("fill", active_color);
        $("#um-steps-indicator circle").css("fill", active_color);

        var id = $(this).attr("id");
        
        if (id == "next") {
            $("#prev").removeClass("disabled");

            if (child >= length) {
                $(this).addClass("disabled");
                $('#submit').removeClass("disabled");
            }

            if (child <= length) {
                child++;
            }
        } else if (id == "prev") {
            $("#next").removeClass("disabled");
            $('#submit').addClass("disabled");

            if (child <= 2) {
                $(this).addClass("disabled");
            }

            if (child > 1) {
                child--;
            }
        }

        var circle_child = child + 1;
        
        $("#um-steps-indicator rect:nth-of-type(n + " + child + ")").css("fill", base_color);
        $("#um-steps-indicator circle:nth-of-type(n + " + circle_child + ")").css("fill", base_color);

        var currentSection = $("section:nth-of-type(" + child + ")");
        currentSection.fadeIn();
        currentSection.css('transform','translateX(0)');
        currentSection.prevAll('section').css('transform','translateX(-100px)');
        currentSection.nextAll('section').css('transform','translateX(100px)');

        $('section').not(currentSection).hide();
    });
});