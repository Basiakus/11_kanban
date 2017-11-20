$(function() {

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };


    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name || "Brak Nazwy";
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('+ kartę');


            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Nazwa karty:")));
            });

            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;

        };
    };

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };


    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description || "bez nazwy";
        this.$element = createCard();

        function createCard() {
            if (self.description != null) {
                var $card = $('<li>').addClass('card');
                var $cardDescription = $('<p>').addClass('card-description').text(self.description);
                var $cardDelete = $('<button>').addClass('btn-delete').text('x');
                $cardDelete.click(function() {
                    self.removeCard();
                });
                $card.append($cardDelete)
                    .append($cardDescription);
                return $card;
            } else {
                return false;
            };
        }
    };

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    };

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    $('.create-column').click(function() {
        var name = prompt('Nazwa kolumny');

        if (name != null) {
            var column = new Column(name);
            board.addColumn(column);
        } else {
            return false;
        }
    });

    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    todoColumn.addCard(card1);
    doingColumn.addCard(card2);


});