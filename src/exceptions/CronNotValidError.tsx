class CronNotValidError extends Error {
  constructor() {
    super("CRON STRING NOT VALIDE");
  }
}

export default CronNotValidError;
