angular.module('pocApp').factory('imagemService', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    factory.Pesquisar = function (model, successCallback, errorCallback) {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
        var configFlickr = {
            method: "flickr.photos.search",
            api_key: "c6e4cc2bfc28263ddfd6e00451a09c61",
            //api_sig: "bda49bb72202ae5b2b440793e981cdf8",
            //auth_token: "72157684540378491-95fada582b3aec7a",
            format: "json",
            text: "produto",
            per_page: 8,
            nojsoncallback: 1,
            page: 1
        };

        configFlickr = $.extend(configFlickr, model);

        var args = null;

        for (var property in configFlickr) {
            if (args) {
                args += '&' + property + '=' + configFlickr[property];
            } else {
                args = property + '=' + configFlickr[property];
            }
        }
        
        /* exemplo
        https://www.flickr.com/services/api/explore/flickr.photos.search

        quando a chave expirar tem que usar uma nova
        

        https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c6e4cc2bfc28263ddfd6e00451a09c61&text=teste&format=json&nojsoncallback=1&auth_token=72157684540378491-95fada582b3aec7a&api_sig=bda49bb72202ae5b2b440793e981cdf8
        https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1eabbbf9186679ef2e3ed62816de193d&text=banana&format=json&nojsoncallback=1&page=2
        */

        $http.get('https://api.flickr.com/services/rest/?' + args).then(function ($response)
        {
            var data = $.extend(model, $response.data.photos);
            var photo = data.photo;


            for (var index in photo) {

                var thisPhoto = photo[index];

                var cfg = {
                    farm: 1,
                    server: 2,
                    id: '1418878',
                    secret: '1e92283336',
                    size: 'm'
                };

                cfg = $.extend(cfg, thisPhoto);

                thisPhoto.url = 'https://farm' + cfg.farm + '.staticflickr.com/' + cfg.server + '/' + cfg.id + '_' + cfg.secret + '_' + cfg.size + '.jpg';

                
                /* exemplo

                https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

                farm-id: 1
                server-id: 2
                photo-id: 1418878
                secret: 1e92283336
                size: m   
                */
            }

            successCallback(data);
        
        }, innerErrorCallback);
        

    };
    return factory;
}]);