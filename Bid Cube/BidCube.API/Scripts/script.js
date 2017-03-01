angular.module('myApp', ['smart-table', 'xeditable'])
    .run(function (editableOptions, $httpBackend) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        /*$httpBackend.whenPOST(/\/saveBid/).respond(function (method, url, data) {
            data = angular.fromJson(data);
            return [200, { status: 'ok' }];
        });*/
    })

    .controller('mainCtrl',  function ($scope, $http)  {

        var
            nameList = ['Abrar', 'LeBrar', 'Arbrar', 'Abrir', 'Cobra'],
            familyName = ['Basha', 'James', 'Badsha', 'Bashir', 'Bashuh'];

        function createRandomItem() {
            var
                firstName = Math.floor(Math.random() * 4),
                lastName = Math.floor(Math.random() * 4000),
                age = 'email from ' + nameList[Math.floor(Math.random() * 4)] + ' ' + familyName[Math.floor(Math.random() * 4)],
                email = nameList[Math.floor(Math.random() * 4)] + familyName[Math.floor(Math.random() * 4)] + '@aol.com';

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

        $scope.checkIfNumber = function (data) {
            if (!isNaN(data) === false) {
                return "Input must be a number";
            }
        };

        $scope.checkInAgeRange = function (data) {
            if (!isNaN(data) === false) {
                return "Input must be a number";
            }
            else if (data < 0 || data > 99) {
                return "Input must be a within range 0-99";
            }
        };

        $scope.checkInLOIRange = function (data) {
            if (!isNaN(data) === false) {
                return "Input must be a number";
            }
            else if (data < 0 || data > 100) {
                return "Input must be within range 0-100";
            }
        };

        //todo: this isn't working
        $scope.checkIfString = function (data) {
            if (typeof data !== string || !(data instanceof String)) {
                return "Input must be text";
            }
        };

        $scope.EditBid = {
            CPI: undefined,
            IR: undefined,
            LOI: undefined,
            SampleType: undefined,
            CountryLanguage: undefined,
            NRequested: undefined,
            NFeasible: undefined,
            TargetAgeMin: undefined,
            TargetAgeMax: undefined,
            TargetGender: undefined,
            TargetNotes: undefined,
            QuotaNotes: undefined,
            Tags: undefined,
            FollowUp: undefined,
            Category: undefined
        };
        $scope.NewBid = {
            CPI: undefined,
            IR: undefined,
            LOI: undefined,
            SampleType: undefined,
            CountryLanguage: undefined,
            NRequested: undefined,
            NFeasible: undefined,
            TargetAgeMin: undefined,
            TargetAgeMax: undefined,
            TargetGender: undefined,
            TargetNotes: undefined,
            QuotaNotes: undefined,
            Tags: undefined,
            FollowUp: undefined,
            Category: undefined
        };

        $scope.genders = [
            { value: 1, text: 'Male' },
            { value: 2, text: 'Female' },
            { value: 3, text: 'All' }
        ];

        $scope.languages = [
            { value: 1, text: 'English' },
            { value: 2, text: 'Spanish' },
            { value: 3, text: 'None' }
        ];

        $scope.showGenders = function () {
            var selected = [];
            if (NewBid.TargetGender) {
                selected = $filter('filter')($scope.genders, { value: NewBid.TargetGender });
            }
            return selected.length ? selected[0].text : 'Not set';
        };

        $scope.showLanguages = function () {
            var selected = [];
            angular.forEach($scope.languages, function () {
                if ($scope.languages.indexOf(l.value) >= 0) {
                    selected.push(l.text);
                }
            });
            return selected.length ? selected.join(', ') : 'Not set';
        };

        $scope.saveNewBid = function() {
            return $http.post('/api/BidStatus/Post', $scope.NewBid);
        };

    })

    .directive('stRatio', function () {
        return {
            link: function (scope, element, attr) {
                var ratio = +attr.stRatio;

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

/*function saveNewBid($scope, $http) {
    return $http.post('/api/BidStatus/Post', $scope.NewBid);
};*/

