async function drawLineChart() {
  //1. Load your Dataset
  const dataset = await d3.json("datasheet/linedata_2020.json");

  //Check the sample values available in the dataset
 console.table(dataset);

  const yAccessor = (d) => d.total;
  const dateParser = d3.timeParse("%Y-%m");

  const xAccessor = (d) => dateParser(d.months);
  var rightNow = new Date(xAccessor(dataset[2]));
  console.log("Time:", rightNow.getUTCMonth());
  console.log("Time:", xAccessor(dataset[2]));
  
    var counts=0;
    for (i=0;i<dataset.length; i++) {
      counts+= yAccessor(dataset[i]);
    }
    var avgCounts = counts/12
    console.log(avgCounts);
  //Check the value of xAccessor function now
  console.log(yAccessor.length);

  //2. Create a chart dimension by defining the size of the Wrapper and Margin

  let dimensions = {
    width: window.innerWidth * 0.8,
    height: window.innerWidth * 0.5,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  //3. Draw Canvas

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width + dimensions.margin.left )
    .attr("height", dimensions.height);

  //Log our new Wrapper Variable to the console to see what it looks like
  //console.log(wrapper);

  //4. Create a Bounding Box

  const bounds = wrapper
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left+30}px,${dimensions.margin.top}px)`
    );

  //5. Define Domain and Range for Scales

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);
    
    const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

   
    
    //6. Convert a datapoints into X and Y value
    // Note : d3.line() method will create a generator that converts
    // a data points into a d string
    // This will transform our datapoints with both the Accessor function
    // and the scale tp get the Scaled value in Pixel Space
    const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));
    
    //7. Convert X and Y into Path
    
    const line = bounds
    .append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "Red")
    .attr("stroke-width", 2);

  //8. Create X axis and Y axis
  // Generate Y Axis

  const yAxisGenerator = d3.axisLeft().scale(yScale);
  const yAxis = bounds
  .append("g")
  .call(yAxisGenerator);


  d3.select("svg")
    .append("g")
    .attr("class", "axis")
    .append("text")
    .attr("x", dimensions.margin.left-50) //middle of the xAxis
    .attr("y", dimensions.boundedHeight / 2) // a little bit below xAxis
    .text("確診人數");

  // Generate X Axis
  const xAxisGenerator = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%m 月"));
  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style( "transform", `translateY(${dimensions.boundedHeight}px)`);


  d3.select("svg")
    .append("g")
    // .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .attr("class", "axis")
    .append("text")
    .attr("x", dimensions.boundedWidth/ 2) //middle of the xAxis
    .attr("y", dimensions.boundedHeight + 50 ) // a little bit below xAxis
    .text("Month")


  // d3 axis generator function has no idea where to place the Axis itself
  // We can shift the X axis group to the bottom with the help of CSS Transform

  //dots inside the chart

  //console.log(yScale(32));
  const averageCounts = yScale(avgCounts);
  const averagebounds = bounds
    .append("rect")
    .attr("x", 0)
    .attr("y", averageCounts)
    .attr("width", dimensions.boundedWidth)
    .attr("height", dimensions.boundedHeight - averageCounts);

  const eachDot = bounds
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", (d) => xScale(dateParser(d.months)))
    .attr("cy", (d) => yScale(d.total))
    .append("title")
    .text("數量:")
    .html((d) => (d.total));

    

  //append title
  d3.select("svg")
    .append("text")
    .attr("x", 485)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .text("2020 年 各月分確診人數")
    .style("fill", "black")
    .style("font-size", 28)
    .style("font-family", "Arial Black")

  }
    drawLineChart();




async function drawRectChart() {
  //1. Load your Dataset
  const dataset = await d3.json("datasheet/linedata_2020.json");

  //Check the sample values available in the dataset
  console.table(dataset);

  const yAccessor = (d) => d.total;
  const dateParser = d3.timeParse("%Y-%m");
  const xAccessor = (d) => dateParser(d.months);



  let dimensions = {
    width: window.innerWidth * 0.8,
    height: window.innerWidth * 0.5,
    margin: {
      top: 50,
      right: 15,
      bottom: 75,
      left: 60,
    },
    padding:2,
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  //3. Draw Canvas

  const wrapper1 = d3
    .select("#wrapper1")
    .append("svg")
    .attr("width", dimensions.width + dimensions.margin.left)
    .attr("height", dimensions.height);
    

  //4. Create a Bounding Box

  const bounds = wrapper1
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left + 30}px,${dimensions.margin.top}px)`
    );

  //5. Define Domain and Range for Scales

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  

  //7. Convert X and Y into Path

  //8. Create X axis and Y axis
  // Generate Y Axis

  const yAxisGenerator = d3.axisLeft().scale(yScale);
  const yAxis = bounds
    .append("g")
    .call(yAxisGenerator);


  d3.select("svg")
    .append("g")
    .attr("class", "axis")
    .append("text")
    .attr("x", dimensions.margin.left - 50) //middle of the xAxis
    .attr("y", dimensions.boundedHeight / 2) // a little bit below xAxis
    .text("確診人數");

  // Generate X Axis
  const xAxisGenerator = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%m 月"));
  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`);


  d3.select("svg")
    .append("g")
    // .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .attr("class", "axis")
    .append("text")
    .attr("x", dimensions.boundedWidth / 2) //middle of the xAxis
    .attr("y", dimensions.boundedHeight + 50) // a little bit below xAxis
    .text("Month")




  const eachRect = bounds
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) { return i * (dimensions.boundedWidth / dataset.length); })
    .attr("y", function (d) { return dimensions.boundedHeight - d.total; })
    .attr("width", dimensions.boundedWidth / dataset.length - dimensions.padding)
    .attr("height", function (d) { return d.total; })
    .attr("fill", function (d) { return "rgb(" + d.total + ", 0,0)"; })
    .append("title")
    // .text("數量:")
    // .html((d) => (d.total))
    .on("mouseover", function (d) {
      eachRect.append("text")
        .text(d)
        .attr("x", parseFloat(d3.select(this).attr("x")) + parseFloat(d3.select(this).attr("width") / 2) - 11)
        .attr("y", parseFloat(d3.select(this).attr("y")) + 20)
        .attr("fill", "#fff")
        .attr("id", "wrapper1");
    })
    .on("mouseout", function (d) {
      console.log(d3.select("#wrapper1"))
      d3.select("#wrapper1").remove();
    });


}

drawRectChart();