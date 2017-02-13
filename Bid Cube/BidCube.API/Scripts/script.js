angular.module('myApp', ['smart-table'])
    .controller('mainCtrl', ['$scope', function ($scope) {

        var
            nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
            familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

        function createRandomItem() {
            var
                firstName = Math.floor(Math.random() * 4),
                lastName = Math.floor(Math.random() * 4000),
                age = 'email from ' + nameList[Math.floor(Math.random() * 4)] + ' ' + familyName[Math.floor(Math.random() * 4)],
                email = nameList[Math.floor(Math.random() * 4)] + familyName[Math.floor(Math.random() * 4)] + '@whatever.com';

            return {
                status: firstName,
                mcref: lastName,
                subject: age,
                client: email
            };
        }

        $scope.displayed = [];
        for (var j = 0; j < 50; j++) {
            $scope.displayed.push(createRandomItem());
        }
    }])

    .directive('stRatio', function () {
        return {
            link: function (scope, element, attr) {
                var ratio = +(attr.stRatio);

                element.css('width', ratio + '%');

            }
        };
    });

$('#addEditModal').on('shown.bs.modal', function () {
    $(this).find('.modal-dialog').css({
        width: 'auto',
        height: 'auto',
        'max-height': '100%'
    });
});

$(document).ready(function () {
    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline';

    //toggle button for auto continue
    $('#enable').click(function () {
        $('#user .editable').editable('toggleDisabled');
    });

    //Edit Bid
    /*
    $('#MCREF').editable();
    $('#SalesRep').editable();
    $('#BiddingManager').editable();
    $('#Subject').editable();
    $('#ReplyCount').editable();
    $('#Status').editable();
    $('#Client').editable();
    $('#TotalRevenue').editable();
    */
    $('#CPI').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#IR').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#LOI').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#SampleType').editable();
    $('#CountryLanguage').editable();
    $('#NRequested').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#NFeasible').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#TargetAge').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#TargetGender').editable({
        prepend: "not selected",
        source: [
            { value: 1, text: 'Male' },
            { value: 2, text: 'Female' },
            { value: 3, text: 'Any' }
        ]
    });
    $('#TargetNotes').editable();
    $('#QuotaNotes').editable();
    $('#Tags').editable();
    $('#FollowUp').editable();
    $('#Category').editable();

    /*$('#editBidModal .editable').on('hidden', function (e, reason) {
        var $next = $(this).closest('tr').next().find('.editable');
        setTimeout(function () {
            $next.editable('show');
        }, 300);
        $next.focus();
    });*/

    //Add Bid
    /*
    $('#newMCREF').editable();
    $('#newSalesRep').editable();
    $('#newBiddingManager').editable();
    $('#newSubject').editable();
    $('#newReplyCount').editable();
    $('#newStatus').editable();
    $('#newClient').editable();
    $('#newTotalRevenue').editable();
    */
    $('#newCPI').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        } /*,
        display: function (value) {
            var formattedValue = value.toFixed(2);
            $('#newCPI').text(formattedValue);
        }*/
    });

    $('#newIR').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#newLOI').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#newSampleType').editable();
    $('#newCountryLanguage').editable();
    $('#newNRequested').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#newNFeasible').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#newTargetAge').editable({
        type: 'text',
        validate: function (value) {
            if ($.isNumeric(value) === '') {
                return 'Only numbers are allowed';
            }
        }
    });
    $('#newTargetGender').editable({
        prepend: "not selected",
        source: [
            { value: 1, text: 'Male' },
            { value: 2, text: 'Female' },
            { value: 3, text: 'Any' }
        ]
    });
    $('#newTargetNotes').editable();
    $('#newQuotaNotes').editable();
    $('#newTags').editable();
    $('#newFollowUp').editable();
    $('#newCategory').editable();

    $('#newBidModal .editable').on('hidden', function (e, reason) {
        var $next = $(this).closest('tr').next().find('.editable');
        /*setTimeout(function () {
            $next.editable('show');
        }, 300);*/
        $next.focus();
    });

});

$('#emailTab').on('shown', function () {
    //function LoginToOWA(server, domain, username, password, useremailaddress)
    window.alert("entering LoginToOWA function");
    var server = "mex06.emailsrvr.com";
    var domain = "market-cube";
    var username = "abrar.basha";
    var password = "Clemson09!";
    var useremailaddress = "abrar.basha@market-cube.com";
    var url = "https://" + server + "/owa/" + useremailaddress + "/auth/owaauth.dll";
    var p = { destination: 'https://' + server + '/owa/#path=/mail', flags: '0', forcedownlevel: '0', trusted: '0', isutf8: '1', username: domain + '\\' + username, password: password };

    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.action = url;

    for (var k in p) {

        var myInput = document.createElement("input");
        myInput.setAttribute("name", k);
        myInput.setAttribute("value", p[k]);
        myForm.appendChild(myInput);
    }
    document.body.appendChild(myForm);
    myForm.submit();
    document.body.removeChild(myForm);

});

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

