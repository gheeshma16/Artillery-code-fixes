const fs = require("fs");
const Handlebars = require("handlebars");

const report = JSON.parse(fs.readFileSync("report_spike.json", "utf8"));

const counters = report.aggregate.counters;
const summaries = report.aggregate.summaries;

const template = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Artillery Report</title>
<style>
body{
    font-family:Arial;
    margin:40px;
}
table{
    border-collapse:collapse;
    width:70%;
}
th,td{
    border:1px solid #ddd;
    padding:8px;
}
th{
    background:#007acc;
    color:white;
}
</style>
</head>
<body>

<h1>Artillery Test Report</h1>

<h2>Counters</h2>

<table>
<tr><th>Metric</th><th>Value</th></tr>

{{#each counters}}
<tr>
<td>{{@key}}</td>
<td>{{this}}</td>
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

</body>
</html>
`;

const html = Handlebars.compile(template)({
    counters,
    summaries
});

fs.writeFileSync("report.html", html);

console.log("HTML report generated.");