import { client, publicSDK } from '@devrev/typescript-sdk';

/**
 * Handles an event by fetching a list of tickets using the DevRev SDK.
 *
 * @param event - The event object containing context and execution metadata
 * @param event.context.secrets.service_account_token - DevRev PAT for authentication
 * @param event.execution_metadata.devrev_endpoint - DevRev API endpoint URL
 * @returns Promise resolving to the works list response or error if the operation fails
 *
 * @throws Will return any SDK errors encountered during the API call
 *
 * @remarks
 * This function initializes the DevRev SDK client and attempts to fetch the first
 * ticket from the works list. Any errors during SDK initialization or API calls
 * are caught and returned.
 */
export async function handleEvent(event: any) {
  const devrevPAT = event.context.secrets.service_account_token;
  const APIBase = event.execution_metadata.devrev_endpoint;
  console.log('Hello World!');
  const devrevSDK = client.setup({
    endpoint: APIBase,
    token: devrevPAT,
  });
  try {
    const response = await devrevSDK.worksList({
      limit: 1,
      type: [publicSDK.WorkType.Ticket],
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const run = async (events: any[]) => {
  /*
  Put your code here to handle the event.
  */
  for (let event of events) {
    await handleEvent(event);
  }
};

export default run;
