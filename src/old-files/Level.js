class Level {
    constructor(videos) {
        this.videos = videos;
        this.numVideos = videos.length;
        // this.video1 = video1;
        // this.video2 = video2;
        // this.video3 = video3;
        // this.number = number;
    }
}
const levelConverter = {
    toFirestore: function (lev) {
        return {
            video1: lev.video1,
            video2: lev.video2,
            video3: lev.video3,
            number: lev.number,
        };
    },
};
export {Level, levelConverter};
