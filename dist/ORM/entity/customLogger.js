"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
class CustomLogger {
    logQuery(query, parameters, queryRunner) {
        if (query.includes("userInfoEntity")) {
            console.log("Query: ", query);
            if (parameters)
                console.log("Parameters: ", parameters);
        }
    }
    logQueryError(error, query, parameters, queryRunner) {
        console.error(`[QUERY FAILED]: ${query}`, parameters);
    }
    // 나머지 Logger 인터페이스 필수 메소드 구현
    logQuerySlow(time, query, parameters, queryRunner) {
        console.warn(`[SLOW QUERY: ${time} ms]: ${query}`, parameters);
    }
    logSchemaBuild(message, queryRunner) {
        console.log(`[SCHEMA BUILD]: ${message}`);
    }
    logMigration(message, queryRunner) {
        console.log(`[MIGRATION]: ${message}`);
    }
    log(level, message, queryRunner) {
        if (level === "log") {
            console.log(message);
        }
        else if (level === "info") {
            console.info(message);
        }
        else if (level === "warn") {
            console.warn(message);
        }
    }
}
exports.CustomLogger = CustomLogger;
