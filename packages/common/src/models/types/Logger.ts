interface LogMethod {
    (message: string, ...meta: any[]): void;
    (message: any): void;
};

export type Logger = {
    debug: LogMethod;
    verbose: LogMethod;
    info: LogMethod;
    warn: LogMethod;
    error: LogMethod;
};