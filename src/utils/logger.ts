/**
 * Logger utility for development and debugging
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: number;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private enabled = true;

  private constructor() {
    // Only enable in development
    this.enabled = (import.meta as any).env?.DEV || false;
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: any): void {
    this.log('debug', message, data);
  }

  /**
   * Log info message
   */
  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  /**
   * Log error message
   */
  error(message: string, data?: any): void {
    this.log('error', message, data);
  }

  /**
   * Generic log method
   */
  private log(level: LogLevel, message: string, data?: any): void {
    if (!this.enabled) return;

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: Date.now(),
    };

    this.logs.push(entry);

    // Trim logs if too many
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output with colors
    const style = this.getLogStyle(level);
    if (data) {
      console[level](`%c[${level.toUpperCase()}]%c ${message}`, style, '', data);
    } else {
      console[level](`%c[${level.toUpperCase()}]%c ${message}`, style, '');
    }
  }

  /**
   * Get console style for log level
   */
  private getLogStyle(level: LogLevel): string {
    const styles: Record<LogLevel, string> = {
      debug: 'color: #6B7280; font-weight: bold',
      info: 'color: #3B82F6; font-weight: bold',
      warn: 'color: #F59E0B; font-weight: bold',
      error: 'color: #EF4444; font-weight: bold',
    };
    return styles[level];
  }

  /**
   * Get all logs
   */
  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter((log) => log.level === level);
    }
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  clear(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  export(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Enable/disable logging
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

// Export singleton instance
export const logger = Logger.getInstance();
