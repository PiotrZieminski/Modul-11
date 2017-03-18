define(
    [  'App'  ],
    function(App) {

        function Column(id, name) {
            this.id = id;
            this.name = name || 'Nie podano nazwy';
        }

        function Column(name) {
            var self = this;

            this.id = App.randomString();
            this.name = name;
            this.element = createColumn();

            function createColumn() {
                // TWORZENIE NOWYCH WĘZŁÓW
                var column = $('<div class="column col-md-3"></div>');
                var columnTitle = $('<h2 class="column-title text-center">' + self.name + '</h2>');
                var columnCardList = $('<ul class="card-list"></ul>');
                var columnDelete = $('<button class="btn btn-danger"><p>x</p></button>');
                var columnAddCard = $('<button class="column-add-card btn btn-success">Dodaj kartę</button>');

                // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
                columnDelete.click(function() {
                    self.deleteColumn();
                });

                columnAddCard.click(function(event) {
                    event.preventDefault();
                    self.createCard(new Card(prompt("Wpisz nazwę karty")));
                    var cardName = prompt("Wpisz nazwę karty");
                    event.preventDefault();
                    self.createCard(new Card(cardName));
                    var cardName = prompt("Wpisz nazwę karty");
                    event.preventDefault();
                    $.ajax({
                        url: baseUrl + '/card',
                        method: 'POST',
                        data: {
                            //ciało zapytania
                        },
                        success: function () {
                            var card = new Card(response.id, cardName);
                            self.createCard(card);
                        }
                    });


                    // KONSTRUOWANIE ELEMENTU KOLUMNY
                    column.append(columnTitle)
                        .append(columnDelete)
                        .append(columnAddCard)
                        .append(columnCardList);
                    return column;
                });
            }
        }
        Column.prototype = {
            createCard: function(card) {
                this.element.children('ul').append(card.element);
            },
            deleteColumn: function() {
                this.element.remove();
                var self = this;
                $.ajax({
                    url: baseUrl + '/column/' + self.id,
                    method: 'DELETE',
                    success: function(response){
                        self.element.remove();
                    }
                });
            }
        };
    }
);


