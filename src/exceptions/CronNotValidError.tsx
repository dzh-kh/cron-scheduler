class CronNotValidError extends Error {
  constructor(val: string) {
    super("CRON STRING NOT VALIDE " + val);
  }
}

export default CronNotValidError;
