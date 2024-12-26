import { client, publicSDK } from '@devrev/typescript-sdk';
import { FunctionInput } from '@devrev/typescript-sdk/dist/snap-ins';

export async function handleEvent(event: FunctionInput) {
  const devrevPAT = event.context.secrets['service_account_token'];
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

export const run = async (events: FunctionInput[]) => {
  /*
  Put your code here to handle the event.
  */
  for (const event of events) {
    await handleEvent(event);
  }
};

export default run;
