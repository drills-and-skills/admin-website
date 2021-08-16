class Module {
    constructor(levels, modName, progressNum, trainers) {
        this.levels = levels;
        // this.level1 = level1;
        // this.level2 = level2;
        // this.level3 = level3;
        this.modName = modName;
        this.progressNum = progressNum;
        this.trainers = trainers;
    }
}
const moduleConverter = {
    toFirestore: function (mod) {
        return {
            levels: mod.levels,
            modName: mod.modName,
            progressNum: mod.progressNum,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Module(data.levels, data.modName, data.progressNum);
    },
};

export {Module, moduleConverter};
