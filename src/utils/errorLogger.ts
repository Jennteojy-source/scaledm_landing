interface InstagramApiError {
  message: string;
  type: string;
  code: number;
  fbtrace_id?: string;
  error_subcode?: number;
  error_user_title?: string;
  error_user_msg?: string;
}

interface ErrorLogContext {
  businessInstagramId?: string;
  recipientId?: string;
  instagramApiPayload?: any;
  endpoint?: string;
  method?: string;
  userId?: string;
  automationId?: string;
  campaignId?: string;
  media?: {
    id?: string;
    type?: string;
    url?: string;
    caption?: string;
    hashtags?: string[];
  };
  automation?: {
    id?: string;
    name?: string;
    type?: string;
    trigger?: string;
    status?: string;
    scheduledTime?: string;
  };
  message?: {
    id?: string;
    text?: string;
    type?: string;
    templateId?: string;
    variables?: Record<string, any>;
  };
  timestamp?: string;
  requestId?: string;
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
  correlationId?: string;
}

interface EnhancedErrorLog {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  context: ErrorLogContext;
  error: InstagramApiError | Error;
  stack?: string;
  metadata: {
    service: string;
    version: string;
    environment: string;
    timestamp: string;
    requestId: string;
  };
}

class InstagramErrorLogger {
  private service: string;
  private version: string;
  private environment: string;

