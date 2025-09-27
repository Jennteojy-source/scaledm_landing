import { errorLogger, ErrorLogContext } from './errorLogger';

interface InstagramApiConfig {
  baseUrl: string;
  apiVersion: string;
  accessToken: string;
}

interface SendMessagePayload {
  recipient: {
    id: string;
  };
  message: {
    text: string;
  };
}

interface InstagramApiResponse {
  id: string;
  recipient_id: string;
  success?: boolean;
  error?: {
    message: string;
    type: string;
    code: number;
    fbtrace_id?: string;
    error_subcode?: number;
    error_user_title?: string;
    error_user_msg?: string;
  };
}

class InstagramApiClient {
  private config: InstagramApiConfig;

  constructor(config: InstagramApiConfig) {
    this.config = config;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    payload?: any,
    context?: Partial<ErrorLogContext>
  ): Promise<T> {
    const url = `${this.config.baseUrl}/${this.config.apiVersion}/${endpoint}`;
    const requestId = context?.requestId || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const enhancedContext: ErrorLogContext = {
      endpoint: url,
      method,
      instagramApiPayload: payload,
      requestId,
      timestamp: new Date().toISOString(),
      ...context,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.accessToken}`,
          'User-Agent': 'ScaleDM-Automation/1.0',
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorContext = {
          ...enhancedContext,
          instagramApiPayload: payload,
        };

        const apiError = {
          message: responseData.error?.message || `HTTP ${response.status}: ${response.statusText}`,
          type: responseData.error?.type || 'HTTP_ERROR',
          code: responseData.error?.code || response.status,
          fbtrace_id: responseData.error?.fbtrace_id,
          error_subcode: responseData.error?.error_subcode,
          error_user_title: responseData.error?.error_user_title,
          error_user_msg: responseData.error?.error_user_msg,
        };

        errorLogger.logInstagramApiError(apiError, errorContext);
        
        throw new Error(`Instagram API Error: ${apiError.message}`);
      }

      // Log successful API call
      errorLogger.logInstagramApiSuccess(enhancedContext, responseData);

      return responseData;
    } catch (error) {
      const errorContext = {
        ...enhancedContext,
        instagramApiPayload: payload,
      };

      if (error instanceof Error) {
        errorLogger.logInstagramApiError(error, errorContext);
      } else {
        errorLogger.logGeneralError(
          new Error(`Unknown error: ${JSON.stringify(error)}`),
          errorContext,
          'Unexpected error in Instagram API request'
        );
      }

      throw error;
    }
  }

  async sendMessage(
    recipientId: string,
    messageText: string,
    businessInstagramId?: string,
    additionalContext?: Partial<ErrorLogContext>
  ): Promise<InstagramApiResponse> {
    const payload: SendMessagePayload = {
      recipient: {
        id: recipientId,
      },
      message: {
        text: messageText,
      },
    };

    const context: Partial<ErrorLogContext> = {
      businessInstagramId,
      recipientId,
      userId: additionalContext?.userId,
      automationId: additionalContext?.automationId,
      campaignId: additionalContext?.campaignId,
      media: additionalContext?.media,
      automation: additionalContext?.automation,
      message: additionalContext?.message || {
        text: messageText,
        type: 'text',
      },
      sessionId: additionalContext?.sessionId,
      correlationId: additionalContext?.correlationId,
      ...additionalContext,
    };

    return this.makeRequest<InstagramApiResponse>('me/messages', 'POST', payload, context);
  }

  async getUserInfo(userId?: string, additionalContext?: Partial<ErrorLogContext>): Promise<any> {
    const context: Partial<ErrorLogContext> = {
      userId: userId || 'me',
      ...additionalContext,
    };

    return this.makeRequest('me', 'GET', undefined, context);
  }

  async getBusinessAccounts(businessInstagramId?: string, additionalContext?: Partial<ErrorLogContext>): Promise<any> {
    const context: Partial<ErrorLogContext> = {
      businessInstagramId,
      ...additionalContext,
    };

    return this.makeRequest('me/accounts', 'GET', undefined, context);
  }
}

// Helper function to create Instagram API client with enhanced error logging
export function createInstagramApiClient(
  accessToken: string,
  baseUrl: string = 'https://graph.instagram.com',
  apiVersion: string = 'v23.0'
): InstagramApiClient {
  return new InstagramApiClient({
    baseUrl,
    apiVersion,
    accessToken,
  });
}

// Helper function for sending automated DMs with comprehensive logging
export async function sendAutomatedDM(
  accessToken: string,
  recipientId: string,
  messageText: string,
  context: {
    businessInstagramId?: string;
    userId?: string;
    automationId?: string;
    campaignId?: string;
    userAgent?: string;
    ipAddress?: string;
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
    sessionId?: string;
    correlationId?: string;
  }
): Promise<InstagramApiResponse> {
  const client = createInstagramApiClient(accessToken);
  
  return client.sendMessage(recipientId, messageText, context.businessInstagramId, context);
}

export { InstagramApiClient, type InstagramApiConfig, type SendMessagePayload, type InstagramApiResponse };
