// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our scatter chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

function buildCharts(state){
    // Import Data
    d3.json('/api/get_all_data').then(function(data){
        console.log("Read json successful");
        console.log(data);

        // Get data/values under "incidences", "mortalities", "uvs"
        var incidencesDictionaries = data.incidences;
        var mortalitiesDictionaries = data.mortalities;
        var uvsDictionaries = data.uvs;

        // Get the list of states name from incidencesDistionaries using a for loop
        statesName = []

        for (index = 0; index < incidencesDictionaries.length; index++){
            statesName.push(incidencesDictionaries[index].LocationDesc)
        };

        console.log("The list of States")
        console.log(statesName);

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

        // DOT PLOT - States & Number of Melanoma Incidences and Mortality

        var trace1 = {
            type: 'scatter',
            x: incidencesNumber,
            y: statesName,
            mode: 'markers',
            name: 'Melanoma Incidences Number by States',
            marker: {
              color: 'rgba(156, 165, 196, 0.95)',
              line: {
                color: 'rgba(156, 165, 196, 1.0)',
                width: 1,
              },
              symbol: 'circle',
              size: 16
            }
          };
          
          var trace2 = {
            x: mortalitiesNumber,
            y: statesName,
            mode: 'markers',
            name: 'Melanoma Mortalities Number by States',
            marker: {
              color: 'rgba(204, 204, 204, 0.95)',
              line: {
                color: 'rgba(217, 217, 217, 1.0)',
                width: 1,
              },
              symbol: 'circle',
              size: 16
            }
          };
          
          var data = [trace1, trace2];
          
          var layout = {
            title: 'The Number of Melanoma Incidences and Mortalities by States in United States',
            xaxis: {
              showgrid: false,
              showline: true,
              linecolor: 'rgb(102, 102, 102)',
              titlefont: {
                font: {
                  color: 'rgb(204, 204, 204)'
                }
              },
              tickfont: {
                font: {
                  color: 'rgb(102, 102, 102)'
                }
              },
              autotick: true,
            //   dtick: 10,
              ticks: 'outside',
              tickcolor: 'rgb(102, 102, 102)'
            },
            // yaxis:{
            //   showgrid: false,
            //   showline: true,
            //   linecolor: 'rgb(102, 102, 102)',
            // },
            margin: {
              l: 140,
              r: 40,
              b: 50,
              t: 80
            },
            legend: {
              font: {
                size: 10,
              },
              yanchor: 'middle',
              xanchor: 'right'
            },
            width: 800,
            height: 1000,
            paper_bgcolor: 'rgb(254, 247, 234)',
            plot_bgcolor: 'rgb(254, 247, 234)',
            hovermode: 'closest'
          };
          
          Plotly.newPlot('dotplot', data, layout);
        

    });
};
buildCharts();



