"use strict";
exports.Serve = function (app, ObjectID, MongoClient, connection, passwordHash) {
    app.post('/api/report/members', function (request, response) {
        try {
            var dfn = new ReportDefinition();
            dfn.Path = 'FullStack/reports/members.pdf';
            dfn.Title = "Header";
            dfn.Footer = "Footer";
            printreport(dfn);
            var fs = require('fs');
            var data = fs.readFileSync(dfn.Path);
            response.contentType("application/pdf");
            response.send(data);
        }
        catch (e) {
            response.status(400).send(JSON.stringify({ 'message': "Error occurred.", 'Exception': e }));
        }
    });
    function printreport(definition) {
        var Report = require('fluentReports').Report;
        var mydata = [
            { name: "John Doe", week: 20, day: "Monday\nthis is some really long text that shouldn't\noverflow the text container but be wrapped", hours: 4 },
            { name: "John Doe", week: 20, day: "Tuesday", hours: 8 },
            { name: "John Doe", week: 20, day: "Wednesday", hours: 8 },
            { name: "John Doe", week: 21, day: "Thursday", hours: 2 },
            { name: "John Doe", week: 21, day: "Friday", hours: 8 },
            { name: "Jane Doe", week: 20, day: "Monday", hours: 5 },
            { name: "Jane Doe", week: 20, day: "Tuesday", hours: 8 },
            { name: "Jane Doe", week: 21, day: "Wednesday", hours: 7 },
            { name: "Jane Doe", week: 21, day: "Thursday", hours: 8 },
            { name: "Jane Doe", week: 21, day: "Friday", hours: 8 },
            { name: "John Doe", week: 22, day: "Monday", hours: 4 },
            { name: "John Doe", week: 22, day: "Tuesday", hours: 8 },
            { name: "John Doe", week: 22, day: "Wednesday", hours: 8 },
            { name: "John Doe", week: 23, day: "Thursday", hours: 2 },
            { name: "John Doe", week: 23, day: "Friday", hours: 8 },
            { name: "Jane Doe", week: 22, day: "Monday", hours: 5 },
            { name: "Jane Doe", week: 22, day: "Tuesday", hours: 8 },
            { name: "Jane Doe", week: 23, day: "Wednesday", hours: 7 },
            { name: "Jane Doe", week: 23, day: "Thursday", hours: 8 },
            { name: "Jane Doe", week: 23, day: "Friday", hours: 8 },
            { name: "John Doe", week: 25, day: "Monday", hours: 4 },
            { name: "John Doe", week: 25, day: "Tuesday", hours: 8 },
            { name: "John Doe", week: 25, day: "Wednesday", hours: 8 },
            { name: "John Doe", week: 26, day: "Thursday", hours: 2 },
            { name: "John Doe", week: 26, day: "Friday", hours: 8 },
            { name: "Jane Doe", week: 25, day: "Monday", hours: 5 },
            { name: "Jane Doe", week: 25, day: "Tuesday", hours: 8 },
            { name: "Jane Doe", week: 26, day: "Wednesday", hours: 7 },
            { name: "Jane Doe", week: 26, day: "Thursday\nis- this is some really long text that shouldn't\noverflow the text container but be wrapped", hours: 8 },
            { name: "Jane Doe", week: 26, day: "Friday\nis- this is some really long text that shouldn't\noverflow the text container but be wrapped", hours: 8 }
        ];
        //   var daydetail = function ( report:any, data :any) {
        //     report.band( [ {data:"", width: 80}, {data: data.day, width: 100, zborder:{left:1, right: 1, top: 1, bottom: 0}}, {data: data.hours, width: 100, underline: true, align: 3, zborder:{left:1, right: 1, top: 0, bottom: 1}} ], {border:1, width: 0, wrap: 1} );
        //   };
        //   var totalFormatter = function(data:any, callback:any) {
        //    // if (data.hours) { data.hours = ': ' + data.hours; }
        //     callback(null, data);
        //   };
        var rpt = new Report(definition.Path) //, {margins: {left:20, top:20, right: 20, bottom:20}})
            .autoPrint(false) // Optional
            .pageHeader(definition.Title) // Optional
            .pageFooter(definition.Footer);
        //   .finalSummary( ["Total Hours:", "hours", 3] )// Optional
        //   .userdata( {hi: 1} )// Optional 
        //   .data( mydata )	// REQUIRED
        //   .sum( "hours" )	// Optional
        //   .detail( daydetail ) // Optional
        //   .totalFormatter( totalFormatter ) // Optional
        //   .fontSize(8); // Optional
        var nameheader = function (report, data) {
            report.print(data.name, { fontBold: true, underline: true });
        };
        var weekdetail = function (report, data) {
            // We could do this -->  report.setCurrentY(report.getCurrentY()+2);   Or use the shortcut below of addY: 2
            report.print(["Week Number: " + data.week], { x: 100, addY: 2 });
        };
        var namefooter = function (report, data, state) {
            report.band([["Totals for " + data.name, 180], [report.totals.hours, 100, 3]], { addY: 1 });
            report.newLine();
        };
        // rpt.groupBy("name")
        //     .sum('hours')
        //     .header(nameheader) //, {runHeader: Report.show.always} )
        //     .footer(namefooter)
        //     .groupBy("week")
        //     .header(weekdetail);
        // Debug output is always nice (Optional, to help you see the structure)
        //    rpt.printStructure(true);
        rpt.render(function (err, name) { });
    }
};
var ReportDefinition = /** @class */ (function () {
    function ReportDefinition() {
    }
    return ReportDefinition;
}());
//# sourceMappingURL=Report.js.map