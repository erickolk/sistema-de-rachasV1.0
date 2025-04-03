"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModel = exports.scheduleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.scheduleSchema = new mongoose_1.Schema({
    startTime: {
        type: String,
        required: true,
    },
    finishTime: {
        type: String,
        required: true,
    },
    day: {
        type: Date,
        required: true,
    },
});
exports.ScheduleModel = (0, mongoose_1.model)('Schedule', exports.scheduleSchema);
