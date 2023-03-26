// Use the D3 library to read in samples.json from the URL
// https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
const sample_url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Get the json data and put it in console.log
d3.json(sample_url).then(function(data) {
    console.log(data);
});



// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
// Create a function for the bar chart.
function plotBarchart(sample_bar) {
    d3.json(sample_url).then((data) => {
        let allsamples = data.samples;
        let value_sample = allsamples.filter(x => x.id == sample_bar);
        let vdata = value_sample[0];
        let otu_ids = vdata.otu_ids;
        let otu_labels = vdata.otu_labels;
        let sample_values = vdata.sample_values;
        // Log the data
        //console.log(otu_ids, otu_labels, sample_values);
        // Set the top 10 OTUs found in that individual.
        let xticks = sample_values.slice(0, 10).reverse();
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0, 10).reverse();
        // Bar chart
        let trace_bar = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        // Set layout
        let layout_bar = {title: "Bar Chart for Top OTUs"};
        // Create the plot
        Plotly.newPlot("bar", [trace_bar], layout_bar)
    });
};

// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
// Create a function for the bubble chart.
function plotBubblechart(sample_bubble) {
    d3.json(sample_url).then((data) => {
        let allsamples = data.samples;
        let value_sample = allsamples.filter(x => x.id == sample_bubble);
        let vdata = value_sample[0];
        let otu_ids = vdata.otu_ids;
        let otu_labels = vdata.otu_labels;
        let sample_values = vdata.sample_values;
        // Log the data
        //console.log(otu_ids,otu_labels,sample_values);
        // Bubble chart
        let trace_bubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        // Set layout
        let layout_bubble = {
            title: "All Bacteria Samples",
            hovermode: "closest",
            xaxis: {title: "OTU id"},
        };
        // Create the plot
        Plotly.newPlot("bubble", [trace_bubble], layout_bubble)
    });
};

// Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.
// Create a function for metadata.
function Metadata(sample_meta) {
    d3.json(sample_url).then((data) => {
        let allmeta = data.metadata;
        let value_meta = allmeta.filter(x => x.id == sample_meta);
        // Log the data
        //console.log(value_meta);
        let vdata = value_meta[0];
        d3.select("#sample-metadata").html("");
        Object.entries(vdata).forEach(([k, v]) => {
            // Log key-value pair
            //console.log(k,v);
            d3.select("#sample-metadata").append("h6").text(`${k}: ${v}`);
        });
    });
};

//Setup webpage
function init() {
    let dropdown = d3.select("#selDataset");
    d3.json(sample_url).then((data) => {
        let name_id = data.names;
        name_id.forEach((id) => {
            //console.log(id);
            dropdown.append("option").text(id).property("value", id);
        });
        let sample1 = name_id[0];
        // Log the data
        //console.log(sample1);
        // Specify the plots
        plotBarchart(sample1);
        plotBubblechart(sample1); 
        Metadata(sample1);
    });
};

// Update webpage if test subject id number is changed
function testsubjectid(id_number) {
    // Log the data
    //console.log(id_number);
    // Recall all the functions
    plotBarchart(id_number);
    plotBubblechart(id_number);
    Metadata(id_number);
};

// Add event listener for changes to the dropdown menu
d3.selectAll("#selDataset").on("change", updatePage);

// Define the updatePage function
function updatePage() {
  let dropdownMenu = d3.select("#selDataset");
  let testSubjectID = dropdownMenu.property("value");
  testsubjectid(testSubjectID);
};

// initialize setup
init();


