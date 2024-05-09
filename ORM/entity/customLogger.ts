// CustomLogger.ts
import { Logger, QueryRunner } from "typeorm";

export class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (query.includes("userInfoEntity")) {
      console.log("Query: ", query);
      if (parameters) console.log("Parameters: ", parameters);
    }
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    console.error(`[QUERY FAILED]: ${query}`, parameters);
  }

  // 나머지 Logger 인터페이스 필수 메소드 구현
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    console.warn(`[SLOW QUERY: ${time} ms]: ${query}`, parameters);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    console.log(`[SCHEMA BUILD]: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    console.log(`[MIGRATION]: ${message}`);
  }

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    if (level === "log") {
      console.log(message);
    } else if (level === "info") {
      console.info(message);
    } else if (level === "warn") {
      console.warn(message);
    }
  }
}
