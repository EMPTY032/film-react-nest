import { JsonLogger } from '../src/logger/json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('should log message in JSON format', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.log('тест');

    expect(consoleSpy).toHaveBeenCalled();

    const loggedMessage = consoleSpy.mock.calls[0][0];

    expect(loggedMessage).toContain('"level":"log"');
    expect(loggedMessage).toContain('"message":"тест"');

    consoleSpy.mockRestore();
  });
});
