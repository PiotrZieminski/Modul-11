require.config({
    baseUrl: "./js",
    paths: {
        "Board": "Classes/Board",
        "Card": "Classes/Card",
        "Column": "classes/Column",
        "App": "App",
        "SuppFnc": "SuppFnc"
    },
    waitSeconds: 20
});

requirejs(['Board', 'Card', 'Column', 'App', 'SuppFnc'], function(Board, Card, Column, App, SuppFnc) {
    // ---    
});