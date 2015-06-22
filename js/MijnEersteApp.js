window.onload=function(){
	$.support.cors = true;
        
        $('#btnOK').click(function () {
            CallWebServiceTest();
        });
};

function CallWebServiceTest() {
	var param = '{"PID7": "'+ $('#inPID7').val() + '" }';
	CallWebService('GetAfspraken', param, TestSuccess);
        
        //var param = '{}';
	//CallWebService('Test', param, TestSuccess);
}

function TestSuccess(msg) {
	var result = msg.GetAfsprakenResult;
        if (result.ServiceCallResult.Success) {
            var $tableResult = $('#tableResult');
            $tableResult.find('thead').show();
            $tableResult.find('tbody').html('');
            $.each(result.Afspraken, function (i, afspraak) {
                var $tr = $('<tr>');
                $tr.append($('<td>').append(afspraak.Datum));
                $tr.append($('<td>').append(afspraak.ExCode));
                $tr.append($('<td>').append(afspraak.ArtsCode));
                $tr.append($('<td>').append(afspraak.ArtsNaam));
                $tr.append($('<td>').append(afspraak.ArtsVoornaam));
                $tableResult.find('tbody').append($tr);
            });
        } else {
            alert(result.ServiceCallResult.ErrorMessage);
        }
        
}

function defaultFor(arg, val) {
	return typeof arg !== 'undefined' ? arg : val;
}

function CallWebService(procedure, param, functionSuccess, functionError, invokedata) {
	functionError = defaultFor(functionError, CallWebServiceError);
	$.ajax({
		type: "POST",
		url: "http://10.3.99.76/AppService/Service.svc/" + procedure,
		data: param,
		processData: true,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: functionSuccess,
		error: functionError,
		invokedata: invokedata
	});
}

function CallWebServiceError(e) {
	alert('Fout bij oproepen webservice (' + e.statusText + ')');
}


