var tile = {

    getNav: function () {
        return document.getElementById('myNavigator');
    },
    popPanel: function () {        
        this.getNav().popPage();
    },
    SSOClick: function () {
        this.getNav().pushPage("loading.html");
    },
    Reset: function() {
        this.popPanel();
    },
    SSOProcess: function () {
        const params = {};
        console.log("location.hostname", location.hostname)
        // Updated conditional to check for 127.0.0.1 if using Live Server extension.
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            // removed param array and removed object syntax of added params. Removed name param.
            // These parameters not being added correctly were causing an error in deserializing the connector message
                params.url = "http://localhost/api/"
        }

        container.connectors.sendRequest("SSOConnector", "1.0", "GetToken", params, function (response) {
            console.log("Respone in sendRequest", response);
            if (response.success && response.data.success) {

                setTimeout(() => {
                    container.device.openWebLink("http://www.google.com?q=token:" + response.data.data.token)
                    //document.querySelector('ons-progress-bar').indeterminate = false
                    $("#progress").hide();
                }, 2000);
            }
        });
        
    }
}

ons.ready(function () {
    ons.disableAutoStyling();    
});

document.addEventListener("init", function (event) {
    var page = event.target;

    container.tile.data.loadStrings(function () {
        //container.tile.ui.showSpinner(tile.str.Loading);
        container.tile.ui.showBody();

        if (page.id === "loading") {
            container.tile.ui.updatePanelWithStrings();
            console.log("loading")
            tile.SSOProcess();
        }

        container.tile.ui.hideSpinner();

    });

});