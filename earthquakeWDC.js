(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "country",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "countryCode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "slug",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "newConfirmed",
            alias: "new confirmed cases",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "totalConfirmed",
            alias: "total confirmed cases",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "newDeaths",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "totalDeaths",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "newRecovered",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "totalRecovered",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "date",
            dataType: tableau.dataTypeEnum.datetime
        }];
    
        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://api.covid19api.com/summary", function(resp) {
            var feat = resp.Countries,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 1, len = feat.length; i < len; i++) {
                tableData.push({
                    "country": feat[i].Country,
                    "countryCode": feat[i].CountryCode,
                    "slug": feat[i].Slug,
                    "newConfirmed": feat[i].NewConfirmed,
                    "totalConfirmed": feat[i].TotalConfirmed,
                    "newDeaths": feat[i].NewDeaths,
                    "totalDeaths": feat[i].TotalDeaths,
                    "newRecovered": feat[i].NewRecovered,
                    "totalRecovered": feat[i].TotalRecovered,
                    "date": feat[i].Date,
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Covid Data";
            tableau.submit();
        });
    });
})();



