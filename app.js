var button = document.getElementById('calculate').addEventListener('click', function() {
    var s1 = parseInt(document.getElementById('section1').value);
    var s2 = parseInt(document.getElementById('section2').value);
    var s3 = parseInt(document.getElementById('section3').value);
    var validSection1 = isNaN(s1) || s1 < 0 || s1 > 50 ? false : true;
    var validSection2 = isNaN(s2) || s2 < 0 || s2 > 40 ? false : true;
    var validSection3 = isNaN(s3) || s3 < 0 || s3 > 50 ? false : true;
    if(validSection1 && validSection2 && validSection3) {
        var test = new TOEFLObject(s1,s2,s3);
        document.getElementById('toeflscore').innerHTML = test.calculateScore();
    } else {
        alert("You've entered wrong number of correct answer.");
    }
}, false);