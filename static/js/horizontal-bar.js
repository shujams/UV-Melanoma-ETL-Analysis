function barChart(state){
    // Import Data
    d3.json('/api/get_all_data').then(function(data){
        // console.log("Read json successful");
        // console.log(data);

        // Bar Chart will only shows top 10 states with highest UV Numbers
        // Sort UV Dictionaries from highest to lowest UV Number
        var uvsDictionaries = data.uvs;

        function compare(a, b) {
            const uvA = a["UV_Wh/square_meter"];
            const uvB = b["UV_Wh/square_meter"];

            var comparison = 0;
            if (uvA < uvB) {
                comparison = 1;
            }
            else if (uvA > uvB) {
                comparison = -1;
            }
            return comparison;
        }

        var sortedUvDictionaries = uvsDictionaries.sort(compare)
        console.log("UV Data Sorted by Highest UV Number")
        console.log(sortedUvDictionaries);

        // Slice the sorted UV Dictionaries and get only top 10
        var top10UvDictionaries = uvsDictionaries.sort(compare).slice(0, 10);
        
        console.log("Top 10 Dictionaries with Highest UV Numbers");
        console.log(top10UvDictionaries);

        // Get data/values of UV numbers and States name
        
        // Get the top 10 UV Number from top10UvDictionaries using a for loop
        top10UvsNumber = []

        for (index = 0; index < top10UvDictionaries.length; index++){
            top10UvsNumber.push(parseInt(top10UvDictionaries[index]['UV_Wh/square_meter']))
        };

        console.log("Top 10 UV Numbers")
        console.log(top10UvsNumber); 
        
        // Get the top 10 states name from top10UvDictionaries using a for loop
        top10StatesName = []

        for (index = 0; index < top10UvDictionaries.length; index++){
            top10StatesName.push(top10UvDictionaries[index]['STATENAME'])
        };

        console.log("The list of Top 10 States with Highest UV Numbers")
        console.log(top10StatesName);

        // Get the melanoma incidences and mortality numbers for each top 10 states
        var incidencesDictionaries = data.incidences;
        var mortalitiesDictionaries = data.mortalities;
        
        top10IncidencesNumber = []

        for (index = 0; index < top10StatesName.length; index++){
            var state = top10StatesName[index];

            for (i = 0; i < incidencesDictionaries.length; i++){
                if (state == incidencesDictionaries[i].LocationDesc){
                    top10IncidencesNumber.push(parseInt(incidencesDictionaries[i].DataValue))
                }
            }
        };

        console.log("The list of Melanoma Incidences Number based on Top 10 States with Highest UV")
        console.log(top10IncidencesNumber);

        top10MortalitiesNumber = []

        for (index = 0; index < top10StatesName.length; index++){
            var state = top10StatesName[index];

            for (i = 0; i < mortalitiesDictionaries.length; i++){
                if (state == mortalitiesDictionaries[i].LocationDesc){
                    top10MortalitiesNumber.push(parseInt(mortalitiesDictionaries[i].DataValue))
                }
            }
        };

        console.log("The list of Melanoma Mortalities Number based on Top 10 States with Highest UV")
        console.log(top10MortalitiesNumber);

        // Bar Dictionaries
        // For loop to put the arrays in dictionaries for the bar chart labels

        // var top10UvIncidenceDict = []
        // for (index = 0; index < top10IncidencesNumber.length; index++){
        //     var top10UvIncidence = {
        //         y: top10IncidencesNumber[index],
        //         x: top10StatesName[index]
        //     };
        //     top10UvIncidenceDict.push(top10UvIncidence)
        // };

        // console.log("Top 10 UV & Incidence Dictionaries");
        // console.log(top10UvIncidenceDict);

        // var top10UvMortalityDict = []
        // for (index = 0; index < top10MortalitiesNumber.length; index++){
        //     var top10UvMortality = {
        //         y: top10MortalitiesNumber[index],
        //         x: top10StatesName[index]
        //     };
        //     top10UvMortalityDict.push(top10UvMortality)
        // };

        // console.log("Top 10 UV & Mortality Dictionaries");
        // console.log(top10UvMortalityDict);

        // Bar Chart for the number of Melanoma Incidences and Mortalities for each Top 10 States with Highest UV"
        var ctx = document.getElementById('bar');

        var myBarChart = new Chart(ctx, {
            type: 'horizontalBar',
            data:{
                labels: top10StatesName,
                datasets:[
                    {
                        label: 'Melanoma Incidences for Top 10 States with Highest UV',
                        data: top10IncidencesNumber,
                        datalabels: {
                            color: 'white'
                        },
                        backgroundColor: '#1f6dcc'
                    },
                    {
                        label: 'Melanoma Mortality for Top 10 States with Highest UV',
                        data: top10MortalitiesNumber,
                        backgroundColor: '#4fe3d4'
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: false
                    }],
                    yAxes: [{
                        stacked: false
                    }]
                }
            }
        });
    });
};

barChart();