
function bubbleChart(state){
    // Import Data
    d3.json('/api/get_all_data').then(function(data){
        console.log("Read json successful");
        console.log(data);

        // Get data/values under "incidences", "mortalities", "uvs"
        var incidencesDictionaries = data.incidences;
        var mortalitiesDictionaries = data.mortalities;
        var uvsDictionaries = data.uvs;

        // Get the list of states name from incidencesDistionaries using a for loop
        statesCode = []

        for (index = 0; index < incidencesDictionaries.length; index++){
            statesCode.push(incidencesDictionaries[index].LocationAbbr)
        };

        console.log("The list of States")
        console.log(statesCode);

        // Get the list of melanoma incidences average annual number from incidencesDictionaries using a for loop
        incidencesNumber = []

        for (index = 0; index < incidencesDictionaries.length; index++){
            incidencesNumber.push(parseInt(incidencesDictionaries[index].DataValue))
        };

        console.log("The list of Melanoma Incidences Number")
        console.log(incidencesNumber);

        // Get the list of melanoma mortality average annual number from mortalitiesDictionaries using a for loop
        mortalitiesNumber = []

        for (index = 0; index < mortalitiesDictionaries.length; index++){
            mortalitiesNumber.push(parseInt(mortalitiesDictionaries[index].DataValue))
        };

        console.log("The list of Melanoma Mortalities Number")
        console.log(mortalitiesNumber);

        // Get the list of melanoma mortality average annual number from mortalitiesDictionaries using a for loop
        uvsNumber = []

        for (index = 0; index < uvsDictionaries.length; index++){
            uvsNumber.push(parseInt(uvsDictionaries[index]['UV_Wh/square_meter']))
        };

        console.log("The list of UVs Number")
        console.log(uvsNumber); 

        // Bubble Dictionaries
        // For loop to put the arrays in dictionaries for the bubble chart labels

        var uvIncidenceDict = []
        for (index = 0; index < incidencesNumber.length; index++){
            var uvIncidence = {
                x: incidencesNumber[index],
                y: uvsNumber[index],
                r: 10
            };
            uvIncidenceDict.push(uvIncidence)
        };

        var uvMortalityDict = []
        for (index = 0; index < mortalitiesNumber.length; index++){
            var uvMortality = {
                x: mortalitiesNumber[index],
                y: uvsNumber[index],
                r: 10
            };
            uvMortalityDict.push(uvMortality)
        };

        // BUBBLE CHART
        var ctx = document.getElementById('bubble').getContext('2d');
        ctx.height = 1000;

        var bubble = new Chart(ctx,{
            type: 'bubble',
            data:{
                labels: statesCode,
                datasets:[
                    {
                        label: 'UV and Melanoma Incidences',
                        data: uvIncidenceDict,
                        datalabels: {
                            color: 'brown'
                        },
                        backgroundColor: "rgba(153,255,51,0.6)"
                    },
                    {
                        label: 'UV and Melanoma Mortality',
                        data: uvMortalityDict,
                        datalabels: {
                            labels: {
                                title: {color: 'white'}
                            }
                        },
                        backgroundColor: "rgba(255,0,128,0.6)"
                    }
                ]
            },
            options: {
                plugins: {
                    datalabels:{
                        color: 'blue',
                        formatter: function(value, context){
                                return context.chart.data.labels[context.dataIndex];
                            }
                    }
                }
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    ticks: {
                        min: 3000,
                        max: 6000,
                        stepSize: 500,
                        display: false
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        min: 0,
                        max: 8000,
                        stepSize: 800,
                    },
                    gridLines: {
                        display: false,
                        lineWidth: 3
                    }

                }]
            }

        });
    
    });
};

bubbleChart();
