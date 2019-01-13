/*Based on tutorial by CodeNerve */
let Typer = {
    text: null,
    accessCountTimer: null,
    index: 0,
    speed: 2,
    file: '',
    accessCount: 0,
    deniedCount: 0,

    init: function() {
        accessCountTimer = setInterval(function() {
            Typer.updateLastChar();
        }, 500);
        $.get(Typer.file, function(data) {
            Typer.text = data;
            Typer.text = Typer.text.slice(0, Typer.text.length - 1); //this line is redundant
        });
    },
    content: function() {
        return $('#console').html()
    },
    write: function(text) {
        $('#console').append(text);
        return false;
    },
    addText: function(key) {
        if (key.keyCode === 18) {
            Typer.accessCount++;
            if (Typer.accessCount >= 3) {
                Typer.makeAccess();
            }
        } else if (key.keycode === 20) {
            Typer.deniedCount++;
            if (Typer.deniedCount >= 3) {
                Typer.makeDenied();
            }
        } else if (key.keycode === 27) {
            Typer.hidepop();
        } else if (Typer.text) {
            let content = Typer.content();
            if (content.substring(content.length - 1, content.length) == '|') {
                $('#console').html($('console').substring(0, content.length - 1));
            }
            if (key.keyCode != 8) {
                Typer.index += Typer.speed;
            } else {
                if (Typer.index > 0) // there might need to be a bracket here
                    Typer.index -= Typer.speed;
            }
            let text = Typer.text.substring(0, Typer.index)
            let NEWLINE_REGEX = new RegExp('\n', 'g');

            $('#console').html(text.replace(NEWLINE_REGEX, '<br>'));
            window.scrollBy(0, 50);
        }
        if (key.preventDefault && key.keyCode != 122) {
            key.preventDefault();
        }
        if (key.keyCode != 122) {
            key.returnValue = false;
        }
    },
    updateLastChar: function() {
        let content = this.content();
        if (content.substring(content.length - 1, content.length) === '|') {
            $('#console').html($('#console').html().substring(0, content.length - 1));
        } else {
            this.write('|');
        }
    }
}

Typer.speed = 3;
Typer.file = 'ryan.info';
Typer.init();

let timer = setInterval('t();', 30);

function t() {
    Typer.addText({
        'keyCode': 123748
    });
    if (Typer.index > Typer.text.length) {
        clearInterval(timer);
    }
}