// Use the D3 library to read in samples.json from the URL
// https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
const sample_url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Get the json data and put it in console.log
d3.json(sample_url).then(function(data) {console.log(data)});

//Setup dashboard
function setup() {
    let dropdown = d3.select("#selDataset");
    d3.json(sample_url).then((data) => {
        let sample_names = data.names;
        sample_names.forEach((id) => {
            console.log(id);
            dropdown.append("option").text(id).property("value", id);
        })
        let sample1 = sample_names[0];
        console.log(sample1);
        // Specify the plots
        //plotMetadata(sample1);
        plotBarchart(sample1);
        //plotBubblechart(sample1);
        //plotGaugechart(sample1);
    });
};

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
// Create a function for the bar chart.
function plotBarchart(sample_bar) {
    d3.json(sample_url).then((data) => {
        let allsamples = data.samples;
        let value_sample = allsamples.filter(result => result.id == sample_bar);
        let vdata = value_sample[0];
        let otu_ids = vdata.otu_ids;
        let otu_labels = vdata.otu_labels;
        let sample_values = vdata.sample_values;
        // Log the data
        console.log(otu_ids, otu_labels, sample_values);
        // Set the top 10 OTUs found in that individual.
        let xticks = sample_values.slice(0, 10).reverse();
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0, 10).reverse();
        // Bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        // Set layout
        let layout = {title: "Bar Chart for Top 10 OTUs"};
        // Create the plot
        Plotly.newPlot("bar", trace, layout)
    });
};

// initialize
setup();
