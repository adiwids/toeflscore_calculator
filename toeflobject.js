/**
 *  TOEFL Object
 *  Author: Adi Widyawan
 */

var TOEFLObject = function(s1,s2,s3) {
    this.xml = null;
    this.ScoreTableFile = "scoreconversiontable.xml";
    
    this.section1 = parseInt(s1);
    this.section2 = parseInt(s2);
    this.section3 = parseInt(s3);
    
    this.loadXML = loadXML;
    this.getConvertedScore = getConvertedScore;
    this.calculateScore = calculateScore;
    
    function loadXML() {
        if(window.ActiveXObject) {
            this.xml = new ActiveXObject("Microsoft.XMLDOM");
            this.xml.async = false;
            this.xml.load(this.ScoreTableFile);
        } else {
            var xhr = new window.XMLHttpRequest();
            xhr.open("GET",this.ScoreTableFile,false);
            xhr.send(null);
            this.xml = xhr.responseXML.documentElement;
        }
        if(this.xml == null) return false;
    }
    
    function getConvertedScore(section,nums) {
        this.loadXML();
        var sSection = '';
        switch(section) {
            case 1:
                sSection = 'Section1';break;
            case 2:
                sSection = 'Section2';break;
            case 3:
                sSection = 'Section3';break;
        }
        var rows = this.xml.getElementsByTagName('CorrectAnswer');
        for(var i=0; i<rows.length; i++) {
            if(parseInt(rows[i].getAttribute('nums')) == nums) {
                if(rows[i].hasChildNodes()) {
                    var ca = rows[i].childNodes;
                    for(var j=0; j<ca.length; j++) {
                        if(ca[j].nodeName == sSection) {
                            return parseInt(ca[j].firstChild.nodeValue);
                        }
                        //break;
                    }
                    //break;
                }
                //break;
            }
        }
    }
    
    function calculateScore() {
        var l = this.getConvertedScore(1,this.section1);
        var w = this.getConvertedScore(2,this.section2);
        var r = this.getConvertedScore(3,this.section3);
        
        return Math.ceil(((l + w + r) / 3) * 10);
    }
}