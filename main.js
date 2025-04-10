$(function () {
    let main = $("main");

    function updateGlobalSizes() {
        main.hide();

        // Set default unit according to window size so entire page scales accordingly
        let winHeight = window.outerHeight,
            winWidth = window.outerWidth;
        document.documentElement.style.fontSize = `${
            (winHeight *
                (winHeight > winWidth ? winWidth / winHeight / 1.1 : 0.75)) /
            100
        }px`;

        setTimeout(() => {
            /*
                (In the context of the .intraNav bar)
                Calculate height needed to be filled in by each list item's ::after pseudoelement (decorative line in-between list items)
            */
            let list = $(".intraNav ul");
            let listItems = $(".intraNav li");
            list.css(
                "--li-sprt",
                `${
                    (list.height() - listItems.height() * listItems.length) /
                    (listItems.length - 1)
                }px`
            );

            // Set main content height to match .intraNav's
            main.css("height", `${$(".intraNav").outerHeight()}px`);
            main.show();
            updateSectionsSeen();
        });
    }
    updateGlobalSizes();

    $(window).resize(updateGlobalSizes);

    // Generate links inside .intraNav bar for the content of the page
    $("main > section").each(function () {
        $(
            `<li> <a href="#${$(this).attr("id")}"> ${$(this)
                .find("h1")
                .text()} </a> </li>`
        ).appendTo(".intraNav ul");
    });

    // Change style of links inside .intraNav of whose sections are on screen or have been scrolled through
    function updateSectionsSeen() {
        let mainHeight = main.height();
        let mainTopOffset = main.offset().top;
        main.find("> section").each(function () {
            let sectionTopOffset = $(this).offset().top;
            let sectionId = $(this).attr("id");
            let selector = `.intraNav li:has(a[href="#${sectionId}"])`;
            if (sectionTopOffset - mainTopOffset < mainHeight)
                $(selector).addClass("sectionSeen");
            else $(selector).removeClass("sectionSeen");
        });
    }

    main.on("scroll", updateSectionsSeen);
});
