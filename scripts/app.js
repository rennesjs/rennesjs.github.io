angular.module('app', ['ngSanitize'])
    .controller('AppController', ['$scope', '$http', function ($scope, $http) {
        var vm = this;

        $http.get('data/data.json').success(function (data) {
            vm.sponsors = data && data.sponsors;
            vm.partners = data && data.partners;
            vm.previousTalks = data && data.previousTalks;
        });

        $http.get('https://api.meetup.com/RennesJS/events?&sign=true&photo-host=public&scroll=next_upcoming').then(function (data) {
            if (data.length) {
                vm.nextMeetup = data && data.data[0];
                vm.nextMeetup.name = vm.nextMeetup.name.replace(/.*?RennesJS\s:\s/g, '');
                vm.nextMeetup.description = vm.nextMeetup.description
                    .replace(/.*?Programme\s<\/b><\/i><\/p>\s/gm, '')
                    .replace(/<p>--------------<\/p>[\s\S]*/gm, '')
                    .replace(/•\s/gm, '')
                    .split('</p> <p>');

                vm.nextMeetup.intro = vm.nextMeetup.description[0]
                    .replace('<p>', '')
                    .replace('</p>', '');
                vm.nextMeetup.description.shift();

                angular.forEach(vm.nextMeetup.description, function (item, key) {
                    vm.nextMeetup.description[key] = item
                        .replace(/<[pi]>"?(.*?)"?<\/[pi]>/g, '$1')
                        .replace(/.*?src="(.*?)"\s\/>/g, '$1')
                        .replace(/\((.*?)min\)[\s\S]*/g, '<br><small>($1min)</small>')
                        .replace(/^<br\/>/g, '');
                });

                vm.meetup = vm.nextMeetup;
            }
            else { // No upcoming talk, display the last one
                $http.get('https://api.meetup.com/RennesJS/events?&sign=true&photo-host=public&scroll=recent_past').then(function (data) {
                    vm.lastMeetup = data && data.data[0];
                    vm.lastMeetup.name = vm.lastMeetup.name.replace(/.*?RennesJS\s:\s/g, '');
                    vm.lastMeetup.description = vm.lastMeetup.description
                        .replace(/.*?Programme\s<\/b><\/i><\/p>\s/gm, '')
                        .replace(/<p>--------------<\/p>[\s\S]*/gm, '')
                        .replace(/•\s/gm, '')
                        .split('</p> <p>');

                    vm.lastMeetup.intro = vm.lastMeetup.description[0]
                        .replace('<p>', '')
                        .replace('</p>', '');
                    vm.lastMeetup.description.shift();

                    angular.forEach(vm.lastMeetup.description, function (item, key) {
                        vm.lastMeetup.description[key] = item
                            .replace(/<[pi]>"?(.*?)"?<\/[pi]>/g, '$1')
                            .replace(/.*?src="(.*?)"\s\/>/g, '$1')
                            .replace(/\((.*?)min\)[\s\S]*/g, '<br><small>($1min)</small>')
                            .replace(/^<br\/>/g, '');
                    });

                    vm.meetup = vm.lastMeetup;
                })
            }
        })

    }
    ]);
