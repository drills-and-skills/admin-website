class Video {
    constructor(name, link, number) {
        this.name = name;
        this.link = link;
        this.number = number;
    }
}

const videoConverter = {
    toFirestore: function (video) {
        return {
            name: video.name,
            link: video.link,
            number: video.number,
        };
    },
};
export {Video, videoConverter};
