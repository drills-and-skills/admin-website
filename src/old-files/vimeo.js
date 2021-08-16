let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(
    '6b104bfa0fcb1a18ee66e28b34c1310bfc9da72b',
    '7stdCcKs9yolMneQQbKffwxmWecA8NnurjY3elYlE9sdZo7vrK4ypvAjtASKiV6wMsmY9DdIpFOL0KEqeF66v9XkgLayoGqpckj8zrPipL3QAFJE/0OimrHwgpFXiIF5',
    'aee5286d87f0a53299355319be4dd469',
);

client.request(
    {
        method: 'GET',
        path: '/tutorial',
    },
    function (error, body, status_code, headers) {
        if (error) {
            console.log(error);
        }

        console.log(body);
    },
);
