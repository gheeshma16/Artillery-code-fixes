const fs = require("fs");
const Handlebars = require("handlebars");

const report = JSON.parse(
    fs.readFileSync("report_spike.json", "utf8")
);

const counters = report.aggregate.counters;
const summaries = report.aggregate.summaries;


// Configured performance thresholds
const maxFailedVusers = 0;
const maxP95ResponseTime = 2000;

// Read actual metrics from the Artillery JSON report
const failedVusers = Number(counters["vusers.failed"] ?? 0);




// const p95ResponseTime =
//     summaries["http.response_time"]?.p95 ?? null;






// Read P95 response time from the Artillery report.
const responseTimeSummary =
    summaries["http.response_time"] ??
    summaries["http.response_time_ms"] ??
    null;

// const p95ResponseTime =
//     responseTimeSummary?.p95 ?? null;



// Read latency summaries from the Artillery report.

// Find the browser login page's TTFB metric.
const ttfbMetric =
    "browser.page.TTFB.https://rahulshettyacademy.com/client/#/auth/login";

// const responseTimeSummary = summaries[ttfbMetric] ?? null;

const p95ResponseTime = responseTimeSummary?.p95 ?? null;

// Print the extracted value for debugging.
console.log("Login page TTFB P95:", p95ResponseTime);


// Evaluate threshold results
const thresholdResults = [
    {
        name: "Failed Virtual Users",
        actual: failedVusers,
        threshold: "0",
        status: failedVusers === 0 ? "PASS" : "FAIL"
    },
    {
        name: "HTTP Response Time P95",
        actual: p95ResponseTime === null
            ? "Not available"
            : `${p95ResponseTime} ms`,
        threshold: "≤ 2000 ms",
        status: p95ResponseTime !== null &&
            p95ResponseTime <= maxP95ResponseTime
            ? "PASS"
            : "FAIL"
    }
];





// Spike profile configured in artillery.yml
const spikeProfile = [
    {
        phase: "Normal Traffic",
        duration: 10,
        arrivalRate: 1
    },
    {
        phase: "Spike",
        duration: 10,
        arrivalRate: 10
    },
    {
        phase: "Recovery",
        duration: 10,
        arrivalRate: 1
    }
];

const template = `

<!DOCTYPE html>

<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Artillery Spike Load Test Report</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>



.pass {
    color: green;
    font-weight: bold;
    background: #e6ffed;
}

.fail {
    color: red;
    font-weight: bold;
    background: #ffe6e6;
}







body {
    font-family: Arial, sans-serif;
    margin: 40px;
    background: #f4f6f9;
}

h1 {
    text-align: center;
}

h2 {
    margin-top: 35px;
}

.chart-container {
    width: 80%;
    max-width: 900px;
    margin: 25px auto;
    padding: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
}

table {
    border-collapse: collapse;
    width: 100%;
    background: white;
    margin-bottom: 25px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background: #007acc;
    color: white;
}

</style>

</head>

<body>

<h1>Artillery Spike Load Test Report</h1>

<p>
    <strong>Test Profile:</strong>
    Normal Traffic → Spike → Recovery
</p>

<h2>Spike Load Profile</h2>

<div class="chart-container">


<canvas id="spikeChart"></canvas>

</div>

<h2>Load Profile Details</h2>

<table>

<tr>
    <th>Phase</th>
    <th>Duration (seconds)</th>
    <th>Arrival Rate (VUs/second)</th>
</tr>

{{#each spikeProfile}}

<tr>
    <td>{{phase}}</td>
    <td>{{duration}}</td>
    <td>{{arrivalRate}}</td>
</tr>

{{/each}}

</table>

<h2>Artillery Counters</h2>
<h2>Threshold Validation</h2>

<table>
    <tr>
        <th>Metric</th>
        <th>Actual Result</th>
        <th>Configured Threshold</th>
        <th>Status</th>
    </tr>

    {{#each thresholdResults}}
    <tr>
        <td>{{name}}</td>
        <td>{{actual}}</td>
        <td>{{threshold}}</td>
        <td class="{{statusClass status}}">
            <strong>{{status}}</strong>
        </td>
    </tr>
    {{/each}}
</table>
<h2>Latency Summary</h2>

<table>

<tr>
    <th>Name</th>
    <th>Min</th>
    <th>Max</th>
    <th>Count</th>
    <th>P95</th>
    <th>P99</th>
</tr>

{{#each summaries}}

<tr>
    <td>{{@key}}</td>
    <td>{{min}}</td>
    <td>{{max}}</td>
    <td>{{count}}</td>
    <td>{{p95}}</td>
    <td>{{p99}}</td>
</tr>

{{/each}}

</table>

<script>

const spikeProfile = {{{json spikeProfile}}};

const ctx = document.getElementById("spikeChart");

new Chart(ctx, {

    type: "bar",

    data: {

        labels: spikeProfile.map(item => item.phase),

        datasets: [{

            label: "Configured Arrival Rate (VUs/second)",

            data: spikeProfile.map(item => item.arrivalRate),

            backgroundColor: [
                "#4e79a7",
                "#e15759",
                "#59a14f"
            ],

            borderWidth: 1

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                display: true
            },

            tooltip: {
                enabled: true
            }

        },

        scales: {

            y: {

                beginAtZero: true,

                title: {
                    display: true,
                    text: "Virtual Users per Second"
                },

                ticks: {
                    stepSize: 1
                }

            },

            x: {

                title: {
                    display: true,
                    text: "Load Test Phase"
                }

            }

        }

    }

});

</script>

</body>
</html>
`;

// Register a helper to safely serialize chart data as JSON.
// Handlebars.registerHelper("json", function (context) {
// return JSON.stringify(context).replace(/</g, "\u003c");
// });


Handlebars.registerHelper("statusClass", function (status) {
    return status === "PASS" ? "pass" : "fail";
});





// const html = Handlebars.compile(template)({
// counters,
// summaries,
// spikeProfile
// });


// const html = Handlebars.compile(template)({
//     counters,
//     summaries,
//     spikeProfile
// });


// fs.writeFileSync("report.html", html);

// console.log("HTML report generated successfully: report.html");









// Register the JSON helper BEFORE compiling the template.
Handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context).replace(/</g, "\\u003c");
});

// Register the statusClass helper for threshold results.
Handlebars.registerHelper("statusClass", function (status) {
    return status === "PASS" ? "pass" : "fail";
});

// Compile the HTML template.
const html = Handlebars.compile(template)({
    counters,
    summaries,
    spikeProfile,
    thresholdResults
});

// Generate report.html.
fs.writeFileSync("report.html", html);

console.log("HTML report generated successfully: report.html");