  constructor(service = 'scaledm', version = '1.0.0', environment = process.env.NODE_ENV || 'development') {
    this.service = service;
    this.version = version;
    this.environment = environment;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private sanitizePayload(payload: any): any {
    if (!payload) return null;
    
    const sanitized = { ...payload };
    
    // Remove sensitive data
    if (sanitized.access_token) {
      sanitized.access_token = 'REDACTED';
    }
    if (sanitized.token) {
      sanitized.token = 'REDACTED';
    }
    
    return sanitized;
  }

  logInstagramApiError(
    error: InstagramApiError | Error,
    context: ErrorLogContext,
    originalError?: any
  ): EnhancedErrorLog {
    const requestId = context.requestId || this.generateRequestId();
    const timestamp = new Date().toISOString();
    
    const enhancedLog: EnhancedErrorLog = {
      level: 'error',
      message: `Instagram API Error: ${error.message}`,
      context: {
        ...context,
        timestamp,
        requestId,
        instagramApiPayload: context.instagramApiPayload ? this.sanitizePayload(context.instagramApiPayload) : undefined,
      },
      error,
      stack: originalError?.stack || (error as Error).stack,
      metadata: {
        service: this.service,
        version: this.version,
        environment: this.environment,
        timestamp,
        requestId,
      }
    };

    // Log to console with structured format
    console.error('Instagram API Error Details:', {
      message: enhancedLog.message,
      context: enhancedLog.context,
      error: enhancedLog.error,
      metadata: enhancedLog.metadata,
      // Additional debugging info
      debugInfo: {
        timestamp: new Date().toISOString(),
        processId: process.pid,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd(),
        env: {
          NODE_ENV: process.env.NODE_ENV,
          ENVIRONMENT: process.env.ENVIRONMENT,
          VERSION: process.env.VERSION,
          BUILD_NUMBER: process.env.BUILD_NUMBER
        }
      }
    });

    // Log to Google Cloud Logging (structured JSON)
    console.error(JSON.stringify({
      severity: 'ERROR',
      message: enhancedLog.message,
      context: {
        businessInstagramId: enhancedLog.context.businessInstagramId,
        recipientId: enhancedLog.context.recipientId,
        endpoint: enhancedLog.context.endpoint,
        method: enhancedLog.context.method,
        instagramApiPayload: enhancedLog.context.instagramApiPayload,
        userId: enhancedLog.context.userId,
        automationId: enhancedLog.context.automationId,
        campaignId: enhancedLog.context.campaignId,
        media: enhancedLog.context.media,
        automation: enhancedLog.context.automation,
        message: enhancedLog.context.message,
        timestamp: enhancedLog.context.timestamp,
        requestId: enhancedLog.context.requestId,
        userAgent: enhancedLog.context.userAgent,
        ipAddress: enhancedLog.context.ipAddress,
        sessionId: enhancedLog.context.sessionId,
        correlationId: enhancedLog.context.correlationId,
        // Additional debugging context
        debugInfo: {
          processId: process.pid,
          nodeVersion: process.version,
          memoryUsage: process.memoryUsage(),
          uptime: process.uptime(),
          platform: process.platform,
          arch: process.arch,
          cwd: process.cwd(),
          env: {
            NODE_ENV: process.env.NODE_ENV,
            ENVIRONMENT: process.env.ENVIRONMENT,
            VERSION: process.env.VERSION,
            BUILD_NUMBER: process.env.BUILD_NUMBER,
            GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
            K_SERVICE: process.env.K_SERVICE,
            K_REVISION: process.env.K_REVISION
          }
        }
      },
      error: {
        message: enhancedLog.error.message,
        type: (enhancedLog.error as any).type || 'Unknown',
        code: (enhancedLog.error as any).code || 'Unknown',
        fbtrace_id: (enhancedLog.error as any).fbtrace_id,
        error_subcode: (enhancedLog.error as any).error_subcode,
        error_user_title: (enhancedLog.error as any).error_user_title,
        error_user_msg: (enhancedLog.error as any).error_user_msg,
        stack: enhancedLog.stack,
        // Additional error debugging
        errorDetails: {
          name: (enhancedLog.error as Error).name,
          cause: (enhancedLog.error as any).cause,
          originalError: originalError ? {
            message: originalError.message,
            name: originalError.name,
            stack: originalError.stack
          } : null
        }
      },
      metadata: enhancedLog.metadata,
      // Request tracing info
      tracing: {
        traceId: process.env.TRACE_ID || 'not-available',
        spanId: process.env.SPAN_ID || 'not-available',
        parentSpanId: process.env.PARENT_SPAN_ID || 'not-available'
      }
    }));

    return enhancedLog;
  }

  logInstagramApiSuccess(
    context: ErrorLogContext,
    responseData?: any
  ): void {
    const requestId = context.requestId || this.generateRequestId();
    const timestamp = new Date().toISOString();

    console.info('Instagram API Success:', {
      message: `Successfully sent message automation DM to ${context.recipientId}`,
      context: {
        ...context,
        timestamp,
        requestId,
        instagramApiPayload: context.instagramApiPayload ? this.sanitizePayload(context.instagramApiPayload) : undefined,
        responseData: responseData ? this.sanitizePayload(responseData) : undefined,
      },
      metadata: {
        service: this.service,
        version: this.version,
        environment: this.environment,
        timestamp,
        requestId,
      }
    });
  }

  logGeneralError(
    error: Error,
    context: ErrorLogContext,
    message?: string
  ): EnhancedErrorLog {
    const requestId = context.requestId || this.generateRequestId();
    const timestamp = new Date().toISOString();
    
    const enhancedLog: EnhancedErrorLog = {
      level: 'error',
      message: message || error.message,
      context: {
        ...context,
        timestamp,
        requestId,
      },
      error,
      stack: error.stack,
      metadata: {
        service: this.service,
        version: this.version,
        environment: this.environment,
        timestamp,
        requestId,
      }
    };

    console.error('General Error:', {
      ...enhancedLog,
      debugInfo: {
        timestamp: new Date().toISOString(),
        processId: process.pid,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd(),
        env: {
          NODE_ENV: process.env.NODE_ENV,
          ENVIRONMENT: process.env.ENVIRONMENT,
          VERSION: process.env.VERSION,
          BUILD_NUMBER: process.env.BUILD_NUMBER
        }
      }
    });
    
    // Also log structured JSON for Google Cloud Logging
    console.error(JSON.stringify({
      severity: 'ERROR',
      message: enhancedLog.message,
      context: enhancedLog.context,
      error: {
        message: enhancedLog.error.message,
        name: (enhancedLog.error as Error).name || 'InstagramApiError',
        stack: enhancedLog.stack
      },
      metadata: enhancedLog.metadata,
      debugInfo: {
        processId: process.pid,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd(),
        env: {
          NODE_ENV: process.env.NODE_ENV,
          ENVIRONMENT: process.env.ENVIRONMENT,
          VERSION: process.env.VERSION,
          BUILD_NUMBER: process.env.BUILD_NUMBER,
          GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
          K_SERVICE: process.env.K_SERVICE,
          K_REVISION: process.env.K_REVISION
        }
      }
    }));
    
    return enhancedLog;
  }
}

// Export singleton instance
export const errorLogger = new InstagramErrorLogger();

// Export types and class for custom usage
export { InstagramErrorLogger, type ErrorLogContext, type EnhancedErrorLog, type InstagramApiError };
