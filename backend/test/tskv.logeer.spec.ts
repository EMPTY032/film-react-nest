import { TSKVLogger } from '../src/logger/tskv.logger';

describe('TskvLogger', () => {
  let logger: TSKVLogger;

  beforeEach(() => {
    logger = new TSKVLogger();
  });

  it('should log message in TSKV format', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.log('Test message');

    expect(consoleSpy).toHaveBeenCalled();

    const loggedMessage = consoleSpy.mock.calls[0][0];

    expect(loggedMessage).toContain('tskv');
    expect(loggedMessage).toContain('level=log');
    expect(loggedMessage).toContain('message=Test message');
    expect(loggedMessage).toContain('timestamp=');

    consoleSpy.mockRestore();
  });
});
