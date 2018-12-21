
var fs = require("fs");

const loadJsonFile = require('load-json-file');
var opsOfficer;
loadJsonFile('opsOfficer.json').then(opsOfficer => {
    loadJsonFile('cpaLoginPartner.json').then(cpaLogin => {
        //console.log("opsOfficer" +JSON.stringify(opsOfficer));
        //console.log("\n\n\n\n cpaLogin" +JSON.stringify(cpaLogin));

        var count = 0, editableCount = 0, readableCount = 0;
        var editableLIst = [], readableList = [];
        console.log(JSON.stringify(cpaLogin.Profile.fieldPermissions[5].field, null, 1));
        for (var i = 0; i < opsOfficer.Profile.fieldPermissions.length; i++) {
            for (var j = 0; j < cpaLogin.Profile.fieldPermissions.length; j++) {
                count++;
                if (opsOfficer.Profile.fieldPermissions[i].field === cpaLogin.Profile.fieldPermissions[j].field) {
                    if (opsOfficer.Profile.fieldPermissions[i].editable == "true" && cpaLogin.Profile.fieldPermissions[j].editable == "false") {
                        //console.log("\n\n editable  " + opsOfficer.Profile.fieldPermissions[i].field);
                        editableLIst.push(opsOfficer.Profile.fieldPermissions[i].field);
                        editableCount++;
                    }
                    if (opsOfficer.Profile.fieldPermissions[i].readable == "true" && cpaLogin.Profile.fieldPermissions[j].readable == "false") {
                        //console.log("\n\n readable  " + opsOfficer.Profile.fieldPermissions[i].field);
                        readableList.push(opsOfficer.Profile.fieldPermissions[i].field)
                        readableCount++;
                    }
                }
            }
        }
        console.log("count " + count)
        console.log("editableCount " + editableCount)
        console.log("readableCount " + readableCount)

        var writeStream = fs.createWriteStream("ProfileCompare.rtf");
        writeStream.write("All Editable fields in Ops Officer which are non-editable in CPA Login Partner");
        for (var index=0; index< editableLIst.length; index++ )
            writeStream.write("\n"+editableLIst[index]);

            writeStream.write("\n\nAll Readable fields in Ops Officer which are non-editable in CPA Login Partner");
            for (var index=0; index< readableList.length; index++ )
                writeStream.write("\n"+readableList[index]);

        writeStream.end();

    })
});
