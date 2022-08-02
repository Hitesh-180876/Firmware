$(document).ready(function () {
    alert("ready");
})
console.log("hello js")


//Get records from customer Id and Model Number
function getFirmware() {
    var custId = document.getElementById('customerId').value;
    var modelNumber = $('#modelNumber').val();
    $.ajax({
        type: "GET",
        url: `http://localhost:5600/firmware/config/?customerId=${custId}&modelNumber=${modelNumber}`,

        success: function (response) {
            getRecordsForCustomerIdAndModelNumber(response);
        },
        error: function (err) {
            alert("error is" + err)
        }
    });

}
$("#submit").click(getFirmware);


//function to print get data table
function getRecordsForCustomerIdAndModelNumber(response) {
    data = response
    console.log(response);
    if (data.length == 0) {
        $("#noData").html("No Data Found");
        $("#noData").hide(10000)
    }
    for (i = 0; i < data.length; i++) {
        $("#tableBody")
            .append(
                '<tr><td class="row_id">'
                + data[i].entryId
                + '</td> <td class="fv">'
                + data[i].firmwareVersion
                + '</td> <td class="utnd">'
                + data[i].updateToNextId
                + '</td> <td class="ustatus">'
                + data[i].updateStatus
                + '</td> <td class="fmHash">'
                + data[i].fileMd5Hash
                + '</td> <td class="dUrl">'
                + data[i].downloadUrl
                + '</td> <td class ="upKey">'
                + data[i].updateKey
                + '</td> <td class="rDate">'
                + data[i].releaseDate
                + '</td> <td class="minAAV">'
                + data[i].minAndroidAppVersion
                + '</td> <td class="minIAV">'
                + data[i].minIosAppVersion
                + '</td> <td> <button type="button" class="btn btn-success  editFirmwareDetails">Edit</button></td></tr>');
    }
}

//Reset Form if closed
$('#firmwareModal').on('hidden.bs.modal', function () {
    $('#firmwareModal form')[0].reset();
});


// Save form  Data to Database

function saveForm() {

    var customer_Id = $("#customer_Id").val();
    var model_Number = $("#model_Number").val();
    var firmware_Version = $("#firmware_Version").val();
    var update_To_Next_Id = $("#update_To_Next_Id").val();
    var update_Status = $("#update_Status").val();
    var file_MD5_Hash = $("#file_MD5_Hash").val();
    var add_File = $("#add_File")[0].files[0];
    var update_Key = $("#update_Key").val();
    var release_Date = $("#release_Date").val();
    var min_Android_App_Version = $("#min_Android_App_Version").val();
    var min_Ios_App_Version = $("#min_Ios_App_Version").val();


    let fd = new FormData();
    fd.append("customerId", customer_Id);
    fd.append("modelNumber", model_Number);
    fd.append("firmwareVersion", firmware_Version);
    fd.append("updateToNextId", update_To_Next_Id);
    fd.append("updateStatus", update_Status);
    fd.append("fileMD5Hash", file_MD5_Hash);
    fd.append("file", add_File, add_File.name);
    fd.append("updateKey", update_Key);
    fd.append("releaseDate", release_Date);
    fd.append("minAndroidAppVersion", min_Android_App_Version);
    fd.append("minIosAppVersion", min_Ios_App_Version);

    for (let obj of fd) {
        console.log(obj);
    }

    var request = new XMLHttpRequest();


    request.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    request.open("POST", "http://localhost:5600/firmware/config", false);

    request.send(fd);
    document.getElementById("response").innerHTML = "Submitted successfully";
}
$("#saveData").click(saveForm);


