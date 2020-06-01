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
            var feat = resp.features,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 1, len = feat.length; i < len; i++) {
                tableData.push({
                    "country": feat[i].Country,
                    "countryCode": feat[i].properties.CountryCode,
                    "slug": feat[i].properties.Slug,
                    "newConfirmed": feat[i].properties.NewConfirmed,
                    "totalConfirmed": feat[i].properties.TotalConfirmed,
                    "newDeaths": feat[i].properties.NewDeaths,
                    "totalDeaths": feat[i].properties.TotalDeaths,
                    "newRecovered": feat[i].properties.NewRecovered,
                    "totalRecovered": feat[i].properties.TotalRecovered,
                    "date": feat[i].properties.Date,
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



