///

function Cal() {
    this.cals =  [];
    this.Ops = new Operations();
//    this.Num = new Numbers(this.Ops);

    this.init =  function() {
        this.Ops = new Operations();
        this.Ops.set();
        var Num = new Numbers(this.Ops);
        Num.set();

        var i = 0; j = 0;
        for(var count = 0; count < this.Ops.len + Num.len; count++ ) {
            if(count % 2 == 0)
                this.cals[count] = Num.numArray[i++];
            else
                this.cals[count] = this.Ops.opsArray[j++];
        }
    };

    this.ans = function() {
        function combine(a, b, type) {
            if(type == "+")
                return a + b;
            else return a - b;
        }

        var ans = this.cals[0];
        for(var i = 1; i <= this.cals.length - 1; i += 2) {
            ans = combine(ans, this.cals[i+1], this.cals[i].type)
        }

        return ans;
    }
};

//Cal.prototype.toString = function() {
//    var s = "";
//    for(var i = 0; i < this.cals.length; i++) {
//        if(i % 2 == 0)
//            s += this.cals[i];
//        else s += this.cals[i].type;
//        s += " ";
//    }
//    return s;
//};

function scene() {
    var c = new Cal();
    c.init();
    while(c.ans() <= 0)
        c.init();
    return c;
}

function Operations() {
    this.len = 0;
    this.opsArray = [];
    this.set = function() {
        this.len = Math.floor(Math.random()*3 + 1);
        for(var i = 0; i < this.len; i++) {
            var type;
            if(Math.floor(Math.random()*2) >= 1)
                type = "+";
            else type = "-";
            this.opsArray.push(new operator(type));
        }
    }
}

function operator(type) {
    this.type = type;
}

function Numbers(ops) {
    this.len = ops.len + 1;
    this.numArray = [];
    this.set = function() {
        for(var i = 0; i < this.len; i++) {
            var newNum = Math.floor(Math.random()*9 + 1);
            this.numArray.push(newNum);
        }
    }
}


//DOM Display

function elt(name, className, idName) {
    var elt = document.createElement(name);
    $(elt).attr({
        class: className,
        id: idName
    });
    return elt;
}

//function display(ops) {
//    drawSke();
////    showCal(ops);
////    setButton();
//}

var wrapper = $("#game");

function drawSke() {
    wrapper.append(elt('div', 'cal', 'cal'));
    wrapper.append(elt('div', 'player', 'player'));

    function createButton(type, idButton) {
        var button = elt('button', 'btn', idButton);
        $(button).text(type);
        $(".player").append(button);
    }

    createButton('+', "add");
    createButton('-', "sub");

    var bar = elt('div', 'bar', 'bar');
    $(bar).append(elt('div', 'progress', 'progress'));
    $('body').append(bar);
}

function showCal(ops) {
    var cal = $('#cal');
    for(var i = 0; i < ops.cals.length; i++) {
        var cell = elt('span', "cell", i);
        if(typeof ops.cals[i] == "number")
            $(cell).text(ops.cals[i]);
        cal.append(cell);
    }

    var equalSign = elt('span', 'cell');
    $(equalSign).text('=');
    cal.append(equalSign);

    var ans = elt('span', cell);
    ans.textContent = ops.ans();
    cal.append(ans);
}

function setButton(times) {
    var b = elt('div', 'control', 'start');
    var a = elt('a', 'ctrl-button');
    $(a).text('Play Again');
    if(!times)
        $(a).text('Begin');
    $(b).append(a);
    $('body').append(b);
    $(b).show();

}

//display();


///player control

$(function() {
    var increase;
    var w = 0;

    $('#start').click(function() {
        event.preventDefault();
        times++;
        $(this).hide();
        $('#bar').show();

        increase = setInterval(function() {
            w += 5;
            $('#progress').css('width', w + 'px');
            if (w > 520) {
                console.log('game over');
                clearInterval(increase);
                setTimeout(function() {
                    w = 0;
                    $('#progress').css('width',0);
                }, 1000);
            }
        }, 50);
    });

});
///game-manager

var times = 0;
var scores = [];

function main() {
    _init();
}

function _init() {
    var newScene = scene();
    drawSke();
    showCal(newScene);
    setButton(times);
}

main();

