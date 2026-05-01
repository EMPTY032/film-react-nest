import { beforeEach, describe, it } from "node:test";
import { JsonLogger } from "../src/logger/json.logger";

describe("JsonLogger", ()=>{
    let logger: JsonLogger

    beforeEach(()=>{
        logger = new JsonLogger()
    })

    it("should log message in JSON format", ()=>{
        const consoleSpy = jest.
    })
})