//Edit Form Data to Database
var fdEdit = new FormData();
$(document).ready(function () {
    $(document).on('click', '.editFirmwareDetails', function () {

        var entry_idEdit = $(this).closest('tr').find('.row_id').text();

        var customer_IdEdit = $('#customerId').val();
        var model_NumberEdit = $('#modelNumber').val();
        var firmware_VersionEdit = $(this).closest('tr').find('.fv').text();
        var update_To_Next_IdEdit = $(this).closest('tr').find('.utnd').text();
        var update_StatusEdit = $(this).closest('tr').find('.ustatus').text();
        var file_MD5_HashEdit = $(this).closest('tr').find('.fmHash').text();
        var update_KeyEdit = $(this).closest('tr').find('.upKey').text();
        var download_UrlEdit = $(this).closest('tr').find('.dUrl').text();
        var release_DateEdit = $(this).closest('tr').find('.rDate').text();
        var min_Android_App_VersionEdit = $(this).closest('tr').find('.minAAV').text();
        var min_Ios_App_VersionEdit = $(this).closest('tr').find('.minIAV').text();


        document.querySelector(".entryIdEdit").value = entry_idEdit;
        document.querySelector(".customerIdEdit").value = customer_IdEdit;
        document.querySelector(".modelNumberEdit").value = model_NumberEdit
        document.querySelector(".firmwareVersionEdit").value = firmware_VersionEdit;
        document.querySelector(".updateToNextIdEdit").value = update_To_Next_IdEdit;
        document.querySelector(".updateStatusEdit").value = update_StatusEdit;
        document.querySelector(".fileMD5HashEdit").value = file_MD5_HashEdit;
        document.querySelector(".updateKeyEdit").value = update_KeyEdit;
        document.querySelector(".downloadUrlEdit").value = download_UrlEdit;
        document.querySelector(".releaseDateEdit").value = release_DateEdit;
        document.querySelector(".minAndroidAppVersionEdit").value = min_Android_App_VersionEdit;
        document.querySelector(".minIosAppVersionEdit").value = min_Ios_App_VersionEdit;

        $('#firmwareModalEdit').modal('show');

    });

    $(document).on('click', '#updateDataButton', function () {
        var entry_Id1 = $("#entryIdEdit").val();
        alert(entry_Id1);
        var customer_Id1 = $("#customerIdEdit").val();
        var model_Number1 = $("#modelNumberEdit").val();
        var firmware_Version1 = $("#firmwareVersionEdit").val();
        var update_To_Next_Id1 = $("#updateToNextIdEdit").val();
        var update_Status1 = $("#updateStatusEdit").val();
        var file_MD5_Hash1 = $("#fileMD5HashEdit").val();
        var update_Key1 = $("#updateKeyEdit").val();
        var release_Date1 = $("#releaseDateEdit").val();
        var download_Url1 = $("#downloadUrlEdit").val();
        var min_Android_App_Version1 = $("#minAndroidAppVersionEdit").val();
        var min_Ios_App_Version1 = $("#minIosAppVersionEdit").val();


        fdEdit.append("entryId", entry_Id1)
        fdEdit.append("customerId", customer_Id1);
        fdEdit.append("modelNumber", model_Number1);
        fdEdit.append("firmwareVersion", firmware_Version1);
        fdEdit.append("updateToNextId", update_To_Next_Id1);
        fdEdit.append("updateStatus", update_Status1);
        fdEdit.append("fileMD5Hash", file_MD5_Hash1);
        fdEdit.append("downloadUrl", download_Url1);
        fdEdit.append("updateKey", update_Key1);
        fdEdit.append("releaseDate", release_Date1);
        fdEdit.append("minAndroidAppVersion", min_Android_App_Version1);
        fdEdit.append("minIosAppVersion", min_Ios_App_Version1);



        var xhr = new XMLHttpRequest();

        for (let obj1 of fdEdit) {
            console.log(obj1);
        }

        xhr.open("PUT", "http://localhost:5600/firmware/config", true);

        try {
            xhr.send(fdEdit);
            if (xhr.status == 0) {
                alert("Status code "+xhr.status+"and updated Successfully");
                
            } else {
                alert("error");
            }
        } catch (err) { 
            alert("Request failed");
        }

        $('#firmwareModalEdit').modal('hide');
        $("#tableBody").empty();
        // $("#tableBody").children().remove()

        getFirmware();

    });


});



//Form data validations
$("#firmwareModal").validate({
    rules: {
        customer_Id: {
            minlength: 2
        }
    },
    message: {
        customer_Id: {
            required: "Plese enter id",
            minlength: "Name should have atleast 2 character"
        }
    },
});


/*
for (i = 0; i < data.length; i++) {
        $("#tableData")
            .append(
                '<tr><td class="row_id">'
                + data[i].entryId
                + '</td> <td class="fv">'
                + data[i].firmwareVersion
                + '</td> <td class="utnd">'
                + data[i].updateToNextId
                + '</td> <td class="ustatus">'
                + data[i].updateStatus
                + '</td> <td class="fmHash">'
                + data[i].fileMd5Hash
                + '</td> <td class="dUrl">'
                + data[i].downloadUrl
                + '</td> <td class ="upKey">'
                + data[i].updateKey
                + '</td> <td class="rDate">'
                + data[i].releaseDate
                + '</td> <td class="minAAV">'
                + data[i].minAndroidAppVersion
                + '</td> <td class="minIAV">'
                + data[i].minIosAppVersion
                + '</td> <td> <button type="button" class="btn btn-success  editFirmwareDetails">Edit</button></td></tr>');
    }
*/
