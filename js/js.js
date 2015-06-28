var objLokken = objLokken || {};

objLokken.currentQuote = 0;

objLokken.init = function () {
    objLokken.data = data;
    objLokken.shuffleAnswers(objLokken.data.family);
    objLokken.audio = document.getElementById("quote");
    objLokken.mp3 = document.getElementById("mp3");
    objLokken.ogg = document.getElementById("ogg");
    objLokken.photo = document.getElementById("photo");
    objLokken.text = document.getElementById("quote_text");
    objLokken.quoteBox = document.getElementById("quote_box");
    objLokken.lawBox = document.getElementById("law_entry");

    objLokken.audio.addEventListener("ended", function () {
        setTimeout(function () {
            objLokken.fade(false, 1)
        }, 100);
    });
};

objLokken.renderQuote = function () {
    if (objLokken.lawBox.value != "") {
        objLokken.photo.src = "images/" + objLokken.data.family[objLokken.currentQuote].photo;
        objLokken.mp3.src = "audio/" + objLokken.data.family[objLokken.currentQuote].name.toLowerCase() + ".mp3";
        objLokken.ogg.src = "audio/" + objLokken.data.family[objLokken.currentQuote].name.toLowerCase() + ".ogg";
        objLokken.audio.load();
        objLokken.text.innerHTML = objLokken.data.family[objLokken.currentQuote].quote + "<br/><span id=\"credit\">" + objLokken.data.family[objLokken.currentQuote].credit + "</span>";
        setTimeout(function () {
            objLokken.fade(true, 0)
        }, 100);
        objLokken.currentQuote = objLokken.currentQuote + 1;
    } else {
        objLokken.photo.src = "images/" + objLokken.data.cool_friend.photo;
        objLokken.mp3.src = "audio/" + objLokken.data.cool_friend.name.toLowerCase() + ".mp3";
        objLokken.ogg.src = "audio/" + objLokken.data.cool_friend.name.toLowerCase() + ".ogg";
        objLokken.audio.load();
        objLokken.text.innerHTML = objLokken.data.cool_friend.quote + "<br/><span id=\"credit\">" + objLokken.data.cool_friend.credit + "</span>";
        setTimeout(function () {
            objLokken.fade(true, 0)
        }, 100);
        objLokken.currentQuote = objLokken.currentQuote + 1;
    }

};

objLokken.fade = function (blnFadeIn, numStart) {
    if (blnFadeIn) {
        numStart = numStart + .2;
        objLokken.quoteBox.style.opacity = numStart;
        if (numStart < 1) {
            setTimeout(function () {
                objLokken.fade(true, numStart)
            }, 100);
        } else {
            setTimeout(function () {
                objLokken.audio.play()
            }, 400);
        }
    } else {
        numStart = numStart - .2;
        objLokken.quoteBox.style.opacity = numStart;
        if (numStart > 0) {
            setTimeout(function () {
                objLokken.fade(false, numStart)
            }, 100);
        }
    }
};

objLokken.shuffleAnswers = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
