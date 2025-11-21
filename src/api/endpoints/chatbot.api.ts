import { apiClient } from '../client';

const DB = 'SNOW_CAPGE_SPC';
const SCHEMA = 'SNOW_CAP_RAISE';

export const ChatbotAPI = {
  createChatbot: async (chatbotName: string, pipelineId: string, templateId: number = 1): Promise<{ R_SP_SAVE_CHATBOT: number }[]> => {
    const sql = `
      CALL ${DB}.${SCHEMA}.R_SP_SAVE_CHATBOT(
        '${chatbotName.replace(/'/g, "''")}',
        '${pipelineId.replace(/'/g, "''")}',
        NULL, 'chatbot_app',
        ${templateId},
        'mistral-large2', NULL
      );
    `;
    const response = await apiClient.post<{ R_SP_SAVE_CHATBOT: number } []>('/statements', JSON.stringify({ statement: sql }));
    return response.data;
  },

  saveResponse: async (chatbotId: number, question: string, response: string) => {
    const sql = `
      CALL ${DB}.${SCHEMA}.R_SP_SAVE_CHATBOT_RESPONSE(
        ${chatbotId},
        'mistral-large2',
        '${question.replace(/'/g, "''")}',
        '${response.replace(/'/g, "''")}',
        ${response.length}
      );
    `;
    return apiClient.post('/statements', JSON.stringify({ statement: sql }));
  },

  getResponses: async (chatbotId: number) => {
      const sql = `
      SELECT response_id, question, response, start_time
      FROM SNOW_CAPGE_SPC.SNOW_CAP_RAISE.R_CHATBOT_RESPONSE
      WHERE chatbot_id = ${chatbotId}
      ORDER BY start_time DESC;
      `;
      return apiClient.post('/statements', JSON.stringify({ statement: sql }));
  },

};